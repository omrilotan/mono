const { join } = require("path");
const { readdir } = require("fs").promises;
const count = require("@lets/count");

Object.entries({ __dirname, __filename }).forEach(([name, source]) => {
	delete require.cache[require.resolve(".")];
	const { clean, override, reset } = require(".")(source);

	let subject;

	describe(`abuser (${name}: ${source})`, () => {
		beforeEach(async () => {
			const ls = await readdir(join(__dirname, "./fixtures"));
			ls.forEach(filename => {
				delete require.cache[join(__dirname, "./fixtures", filename)];
			});
		});
		it("Should use module from cache (baseline)", () => {
			const path = "./fixtures/closure.1";

			subject = require(path);
			expect(subject(), count()).to.equal(1);
			expect(subject(), count()).to.equal(2);

			subject = require(path);
			expect(subject(), count()).to.equal(3);
		});
		it("Should clean up module", () => {
			const path = "./fixtures/closure.1";

			subject = require(path);
			expect(subject(), count()).to.equal(1);
			expect(subject(), count()).to.equal(2);

			clean(path);
			subject = require(path);
			expect(subject(), count()).to.equal(1);
		});
		it("Should clean up modules recursively", () => {
			const path = "./fixtures/closure.2";

			subject = require(path);
			expect(subject(), count()).to.equal(1);
			expect(subject(), count()).to.equal(2);

			delete require.cache[require.resolve(path)];
			subject = require(path);
			expect(subject(), count()).to.equal(3);

			clean(path);
			subject = require(path);
			expect(subject(), count()).to.equal(1);
		});
		it("Should override module behaviour", () => {
			const path = "./fixtures/closure.1";

			subject = require(path);
			expect(subject(), count()).to.equal(1);
			expect(subject(), count()).to.equal(2);

			override(path, () => "X");
			subject = require(path);
			expect(subject(), count()).to.equal("X");
		});
		it("Should reset module behaviour", () => {
			const path = "./fixtures/closure.1";

			subject = require(path);
			expect(subject(), count()).to.equal(1);
			expect(subject(), count()).to.equal(2);

			override(path, () => "X");
			subject = require(path);
			expect(subject(), count()).to.equal("X");

			reset(path);
			subject = require(path);
			expect(subject(), count()).to.equal(1);
			expect(subject(), count()).to.equal(2);
		});
		it("Should avoid RangeError caused by circular requires", () => {
			require("./fixtures/circular.2");
			expect(() => clean("./fixtures/circular.1")).not.to.throw();
		});
	});
});
