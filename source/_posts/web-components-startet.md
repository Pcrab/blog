---
title: Web Components 开发配置
date: 2023-12-30 17:00:08
tags: ["ISO", "Node.js"]
category: "技术向"
---

最近研究了一下 [Web Components](https://www.webcomponents.org/)，使用 [Solid.js](https://www.solidjs.com/)，[Vite](https://vitejs.dev/)，[UnoCSS](https://unocss.dev/) 来创建一个可用的组件。

<!-- more -->

## 当前的问题

现在在开发时，第三方组件库是一个很常用的选项。我们会通过 [Ant Design](https://ant.design/)，[Element Plus](https://element-plus.org/) 等等组件库来进行搭建。

使用这些组件库最大的缺点就在于，它们都限定了页面所使用的框架。这样一来能使用这些组件库的用户就被限定在了
规定的框架中，甚至是规定的版本中。

不仅如此，由于现在的页面越来越复杂，更容易出现样式冲突的问题，而且没有很好的隔离方案。在出现样式问题时，
更难调试与解决。

因此可以通过 Web Components 解决上述问题。

## Web Components 介绍

根据 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) 的介绍，Web Components 是一套创建可重用的自定义元素的技术，
可以在任何地方使用定义出的这些元素。

Web Components 可以被渲染在 Shadow DOM 中，其最大的好处在于不会将真实的 DOM 结构暴露出来，而且能够不被外界的样式所影响，
因此基本不会存在样式冲突的问题。

当然，Web Components 也存在一定的缺点，例如虽然能够隔离样式，但如果外界真的需要设置其中的样式时，会非常困难。而且如果页面需要多个组件之间的联动功能，
实现起来也相对会比较困难一些。

这里只是一些简单的介绍，如果想要更详细一些的介绍可以参阅掘金的这篇 [对 Web Components 的简介](https://juejin.cn/post/7144888332575571981)。

## 目前尝试的配置

目前正在尝试使用 Solid.js，Vite 以及 UnoCSS 来进行开发。

### Solid.js

选择 Solid.js 的原因是它可以用 JSX 编写组件，又有着 signal 以及很小的打包后体积，我认为很适合用于 Web Components 开发这种相对轻量的场景。

Solid.js 开发 Web Components 有一个 [Solid Element](https://github.com/solidjs/solid/tree/main/packages/solid-element) 库，能够很方便地创建一个 Web Component。

```tsx
import { customElement } from 'solid-element';

customElement('my-component', {someProp: 'one', otherProp: 'two'}, (props, { element }) => {
    return <div>Web Components with Solid.js</div>
})
```

其中第二个参数是可选的，在此声明了可以传给第三个参数创建的组件的 props。需要注意必须在此处列出的 props 才能正确传递给组件。

### Vite

由于 Solid.js 官方推荐使用 Vite 进行开发，因此在创建这个 Web Components 组件项目时也希望能够使用 Vite。由于 Vite 主要用于页面的开发，因此对于这种情况
需要做一些额外配置。

```typescript
import { defineConfig } from "vite";
import { resolve } from "path";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      fileName: "my-component",
      formats: ["es", "cjs"],
    },
    minify: true,
    outDir: "dist/assets",
  },
});
```

通过配置成 `lib` 模式来生成最后的组件 js 文件。

在预览时，Vite 需要一个 index.html 文件，在其中会引入 ts 文件。而在 lib 模式下打包时，不会生成一个引用对应 js 文件的 html，因此选择将 `outDit` 设置
为 `dist/assets`，就是可以在 `dist` 中放置一个 html 文件，手动引用对应 js 文件来查看打包后的效果。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Test Web Components</title>
</head>

<body>
  <script src="/assets/my-component.js" type="module"></script>
  <my-component someProp="oneone" otherProp="twotwo"></my-component>
</body>

</html>
```

这样就能直接看到打包后的成果。

### UnoCSS

UnoCSS 是最近很喜欢用的原子化 CSS 库，而且是 Vite 的作者写的，与 Vite 集成得很好，用起来也很方便。但是
在 Web Components 中使用时，只成功导入了 `preflight` 中的内容，因此最终选择通过 cli 的方式使用。

在 `package.json` 中的 `dev` 与 `build` 脚本中加入

```bash
unocss \"src/**/*.tsx\" -o src/index.css
```

`dev` 还可以补上 `--watch` 来监听文件变化实时生成 CSS。

随后，在入口文件中，引入生成的 CSS 文件，将其内容插入到一个 `style` 标签中即可。

```typescript
import { customElement } from 'solid-element';
import style from "./index.css?inline";

const MyComponent = () => {
    return (
        <>
            <style>
                {style}
            </style>
            <div class="p-2"></div>
        </>
    );
}

customElement("my-component", {someProp: 'one', otherProp: 'two'}, MyComponent);
```

