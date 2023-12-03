---
title: 实现一个用户友好的深色模式
date: 2023-04-03 19:03:24
category: "技术向"
tags: ["blog"]
---

现在越来越多的操作系统，浏览器都支持了深色模式，许多网页也提供了深色模式的选项。在重修我的博客的同时，我也为其增添了深色模式。但是在添加深色模式的过程中，发现了许多需要注意的地方，因此记录下来。

<!--more-->

## 为什么要有深色模式

如今绝大多数的操作系统（如 macOS，iOS，windows，Android，Linux 等）都支持了夜间模式，会将系统的主题从亮色调成暗色。主流的浏览器（如 Safari，chrome 等）
也能够支持自动夜间模式。而此时如果网页能够很好地支持深色模式，能够将其主题调整成暗色调，也就能够与系统或是浏览器更加和谐，提升用户的浏览体验。

根据 [Can I Use](https://caniuse.com/?search=prefers-color-scheme) 的数据，目前已经有 94.37% 的浏览器支持这一功能。

而一个网页若是不提供深色模式，就会在一片暗色调中显得十分突兀。不仅废眼，更会使得用户对网站的评价降低。

## 如何实现深色模式

要实现深色模式，需要使用 `prefers-color-scheme` 这一 CSS 媒体查询。目前绝大多数浏览器都支持，因此可以放心使用。具体
配置时，可以通过 CSS Variable，或分开编写，或使用框架三种方式实现。

### CSS Variable 实现

通过为不同的 color scheme 编写不同的 variable 实现深色模式。

```css
:root {
    --bg: #fff;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg: #000;
    }
}

body {
    background-color: var(--bg);
}
```

### 直接分开编写

或者直接编写具体的 CSS 而非 variable。

```css
body {
    background-color: #fff;
}

@media (prefers-color-scheme: dark) {
    body {
        background-color: #000;
    }
}
```

### 使用框架实现

使用例如 [tailwindcs](https://tailwindcss.com) 等 CSS 框架，实现深色模式。

```html
<div class="bg-white dark:bg-black"></div>
```

最后生成如下的 CSS

```css
.bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

:is(.dark .dark\:bg-black) {
    --tw-bg-opacity: 1;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}
```

目前我使用的是第三种方式，即使用 tailwindcss 框架实现自动深色模式。

## 实现缺陷

### 实现用户选择模式

使用 `prefers-color-scheme` 媒体查询实现深色模式固然十分方便，但却有着一定的问题。最大的问题就是无法让用户选择是否启用
深色模式，网站只能够跟着操作系统或浏览器的选择自动切换。

如果使用了 tailwindcss，那么它提供了一种配置方案，即不使用 `prefers-color-scheme` 自动切换，而是手动在根元素下添加
`class="dark"` 来识别出需要深色模式。这一切需要 javascript 来辅助完成用户切换模式的操作。

用户可能会需要保持深色或浅色模式，也可能会选择保持自动切换模式，因此需要至少三种状态：`light`，`dark`，`auto`。自然能够
想到将这一状态存在 `localStorage` 中，在网页加载时读取并提供对应的 CSS。要实现这一功能其实并不难，一段简单的 javascript 代码就能够完成。

```typescript
const theme = localStorage.getItem("theme") ?? "auto";
switch (theme) {
    case "light":
        document.documentElement.classList.remove("dark");
        break;
    case "dark":
        document.documentElement.classList.add("dark");
        break;
    // 默认可以是 auto 模式。
    default: {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        break;
    }
}
```

这样在用户选择时，只需要将 `localStorage` 中的 `theme` 设置成对应的值，并修改根元素对应的 `class` 即可。

但这样还有一个问题：这样设置的 `class` 只有在用户修改时才会检测系统的暗色选项，无法跟随系统切换。因此还需要
监听 `mediaquery` 才能在系统切换时跟着切换深色模式。

这里只介绍 [React](https://react.dev/) 的写法。其他框架原理是类似的。

```typescript
const matchFunc = (e: MediaQueryListEvent): void => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || theme === "light") return;
    if (e.matches) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
};

useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", matchFunc);
}, []);
```

这样就能实现满足用户具体需求的深色模式。用户可以在强制亮色，强制暗色
以及自动调整之间自由切换。

### 防止首屏闪白

除此之外，还有一个小问题。由于使用框架后，代码需要在下载了一个较大
的 js 文件后才会执行并修改色彩模式，因此会首先出现一段时间亮色，
随后才会自动根据用户设置换成对应的色彩。

这一问题可以通过在 `<head></head>` 中添加一段 `<script></scrit>` 标签，提前先为根元素添加对应的类名来解决

```html
<head>
    <script>
        try {
            var e = localStorage.theme;
            e === "dark"
                ? document.documentElement.classList.add("dark")
                : e === "auto"
                  ? window.matchMedia("(prefers-color-scheme: dark)").matches &&
                    document.documentElement.classList.add("dark")
                  : "";
        } catch (e) {}
    </script>
</head>
```

在最外层包上一层 `try {} catch {}` 防止浏览器有不支持的情况。
