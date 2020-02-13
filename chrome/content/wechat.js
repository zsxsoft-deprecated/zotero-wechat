Zotero.WeChat = {
	isPDFJS: null,
	
	init: function () {
		this.isPDFJS = Zotero.Attachments.isPDFJS
		var self = this

		var changeTagName = (doc, original, tag) => {
			var replacement = document.createElement(tag)
			for (var i = 0, l = original.attributes.length; i < l; ++i) {
				var nodeName  = original.attributes.item(i).nodeName
				var nodeValue = original.attributes.item(i).nodeValue
				replacement.setAttribute(nodeName, nodeValue)
			}
			try {
				replacement.innerHTML = original.innerHTML
			} catch(e) { 
				// Unknown error........
			}
			return replacement
		}

		Zotero.Attachments.isPDFJS = function (doc) {
			if (doc.contentType === "text/html") {
				if (/zhihu.com|weixin.qq.com/.test(doc.URL)) {
					// 干掉他们的js，有个dio用
					var scripts = Array.from(doc.querySelectorAll('script'))
					scripts.forEach(script => {
						var replacement = changeTagName(doc, script, 'script-fuck')
						script.parentNode.replaceChild(replacement, script)
					})

					var attributes = [
						'data-src', // 微信
						'data-actualsrc' // 知乎
					]
					attributes.forEach(attribute => {
						const images = Array.from(doc.querySelectorAll(`img[${attribute}]`))
						images.forEach(image => {
							image.setAttribute('src', image.getAttribute(attribute))
							image.removeAttribute(attribute)
							image.removeAttribute('crossorigin')
							image.classList.remove('img_loading')
							image.classList.add('fuck-lazyload')
							image.outerHTML = image.outerHTML.replace('<img', '<script') + '</script>'
						})
						const css = doc.createElement('style')
						css.innerHTML = 'script-fuck{display:none}'
						doc.head.appendChild(css)
					})
					const s = doc.createElement('script')
					s.innerHTML = "Array.from(document.querySelectorAll('script.fuck-lazyload')).forEach(a => {a.outerHTML = a.outerHTML.replace('<script', '<img')})"
					doc.body.appendChild(s)
				}
			}
			return self.isPDFJS.call(this, doc)
		}
	},
};

// Initialize the utility
window.addEventListener('load', function(e) {
	Zotero.WeChat.init();
}, false);
