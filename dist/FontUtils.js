"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getFontUrl = exports.downloadFont = void 0;
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
var google_fonts_03172023_json_1 = __importDefault(require("./dependencies/google_fonts_03172023.json"));
function downloadFont(url, filePath) {
    if (!fs_1["default"].existsSync(filePath)) { // download if it doesn't already exist
        (0, axios_1["default"])({
            url: url,
            responseType: "stream"
        }).then(function (response) {
            response.data.pipe(fs_1["default"].createWriteStream(filePath));
        });
    }
}
exports.downloadFont = downloadFont;
function getFontUrl(family, variant) {
    var f = google_fonts_03172023_json_1["default"].items.find(function (t) { return t.family === family; });
    if (f == undefined) {
        return "Font not found";
    }
    var v = f.variants.includes(variant);
    if (!v) {
        return "Variant not found";
    }
    return f.files[variant];
}
exports.getFontUrl = getFontUrl;
//# sourceMappingURL=FontUtils.js.map