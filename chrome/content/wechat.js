Zotero.WeChat = {
	isPDFJS: null,
	
	init: function () {
		this.isPDFJS = Zotero.Attachments.isPDFJS
		var self = this

		Zotero.Attachments.isPDFJS = function (doc) {
			if (doc.contentType === "text/html") {
				var images = Array.from(doc.querySelectorAll('img[data-src]'))

				/*
				 * 原理：
				 * Zotero会模拟浏览器访问，然而微信公众号有LazyLoad，会自动把所有图片加上placeholder
				 * 因此将所有图片替换成script，这样Zotero会自动下载script，但微信公众号的js拿不到img
				 * 由于微信有做CSP，nonce的应用导致Zotero无法执行以下js
				 * 但是缓存后的页面就没有CSP了，JS就能跑了
				 * 在缓存后的页面把script换成img
				 */
				if (images.length > 0) {
					var s = doc.createElement('script')
					s.innerHTML = "Array.from(document.querySelectorAll('script.fuck-lazyload')).forEach(a => {a.outerHTML = a.outerHTML.replace('<script', '<img')})"
					doc.body.appendChild(s)
				}
				images.forEach(image => {
					image.setAttribute('src', image.getAttribute('data-src'))
					// image.classList.remove('img_loading')
					image.removeAttribute('data-src')
					image.setAttribute('__sec_open_place_holder__', 1)
					image.classList.add('fuck-lazyload')
					image.outerHTML = image.outerHTML.replace('<img', '<script') + '</script>'
				})
			}
			return self.isPDFJS.call(this, doc)
		}
	},
};

// Initialize the utility
window.addEventListener('load', function(e) {
	Zotero.WeChat.init();
}, false);
