"use strict";
exports.__esModule = true;
exports.TextToSvg = void 0;
///<reference path="../node_modules/makerjs/index.d.ts" />
var opentype_js_1 = require("opentype.js");
var FontUtils_1 = require("./FontUtils");
var makerjs = require("makerjs");
var FONTS_FOLDER_PATH = "./fonts/";
var TextToSvg = /** @class */ (function () {
    function TextToSvg() {
    }
    TextToSvg.prototype.callMakerjs = function (font, text, size, union, filled, kerning, separate, bezierAccuracy, units, fill, stroke, strokeWidth, strokeNonScaling, fillRule) {
        //generate the text using a font
        var textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy, { kerning: kerning });
        if (separate) {
            for (var i in textModel.models) {
                textModel.models[i].layer = i;
            }
        }
        var svg = makerjs.exporter.toSVG(textModel, {
            fill: filled ? fill : undefined,
            stroke: stroke ? stroke : undefined,
            strokeWidth: strokeWidth ? strokeWidth : undefined,
            fillRule: fillRule ? fillRule : undefined,
            scalingStroke: !strokeNonScaling
        });
        return svg;
        //var dxf = makerjs.exporter.toDXF(textModel, {units: units, usePOLYLINE: true});
        //this.renderDiv.setAttribute('data-dxf', dxf);
    };
    TextToSvg.prototype.textToSvg = function (request) {
        var url = (0, FontUtils_1.getFontUrl)(request.family, request.variant);
        var filePath = FONTS_FOLDER_PATH + request.family + ".ttf";
        (0, FontUtils_1.downloadFont)(url, filePath);
        // load font from local
        var font = (0, opentype_js_1.loadSync)(filePath);
        if (font != undefined) {
            return this.callMakerjs(font, request.text, request.size, request.union, request.filled, request.kerning, request.separate, request.bezierAccuracy, request.units, request.fill, request.stroke, request.strokeWidth, request.strokeNonScaling, request.fillRule);
        }
        else {
            return "Font load fail";
        }
    };
    return TextToSvg;
}());
exports.TextToSvg = TextToSvg;
//# sourceMappingURL=TextToSvg.js.map