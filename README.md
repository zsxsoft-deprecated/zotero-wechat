# zotero-wechat
为Zotero提供部分网站的支持

## Deprecated
Zotero不堪此任，我不再使用Zotero处理Web页面。现使用修改版https://github.com/webclipper/web-clipper 。

## 支持

1. 知乎
2. 微信公众号

## 介绍
由于微信公众号等使用了LazyLoad技术，导致Zotero在保存微信公众号页面时会出现图片无法保存的现象。本插件旨在解决这个问题。由于本插件对Zotero提供的部分函数进行了重写，因此可能出现不稳定，还请留意。

注：治本方式为Hook Zotero内部 [https://github.com/zotero/zotero/blob/8fd83795e8465a335dba3c83c93986d8665fbdd6/chrome/content/zotero/xpcom/zotero.js#L2054](https://github.com/zotero/zotero/blob/8fd83795e8465a335dba3c83c93986d8665fbdd6/chrome/content/zotero/xpcom/zotero.js#L2054) 块代码，为其设置窗口大小。不过懒得研究了，先把微信公众号解决就好。

## 安装

1. 点击Releases，下载zoterowechat.zoteroplugin并安装到Zotero内。(Releases内的版本已太旧，和仓库内的不一样，有bug）
2. 下载[translators](translators)下所有文件并放置到你的translators目录下。
3. 重启Zotero。
