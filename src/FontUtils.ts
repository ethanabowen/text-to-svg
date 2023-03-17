import axios from "axios";
import fs from "fs";
import fontList from "./dependencies/google_fonts_03172023.json";

export function downloadFont(url: string, filePath: string) {
  if (!fs.existsSync(filePath)) { // download if it doesn't already exist
    axios({
      url,
      responseType: "stream",
    }).then((response) => {
      response.data.pipe(fs.createWriteStream(filePath));
    });
  }
}

export function getFontUrl(family: string, variant: string): string {
  var f = fontList.items.find((t) => t.family === family);

  if (f == undefined) {
    return "Font not found";
  }

  var v = f.variants.includes(variant);

  if (!v) {
    return "Variant not found";
  }

  return f.files[variant];
}
