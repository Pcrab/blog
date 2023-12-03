---
title: 使用 Cloudflare Tunnel 保护服务器
date: 2023-03-06 20:13:54
tags: ["server", "cloudflare", "security"]
category: "技术向"
---

暴露在公网上的服务器被攻击是一件很令人烦恼的事情。本文将介绍如何通过 [Cloudflare Tunnel](https://one.dash.cloudflare.com)
服务来一定程度上避免这一问题。

<!-- more -->

## 原理

许多服务器被攻击的原因是公网 ip 暴露，而使用 Cloudflare Tunnel 后，所有的流量将先访问 Cloudflare 的服务器，随后通过
服务器与 Cloudflare 服务器之间建立的连接传送数据，因此暴露在外的只有 Cloudflare 的服务器，源服务器将能够得到很好的隐藏。

![Cloudflare Tunnel 原理图](https://pic.imgdb.cn/item/643155ee0d2dde5777b10933.jpg)

同时，如果有内网穿透的需求，也可以使用，免去申请公网 ip，备案等麻烦操作。

## 配置

### 控制台

首先需要注册一个 Cloudflare 账号。登陆后进入控制台，进入 **Zero Trust**，再选择 **Access** 下的 **Tunnels**，就进入了配置面板了。

![Go to Zero Trust](https://pic.imgdb.cn/item/643155ef0d2dde5777b109b1.png)
![Go to Tunnels](https://pic.imgdb.cn/item/643155ee0d2dde5777b10992.png)

随后选择 `Create a channel`，并输入 Channel 的名称，在随后的界面中记录下 `Token`。

![Get Token](https://pic.imgdb.cn/item/643155ee0d2dde5777b10958.png)

至此就完成了控制台的创建操作。随后需要到服务器配置应用。

### 服务器

由于我通过 `Docker Compose` 配置服务器上的应用，此处就只介绍通过这一方法配置的具体步骤。

首先，在 `docker-compose.yml` 中加入

```yaml
tunnel:
    image: cloudflare/cloudflared
    restart: unless-stopped
    command: tunnel run
    environment:
        TUNNEL_TOKEN: "TOKEN JUST GOT"
```

由于 Cloudflare Tunnels 无法做到如 Nginx 一样根据不同的 path 转发到不同端口，因此如果有类似需求，可以在 docker 中再运行一个 nginx，
监听不同的域名，并在配置控制台时将所有的域名转发到 nginx 的 80 端口。

需要注意，如果原来配置了 https，http 自动 301 跳转至 https 等，需要去除相关配置，只需要保留监听 80 端口以及 http 相关配置即可。
