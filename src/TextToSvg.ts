///<reference path="../node_modules/makerjs/index.d.ts" />
import opentype, { loadSync } from "opentype.js";
import { downloadFont, getFontUrl } from "./FontUtils";
import { TextToSvgRequest, FillRule } from "./Types";

var makerjs = require("makerjs") as typeof MakerJs;

const FONTS_FOLDER_PATH = "./fonts/";

export class TextToSvg {
  callMakerjs(
    font: opentype.Font,
    text: string,
    size: number,
    union: boolean,
    filled: boolean,
    kerning: boolean,
    separate: boolean,
    bezierAccuracy: number,
    units: string,
    fill: string,
    stroke: string,
    strokeWidth: string,
    strokeNonScaling: boolean,
    fillRule: FillRule
  ) {
    //generate the text using a font
    var textModel = new makerjs.models.Text(
      font,
      text,
      size,
      union,
      false,
      bezierAccuracy,
      { kerning }
    );

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
      scalingStroke: !strokeNonScaling,
    });

    return svg;
    //var dxf = makerjs.exporter.toDXF(textModel, {units: units, usePOLYLINE: true});
    //this.renderDiv.setAttribute('data-dxf', dxf);
  }

  textToSvg(request: TextToSvgRequest) {
    const url = getFontUrl(request.family, request.variant);

    const filePath = FONTS_FOLDER_PATH + request.family + ".ttf";
    downloadFont(url, filePath);

    // load font from local
    let font = loadSync(filePath);

    if (font != undefined) {
      return this.callMakerjs(
        font,
        request.text,
        request.size,
        request.union,
        request.filled,
        request.kerning,
        request.separate,
        request.bezierAccuracy,
        request.units,
        request.fill,
        request.stroke,
        request.strokeWidth,
        request.strokeNonScaling,
        request.fillRule
      );
    } else {
      return "Font load fail";
    }
  }
}
