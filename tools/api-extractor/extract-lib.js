"use strict";
exports.__esModule = true;
var fs = require("fs");
var MarkdownIt = require("markdown-it");
var path = require("path");
var reflections_1 = require("../typedoc/models/reflections");
var reflection = require("../typedoc/reflection");
var util_1 = require("./util");
var md = new MarkdownIt({ html: true });
var result = {};
for (var _i = 0, _a = reflection.children; _i < _a.length; _i++) {
    var file = _a[_i];
    if (!file.children) {
        continue;
    }
    var packagePath = util_1.stripQuote(file.name);
    if (!packagePath.startsWith('projects/ng-antd/src/lib/')) {
        continue;
    }
    var pkgName = packagePath.replace('projects/ng-antd/src/lib/', '').split('/')[0];
    if (!result[pkgName]) {
        result[pkgName] = {
            intro: null,
            whenToUse: null,
            cols: 2,
            directives: []
        };
    }
    var pkg = result[pkgName];
    for (var _b = 0, _c = file.children; _b < _c.length; _b++) {
        var exportable = _c[_b];
        if (exportable.kind === reflections_1.ReflectionKind.Class && exportable.decorators) {
            var decorators = exportable.decorators;
            if (decorators.some(function (deco) { return deco.name === 'Directive' || deco.name === 'Component'; })) {
                var name_1 = exportable.name;
                var decorator = exportable.decorators.find(function (deco) { return deco.name === 'Directive' || deco.name === 'Component'; });
                if (!decorator) {
                    throw new Error("Internal error: missing valid decorator");
                }
                var meta = extractDecoratorMetadata(decorator);
                var _d = extractProperties(exportable), properties = _d.properties, inputs = _d.inputs, outputs = _d.outputs;
                pkg.directives.push({
                    name: name_1,
                    meta: meta,
                    properties: properties,
                    inputs: inputs,
                    outputs: outputs
                });
            }
            if (decorators.some(function (deco) { return deco.name === 'NgModule'; })) {
                if (exportable.comment) {
                    var comment = exportable.comment;
                    if (comment.shortText) {
                        var intro = md.render(comment.shortText);
                        if (comment.text) {
                            intro += md.render(comment.text);
                        }
                        pkg.intro = intro;
                    }
                    if (comment.tags) {
                        var whenToUse = comment.tags.find(function (tag) { return tag.tag.toLowerCase() === 'whenToUse'.toLowerCase(); });
                        if (whenToUse) {
                            pkg.whenToUse = md.render(whenToUse.text);
                        }
                        var cols = comment.tags.find(function (tag) { return tag.tag.toLowerCase() === 'cols'.toLowerCase(); });
                        if (cols) {
                            pkg.cols = Number.parseInt(cols.text.trim(), 10);
                        }
                    }
                }
            }
        }
    }
}
function extractDecoratorMetadata(decorator) {
    return decorator.arguments.obj;
}
function extractProperties(declaration) {
    if (!declaration.children) {
        return { inputs: {}, outputs: {}, properties: [] };
    }
    var inputs = {};
    var outputs = {};
    var properties = [];
    for (var _i = 0, _a = declaration.children; _i < _a.length; _i++) {
        var property = _a[_i];
        if (property.kind === reflections_1.ReflectionKind.Property) {
            if (property.name.endsWith('$')) {
                continue;
            }
            if (property.flags.isPrivate) {
                continue;
            }
            if (property.comment && property.comment.tags && property.comment.tags.some(function (tag) { return tag.tag === 'internal'; })) {
                continue;
            }
            var description = property.comment && property.comment.shortText;
            properties.push({
                name: property.name,
                description: description ? md.renderInline(description) : undefined,
                type: util_1.serializeType(property.type),
                defaultValue: property.defaultValue ? property.defaultValue.trim() : undefined
            });
            if (!property.decorators) {
                continue;
            }
            if (property.decorators.some(function (deco) { return deco.name === 'Input'; })) {
                var input = property.decorators.find(function (deco) { return deco.name === 'Input'; });
                var attrName = input.arguments.bindingPropertyName ? util_1.stripQuote(input.arguments.bindingPropertyName) : null;
                inputs[property.name] = attrName;
            }
            if (property.decorators.some(function (deco) { return deco.name === 'Output'; })) {
                var output = property.decorators.find(function (deco) { return deco.name === 'Output'; });
                var attrName = output.arguments.bindingPropertyName ? util_1.stripQuote(output.arguments.bindingPropertyName) : null;
                outputs[property.name] = attrName;
            }
        }
    }
    return { properties: properties, inputs: inputs, outputs: outputs };
}
var outputPath = path.join(__dirname, './lib.js');
var content = "export const packages = " + JSON.stringify(result, undefined, 2);
fs.writeFileSync(outputPath, content, 'utf-8');
