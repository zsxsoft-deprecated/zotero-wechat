# zotero-wechat
为Zotero提供微信公众号支持

## 介绍
由于微信公众号使用了LazyLoad技术，导致Zotero在保存微信公众号页面时会出现图片无法保存的现象。本插件旨在解决这个问题。由于本插件对Zotero提供的部分函数进行了重写，因此可能出现不稳定，还请留意。

注：治本方式为Hook Zotero内部 [https://github.com/zotero/zotero/blob/4e11c7927d63486dd94ee227ae667a4b082e2af4/chrome/content/zotero/xpcom/utilities_internal.js#L466](https://github.com/zotero/zotero/blob/4e11c7927d63486dd94ee227ae667a4b082e2af4/chrome/content/zotero/xpcom/utilities_internal.js#L466) 块代码，为其设置窗口大小。不过懒得研究了，先把微信公众号解决就好。

## 安装

1. 点击Releases，下载zoterowechat.zoteroplugin并安装到Zotero内。
2. 下载[translators/WeChat.js](translators/WeChat.js)并放置到你的translators目录下。
3. 重启Zotero。
