---
title: Unicode 归一化
date: 2022-09-29 22:19:10
tags: ["unicode"]
category: "小知识"
---

Unicode 表示方式不同，会导致字符串排序出现错误。

<!-- more -->

Unicode 有不同的编码方式来表现同一个字符。例如 `é` 可以通过 `\u{e9}` 或 `e\u{301}` 两种。

JavaScript 在比较字符串时，会根据组成字符串的字符一一比较来确定大小，因此这种表示方式可能会导致
两个看起来相同的字符串在比较时并不一致。

```typescript
const string1 = "caf\u{e9}";
const string2 = "cafe\u{301}";

// false
// \u{e9} !== e
console.log(string1 === string2)
```

因此，可以通过归一化来使所有的字符串中的 Unicode 以同一种方式表示，防止出现这种情况。

```typescript
const string1 = "caf\u{e9}".normalize();
const string2 = "cafe\u{301}".normalize();

// true
// string1 === string2 === "caf\u{e9}"
console.log(string1 === string2)
```

`normalize` 函数也能接受一个参数，用来指明具体归一化到哪一种表达形式。包括
`NFC`, `NFD`, `NFKC`, `NFDC`。 `NFC` 为默认值。
