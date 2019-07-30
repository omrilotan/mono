const assert = require("assert");
const markt = require("./");

describe("markt", async () => {
	it("without a template, converts to markdown", async () => {
		const res = await markt("*Hello*");

		assert.strictEqual(res, "<p><em>Hello</em></p>");
	});

	it("fills pattern in template", async () => {
		const res = await markt("*Hello*", "{{content}}");

		assert(res.includes("<p><em>Hello</em></p>"));
	});

	it("pattern can be padded with white space", async () => {
		expect(await markt("*Hello*", "{{ content }}")).to.equal(
			"<p><em>Hello</em></p>"
		);
	});

	it("test options object", async () => {
		const res = await markt("*Hello*", {
			template: "{{title}} {{content}}",
			title: "the title"
		});

		expect(res).to.include("<p><em>Hello</em></p>");
		expect(res).to.include("the title");
		expect(res).to.not.include("{{content}}");
		expect(res).to.not.include("{{title}}");
	});

	it("uses preset templates", async () => {
		const res = await markt("*Hello*", {
			preset: "plain",
			title: "Hi"
		});

		expect(res).to.include("<!DOCTYPE html>");
		expect(res).to.include("<title>Hi</title>");
	});

	it("falls back to default template when preset is not found", async () => {
		const test = async () =>
			await markt("*Hello*", {
				preset: "other",
				title: "Hi"
			});

		return expect(test()).to.be.rejected;
	});
});
