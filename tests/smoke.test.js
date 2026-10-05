const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");

const html = read("index.html");
const css = read("css/styles.css");
const js = read("js/app.js");

for (const file of ["index.html", "css/styles.css", "js/app.js", "README.md", "package.json"]) {
  assert.ok(fs.existsSync(path.join(root, file)), `Missing required file: ${file}`);
}

assert.ok(html.includes('href="css/styles.css"'), "HTML must load external CSS");
assert.ok(html.includes('src="js/app.js"'), "HTML must load external JavaScript");
assert.ok(!html.includes("<style>"), "CSS should not remain inline");
assert.ok(!html.includes("<script>"), "JavaScript should not remain inline");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.deepStrictEqual([...new Set(duplicateIds)], [], "HTML contains duplicate IDs");

assert.ok(js.includes("const CATS="), "Meditation categories must be defined");
assert.ok(js.includes("const CAT_ICONS="), "Category presentation mapping must exist");
assert.ok(js.includes("const INTENTION_CATEGORY="), "Intentions must map to real categories");
assert.ok(js.includes("const targetCategory=INTENTION_CATEGORY[intention]"), "Recommendation logic must use intention mapping");

const meditationCategories = [...js.matchAll(/cat:"([^"]+)"/g)].map(match => match[1]);
const categoryBlock = js.match(/const CATS=\[(.*?)\];/s);
assert.ok(categoryBlock, "Could not locate CATS");
for (const category of meditationCategories) {
  assert.ok(categoryBlock[1].includes(`"${category}"`), `Missing category in CATS: ${category}`);
}

const requiredSelectors = [
  "#medGrid", "#playerTitle", "#bigPlay", "#moodRow",
  "#breathCircle", "#journalText", "#entryList", "#privacyCard"
];
for (const selector of requiredSelectors) {
  assert.ok(html.includes(`id="${selector.slice(1)}"`), `Missing UI element for ${selector}`);
}

console.log("✓ Lunabelle smoke tests passed.");
