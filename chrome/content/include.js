// Only create main object once
if (!Zotero.WeChat) {
	let loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
					.getService(Components.interfaces.mozIJSSubScriptLoader);
	loader.loadSubScript("chrome://zoterowechat/content/wechat.js");
}
