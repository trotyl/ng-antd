"use strict";
exports.__esModule = true;
var fs = require("fs");
var MarkdownIt = require("markdown-it");
var path = require("path");
var Prism = require("prismjs");
var reflections_1 = require("../typedoc/models/reflections");
var reflection = require("../typedoc/reflection");
var util_1 = require("./util");
var md = new MarkdownIt({ html: true });
var root = path.join(__dirname, '../../src/app/components');
var result = {};
for (var _i = 0, _a = reflection.children; _i < _a.length; _i++) {
    var file = _a[_i];
    if (!file.children) {
        continue;
    }
    var packagePath = util_1.stripQuote(file.name);
    if (!packagePath.startsWith('src/app/components/')) {
        continue;
    }
    var _b = packagePath.replace('src/app/components/', '').split('/'), pkgName = _b[0], name_1 = _b[1];
    if (!result[pkgName]) {
        result[pkgName] = {
            demos: []
        };
    }
    var pkg = result[pkgName];
    for (var _c = 0, _d = file.children; _c < _d.length; _c++) {
        var exportable = _d[_c];
        if (exportable.kind === reflections_1.ReflectionKind.Class && exportable.decorators && exportable.decorators.some(function (deco) { return deco.name === 'Component'; })) {
            var order = 0;
            var title = null;
            if (exportable.comment && exportable.comment.tags) {
                var tags = exportable.comment.tags;
                var orderTag = tags.find(function (item) { return item.tag === 'order'; });
                if (orderTag) {
                    order = Number.parseInt(orderTag.text.trim());
                }
                var titleTag = tags.find(function (item) { return item.tag === 'title'; });
                if (titleTag) {
                    title = titleTag.text.trim();
                }
            }
            var description = '';
            if (exportable.comment && exportable.comment.shortText) {
                description = md.render(exportable.comment.shortText);
                if (exportable.comment.text) {
                    description += md.render(exportable.comment.text);
                }
            }
            var clazz = null;
            if (exportable.children) {
                var clazzPath = fs.readFileSync(file.originalName, 'utf-8');
                var body = clazzPath.split(/export\sclass\s.*?\s(?=\{)/)[1];
                var clazzString = "class DemoComponent " + body;
                clazz = { tokens: Prism.tokenize(clazzString, Prism.languages.javascript).map(util_1.normalizeToken) };
            }
            var templateUrl = file.originalName.replace('.ts', '.html');
            var templateString = fs.readFileSync(templateUrl, 'utf-8').trim();
            var template = {
                tokens: Prism.tokenize(templateString, Prism.languages.html).map(util_1.normalizeToken)
            };
            pkg.demos.push({
                name: name_1,
                description: description,
                order: order,
                title: title,
                clazz: clazz,
                template: template
            });
        }
    }
}
var outputPath = path.join(__dirname, './demo.js');
var content = "export const examples = " + JSON.stringify(result, undefined, 2);
fs.writeFileSync(outputPath, content, 'utf-8');
