{
	"translatorID": "d5beb682-3b9f-48a4-bd05-9aa213d38f26",
	"label": "Zhihu Column",
	"creator": "ysn",
	"target": "https://zhuanlan.zhihu.com/.*",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2020-02-13 11:29:03"
}

function detectWeb(doc, url) {
	if (doc.querySelectorAll('div.ColumnHeader-inner').length > 0
		|| getSearchResults(doc, true)) {
		return 'multiple';
	}
	else if (doc.querySelectorAll('div.Post-content').length > 0){
		return 'blogPost';
	}
}


function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	
	// get all article info
	var rows = doc.querySelectorAll('div li.ArticleItem');
	for (var i = 0; i < rows.length; i++) {
		//get url and title pairs 
		var href = rows[i].querySelector('div li.ArticleItem a').href;
		Zotero.debug(href);
		var title = rows[i].querySelector("div li.ArticleItem a h3.ArticleItem-Title").textContent;
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
	}
	
	return found ? items : false;
}

function scrape(doc, url) {
	var translator = Zotero.loadTranslator('web');

	// Embedded Metadata
	translator.setTranslator('951c027d-74ac-47d4-a107-9c3069ab7b48');
	// translator.setDocument(doc)
	
	translator.setHandler('itemDone', function (obj, item) {
		const title = doc.querySelector('h1.Post-Title').innerText
		if (!title) {
			title = doc.title
		}
		
		const author = doc.querySelector('div.AuthorInfo meta').content
		item.creators.push(Zotero.Utilities.cleanAuthor(author,"author", false))

		const json = doc.getElementById('js-initialData').innerHTML
		const timestamp = json.split('"created":')[1].split(',')[0]
		item.date = ZU.strToISO(new Date(timestamp * 1000).toISOString())
		
		item.title = title
		item.complete()
	})

	translator.getTranslatorObject(function(trans) {
		trans.itemType = "blogPost"
		trans.doWeb(doc, url)
	})
}


function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		Zotero.selectItems(getSearchResults(doc, false), function (items) {
			if (!items) {
				return true;
			}
			ZU.processDocuments(Object.keys(items), scrape);
		});
	} else {
		scrape(doc, url);
	}
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://zhuanlan.zhihu.com/p/95848007",
		"items": [
			{
				"itemType": "blogPost",
				"title": "献给弱者的童话——《水葬銀貨のイストリア》小感",
				"creators": [
					{
						"firstName": "",
						"lastName": "蓝光",
						"creatorType": "author"
					}
				],
				"date": "2019-12-08",
				"abstractNote": "本文为笔者初通后的一时所感，所涉均为本人个人观点，难免有所偏颇，敬请海涵。文中夹杂大量主观观点并涉及主线剧情，有言在先，还望多加注意。不过没玩过的应该不会点开就是了www以下为正文。 自本作2017年发售以…",
				"blogTitle": "知乎专栏",
				"language": "zh",
				"url": "https://zhuanlan.zhihu.com/p/95848007",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [
					{
						"tag": "Galgame"
					}
				],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
