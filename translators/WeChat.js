{
	"translatorID": "9660c625-e906-488d-ac00-5e96587a545a",
	"label": "WeChat",
	"creator": "zsx",
	"target": "https?://mp.weixin.qq.com/s/.*",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2020-02-13 08:26:04"
}

function doWeb(doc, url) {
	scrape(doc, url)
}


function detectWeb(doc, url) {
	return 'blogPost'
}


function scrape(doc, url) {
	var translator = Zotero.loadTranslator('web');

	// Embedded Metadata
	translator.setTranslator('951c027d-74ac-47d4-a107-9c3069ab7b48');
	// translator.setDocument(doc)
	
	translator.setHandler('itemDone', function (obj, item) {
		if (item.attachments && item.attachments[0] && item.attachments[0].document) {
			var images = item.attachments[0].document.querySelectorAll('img[data-src]')
			Array.from(images).forEach(image => {
				image.setAttribute('src', image.getAttribute('data-src'))
			})
		}
		var blogTitle = ZU.xpathText(doc, '//a[@id="js_name"]')
		var authorName = ZU.xpathText(doc, '//span[@class="rich_media_meta rich_media_meta_text"]')
		var data = ZU.xpathText(doc, '//*[@id="meta_content"]')

		item.blogTitle = "微信公众号：" + ZU.trimInternal(blogTitle)
		var timestamp = ZU.xpathText(doc, '//script').match(/ct = "(.*?)"/)[1]
		item.title = ZU.xpathText(doc, '//h2[@class="rich_media_title"]')
		item.date = ZU.strToISO(new Date(timestamp * 1000).toISOString())
		item.creators = []
		if (authorName === null) {
			item.creators.push(ZU.cleanAuthor(blogTitle, "author"))
		} else {
			item.creators.push(ZU.cleanAuthor(authorName, "author"))
		}
		delete item.publicationTitle
		item.complete()
	})

	translator.getTranslatorObject(function(trans) {
		trans.itemType = "blogPost"
		trans.doWeb(doc, url)
	})

}/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://mp.weixin.qq.com/s/qIkik6OWQQ4ue-giIpVL1w",
		"items": [
			{
				"itemType": "blogPost",
				"title": "国务院任免国家工作人员",
				"creators": [
					{
						"firstName": "",
						"lastName": "新华社",
						"creatorType": "author"
					}
				],
				"date": "2020-02-13",
				"blogTitle": "微信公众号：新华社",
				"url": "http://mp.weixin.qq.com/s?__biz=MzA4NDI3NjcyNA==&mid=2649503900&idx=1&sn=06c44b265e7e50e436484307ad753a8f&chksm=87f13c07b086b511d93276a62c95733cd58e307b60a4391a80149611f3169c1ccef9bb07694f#rd",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://mp.weixin.qq.com/s/ZLGuwQRb19lqyVGD7BDPrw",
		"items": [
			{
				"itemType": "blogPost",
				"title": "夜读 | 熬得住才能出彩，熬不住只能出局",
				"creators": [
					{
						"firstName": "",
						"lastName": "明心的",
						"creatorType": "author"
					}
				],
				"date": "2020-02-12",
				"abstractNote": "将苦难化为成长",
				"blogTitle": "微信公众号：新华社",
				"url": "http://mp.weixin.qq.com/s?__biz=MzA4NDI3NjcyNA==&mid=2649503848&idx=1&sn=b9577f26cfce63c089757c93270ae92a&chksm=87f13cf3b086b5e5a904dd19131bfce6842315296f39755ce5f9837e02a89708ec9ec0ebfd75#rd",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
