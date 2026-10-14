# 个人工具箱

纯静态站点，没有构建步骤，没有后端。

```
toolbox/
├── index.html          首页：读取 tools.json，显示工具卡片，支持搜索和分类
├── admin/index.html    管理页：编辑工具列表，导出新的 tools.json
├── tools.json          工具清单（首页和管理页都读它）
├── assets/             共享样式 style.css、小函数 common.js，vendor/ 放第三方库
├── tools/
│   ├── finger-picker/  手指选人
│   └── wheel/          转盘 / 抽卡
├── _headers            Cloudflare Pages：管理页不被搜索引擎收录
└── robots.txt
```

## 本地预览

```
python3 -m http.server 8000
```

然后访问 http://localhost:8000 。不能双击打开，浏览器会拦截对 tools.json 的读取。

## 添加一个新工具

1. 新建目录 `tools/<id>/`，里面放一个自包含的 `index.html`。
2. 页面里引用共享样式（可选）：`<link rel="stylesheet" href="../../assets/style.css">`，并放一个返回首页的链接 `../../`。
3. 打开 `/admin/`，点“添加工具”，填名称、路径（`tools/<id>/`）、分类、说明。
4. 点“导出 tools.json”，替换项目根目录里的同名文件，提交并推送。

## 部署到 Cloudflare Pages

- 新建项目，连接 GitHub 仓库。
- 构建命令留空，输出目录填 `/`（仓库根目录）。
- 推送后自动部署。

## 保护管理页

管理页本身只是改本地草稿，不能直接改线上文件，所以公开也不会被人篡改站点。
如果不想让别人看到它，可以在 Cloudflare Zero Trust 里给 `/admin/*` 加一条 Access 规则。

## 手指选人的规则

- 至少 2 人。自动模式下，手指数量稳定后倒计时 2/3/5 秒开始；手动模式点“开始”。
- 选择过程中有人松手，本轮取消。
- 结果出来后松手不影响结果；再点一下屏幕或点“再来一次”重新开始。
- 手机上同时识别的手指数取决于系统，iPhone 通常是 5 根，iPad 和多数安卓是 10 根。

## 第三方代码

`assets/vendor/qrcode.js` 是 [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) 2.0.4（MIT 许可，作者 Kazuhiko Arase），带 UTF-8 支持，已随项目托管，二维码工具不依赖任何 CDN，也能离线使用。
