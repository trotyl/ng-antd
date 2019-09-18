"use strict";
exports.__esModule = true;
function tokenizeType(type) {
    var tokens = [];
    switch (type.type) {
        case 'intrinsic':
            tokens.push([0 /* none */, type.name]);
            break;
        case 'stringLiteral':
            tokens.push([15 /* string */, "\"" + type.value + "\""]);
            break;
        case 'union':
            for (var i = 0; i < type.types.length; i++) {
                var elementType = type.types[i];
                tokens.push.apply(tokens, tokenizeType(elementType));
                if (i !== type.types.length - 1) {
                    tokens.push([0 /* none */, ' ']);
                    tokens.push([14 /* punctuation */, '|']);
                    tokens.push([0 /* none */, ' ']);
                }
            }
            break;
        case 'array':
            // TODO: use `type[]` format for simple types
            tokens.push([0 /* none */, 'Array']);
            tokens.push([14 /* punctuation */, '<']);
            tokens.push.apply(tokens, tokenizeType(type.elementType));
            tokens.push([14 /* punctuation */, '>']);
            break;
        case 'reference':
            tokens.push([0 /* none */, type.name]);
            if (type.typeArguments) {
                tokens.push([14 /* punctuation */, '<']);
                for (var i = 0; i < type.typeArguments.length; i++) {
                    var argumentType = type.typeArguments[i];
                    tokens.push.apply(tokens, tokenizeType(argumentType));
                    if (i !== type.typeArguments.length - 1) {
                        tokens.push([14 /* punctuation */, ',']);
                        tokens.push([0 /* none */, ' ']);
                    }
                }
                tokens.push([14 /* punctuation */, '>']);
            }
            break;
        default:
            tokens.push([0 /* none */, "TODO(type): " + type.type]);
    }
    return tokens;
}
exports.tokenizeType = tokenizeType;
function serializeType(type) {
    return {
        tokens: tokenizeType(type)
    };
}
exports.serializeType = serializeType;
function stripQuote(source) {
    return source.replace(/["']/g, '');
}
exports.stripQuote = stripQuote;
function mapTokenType(type) {
    switch (type) {
        case 'attr-name':
            return 1 /* attrName */;
        case 'attr-value':
            return 2 /* attrValue */;
        case 'boolean':
            return 3 /* boolean */;
        case 'class-name':
            return 4 /* className */;
        case 'comment':
            return 5 /* comment */;
        case 'function':
            return 6 /* function */;
        case 'interpolation':
            return 7 /* interpolation */;
        case 'interpolation-punctuation':
            return 8 /* interpolationPunctuation */;
        case 'keyword':
            return 9 /* keyword */;
        case 'number':
            return 10 /* number */;
        case 'operator':
            return 11 /* operator */;
        case 'parameter':
            return 12 /* parameter */;
        case 'property':
            return 13 /* property */;
        case 'punctuation':
            return 14 /* punctuation */;
        case 'string':
            return 15 /* string */;
        case 'style-attr':
            return 16 /* styleAttr */;
        case 'tag':
            return 17 /* tag */;
        case 'template-string':
            return 18 /* templateString */;
        case 'template-punctuation':
            return 19 /* templatePunctuation */;
        default:
            throw new Error("Unexpected type " + type);
    }
}
exports.mapTokenType = mapTokenType;
function normalizeToken(token) {
    if (typeof token === 'string') {
        return [0 /* none */, token];
    }
    if (typeof token.content === 'string') {
        return [mapTokenType(token.type), token.content];
    }
    if (!Array.isArray(token.content)) {
        return [mapTokenType(token.type), undefined, [normalizeToken(token.content)]];
    }
    return [mapTokenType(token.type), undefined, token.content.map(normalizeToken)];
}
exports.normalizeToken = normalizeToken;
