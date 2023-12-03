---
title: 如何生成符合 ISO 标准的日期字符串
date: 2023-05-05 10:56:21
tags: ["ISO", "Node.js"]
category: "技术向"
---

到底应不应该使用 `en-CA` 的 `toLocaleString` 并加上 `replace` 来生成符合 ISO 8601 标准的日期？

<!-- more -->

## 起因

这一切的起因源自一个非常简单的 pr（将一个函数参数设为可选，加个问号搞定收工），改完后一跑测试，发现有挂的用例？

去仓库查了一下，这几个用例之前就是挂掉的，因此先把 pr 提了，再在本地好好看看挂掉的用例到底是什么情况。

## 具体问题

挂掉的用例是这样的：

```javascript
it("date", () => {
    const unixTime = Date.now();
    const stringifyDateTime = new Date(unixTime)
        .toLocaleString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            hour12: false,
            minute: "2-digit",
            second: "2-digit",
        })
        .replace(/,/g, "");

    const str = [`date: ${stringifyDateTime}`, "---"].join("\n");
    const data = yfm.parse(str);
    parseInt(data.date.getTime() / 1000, 10).should.eql(parseInt(unixTime / 1000, 10));
});
```

用例并不复杂，是用来测试 `parse` 函数能否正确认出 `date` 是一个日期并正确序列化出一个 `Date` 对象。
看上去没啥问题，但是运行后会报错：

> `TypeError: data.date.getTime is not a function`

那就先看一下 `data` 到底最后是个什么：

```json
{
    "date": "05/05/2023 12:29:21"
}
```

奇怪了，`date` 属性居然是个字符串？很明显这里生成的应该是一个 `Date` 对象，因此肯定有什么地方出了问题。

生成 `data` 调用的是 `yfm.parse` 函数，这一函数的作用是将一个标准的 `YAML` 格式的字符串转换成 JS Object，
因此我去查阅了 YAML 的标准，发现 YAML 只承认 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 标准的字符串，
库的实现也是会确认字符串是否符合该标准，再将其转换为 `Date` 对象。

如果要满足 ISO 8601 的规范，那 `date` 应该是 `2023-05-05 12:29:21`，即 `YYYY-MM-DD HH:mm:ss`，而非目前的状态。
根据 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) 所写，
如果需要 ISO 格式的字符串，可以调用 `Date.prototype.toISOString` 或是 `Date.prototype.toJSON` 两个函数。因此，
将代码修改为

```javascript
it("date", () => {
    const current = new Date();
    const unixTime = current.getTime();
    const stringifyDateTime = new Date(current.getTime() - current.getTimezoneOffset() * 60 * 1000).toJSON();

    const str = [`date: ${stringifyDateTime}`, "---"].join("\n");

    const data = yfm.parse(str);
    parseInt(data.date.getTime() / 1000, 10).should.eql(parseInt(unixTime / 1000, 10));
});
```

就可以完美解决这一问题。减去 timezoneOffset 是由于 `parse` 实现中会加上这一 offset，具体原因会在下文说明。

## 深入探究

那为什么会出现这一错误呢？之前编写 test case 的人完全没有注意到这里的测试会报错吗？情况显然没有这么简单。

在查看了 GitHub 提交记录以及对应 Actions 的运行情况后，我发现几个月前，所有的 test 都是能够通过的，
但最近的一些 commits 出现了 test 报错的情况。

配置的 Actions 规定，会在 Windows，macOS，Linux 三种系统中，分别是用 node 14，16，18 来执行 test。
在查看后发现 node 14，16 都能通过测试，但只有 18 不行。这一情形在三种系统表现完全一致，且我在本地切换 node
版本测试后也出现了一样的情况，因此可以知道这一错误是由于 node 不同版本之间的差异导致的。

既然之前测试用例使用的是 `toLocaleString` 来生成符合 ISO 标准的时间戳字符串，那肯定是这个函数出现了一些改动。
因此我去搜了一下 node 的 issue，看到了这样一条 [issue](https://github.com/nodejs/node/issues/45945)

里面提到在 node v19 中出现了 `en-CA` 的 `toLocaleString` 变动的问题，之前生成的是符合标准的，但之后就突然不符合了。
给到的解答是 node 使用了新版本的 ICU (i18n library)，并给到了对应修改了函数输出内容的改动
[链接](https://github.com/unicode-org/cldr/blob/ac66592c93d0cb26d0b8666d3978bcab1ec889fb/common/main/en_CA.xml#L1198)

根据他的说法，新版 node 使用了 ICU [v72.1](https://icu.unicode.org/download/72)，而在这个版本升级了 CLDR
到 [v42](https://cldr.unicode.org/index/downloads/cldr-42)，也就是在这里更改了 `en-CA` 的 `toLocaleString` 输出格式。

在 node 的 GitHub 页面可以看到每个 release 的 changelog。既然知道了是由于升级了 ICU 而引发的问题，
我就在 changelog 里搜索含有升级了 ICU 的 version，最后找到了 v18.13.0，在这一版本中引入了 ICU v72.1，导致测试用例出现了错误。

## 思考

那么为什么一开始需要用 `toLocaleString` 而不用 `toJSON` 函数呢？原因很有可能是为了保证生成的字符串不会因为时区问题
被序列化为错误的时间。

尝试调用一下 `toLocaleString` 和 `toJSON` 函数，可以发现前者生成字符串时间是本地的时间，而后者则会根据所在时区
生成换算后的格林威治时间。

```javascript
// 5/5/2023, 7:49:55 PM
const result1 = new Date().toLocaleString();

// 2023-05-05T11:50:26.037Z
const result2 = new Date().toJSON();
```

由于输入的时间戳通常都是本地时间，因此原来的作者通过使用 `toLocaleString` 并格式化来更加方便地得到本地时间，而不用做时区的计算。
使用 `toJSON` 则相对复杂一些。

## 总结

实际就是 node 在升级 ICU 到 v72.1 的时候引入了这一 BREAKING CHANGE，但是并没有很显著地标明，感兴趣的可以看一下
这一个 [issue](https://github.com/nodejs/node/issues/46123)。

不过我个人认为，不论如何，还是应该使用 `toJSON` 或 `toISOString` 这种明确说明会返回 ISO 格式字符串的函数，
不依赖于具体 `toLocaleString` 的实现。

目前该问题已经在 这一 [pr](https://github.com/unicode-org/cldr/pull/2759) 中被回退，因此如果使用的是最新
的 node v20.1.0 或以上，由于其 [升级](https://github.com/nodejs/node/pull/47456) 到了 ICU v73.1，则不会再出现本文所述的问题。

影响到的 `node` 版本为：

-   ^18.13.0
-   ^19.1.0
-   20.0.0
