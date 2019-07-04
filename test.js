"use strict";
const {after, before, it} = require("mocha");
const puppeteer = require("puppeteer");
const puppeteerCoverage = require("puppeteer-to-istanbul");

const runInBrowser = func => () => page.evaluate(func);

let browser, page;



// @todo also use npmjs.com/puppeteer-firefox
before(async () =>
{
	browser = await puppeteer.launch({ args: ["--no-sandbox"] });
	page = await browser.newPage();

	page.on("console", async msg => console[msg._type](...await Promise.all(msg.args().map(arg => arg.jsonValue()))));
	page.on("pageerror", console.error);

	await Promise.all(
	[
		page.addScriptTag({ path: "node_modules/chai/chai.js" }),
		page.addScriptTag({ path: "temp.js" }),

		// @todo https://github.com/istanbuljs/puppeteer-to-istanbul/issues/18
		// @todo https://github.com/GoogleChrome/puppeteer/issues/3570
		page.coverage.startJSCoverage({ reportAnonymousScripts: true })
	]);

	await page.evaluate(() =>
	{
		const iframe = document.createElement("iframe");
		document.body.append(iframe);
		window.anotherRealm = iframe.contentWindow;
		window.anotherDocument = anotherRealm.document;

		window.expect = chai.expect;
		delete window.chai; // cleanup
	});
});



after(async () =>
{
	let coverage = await page.coverage.stopJSCoverage();

	// Exclude tools
	coverage = coverage.filter(({url}) => !url.includes("chai"));

	puppeteerCoverage.write(coverage);

	browser.close();
});



it("is a (bundled) function", runInBrowser(() =>
{
	expect(window.isDOMElement).to.be.a("function");
}));



it("returns false for a non-HTMLElement", runInBrowser(() =>
{
	const fixtures =
	[
		"Node",
		Symbol("Node"),
		{},
		[],
		/regex/,
		true,
		1,
		null,
		undefined,
		window,
		anotherRealm,
		document,
		document.createComment("data"),
		document.createDocumentFragment(),
		document.createProcessingInstruction("target", "data"),
		document.createTextNode("data"),
		document.implementation.createDocument("namespaceURI", "qualifiedNameStr"),
		document.implementation.createDocument("namespaceURI", "qualifiedNameStr").createCDATASection("data"),
		document.implementation.createDocumentType("qualifiedNameStr", "publicId", "systemId"),
		document.implementation.createHTMLDocument("title"),
		anotherDocument,
		anotherDocument.createComment("data"),
		anotherDocument.createDocumentFragment(),
		anotherDocument.createProcessingInstruction("target", "data"),
		anotherDocument.createTextNode("data"),
		anotherDocument.implementation.createDocument("namespaceURI", "qualifiedNameStr"),
		anotherDocument.implementation.createDocument("namespaceURI", "qualifiedNameStr").createCDATASection("data"),
		anotherDocument.implementation.createDocumentType("qualifiedNameStr", "publicId", "systemId"),
		anotherDocument.implementation.createHTMLDocument("title")
	];

	fixtures.forEach(fixture => expect(isDOMElement(fixture)).to.be.false);
}));



it("returns true for an HTMLElement", runInBrowser(() =>
{
	["a", "b", "div"].forEach(tagName =>
	{
		expect(isDOMElement(document.createElement(tagName))).to.be.true;
		expect(isDOMElement(anotherDocument.createElement(tagName))).to.be.true;
	});
}));
