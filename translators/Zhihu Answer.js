{
	"translatorID": "1e5d63fe-222d-4a9e-8d80-a718920c7e2d",
	"label": "Zhihu Answer",
	"creator": "zsx",
	"target": "https://www.zhihu.com/question/.*/answer/.*",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2020-02-13 11:47:42"
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
		const author = doc.querySelector('div.AuthorInfo meta').content
		item.title = item.title.replace(/^\(.*?\)/, '')
		item.creators.push(ZU.cleanAuthor(author, "author", false))
		
		const date = doc.querySelector('div.ContentItem-time a span').textContent.split(' ')
		if (date.length >= 2){
			item.date = date[1]
		}
		item.complete()
	})

	translator.getTranslatorObject(function(trans) {
		trans.itemType = "blogPost"
		trans.doWeb(doc, url)
	})

}
