///<reference path="../node_modules/makerjs/index.d.ts" />
import express, { Express, Request, Response } from "express";
import { TextToSvg } from "./TextToSvg";
import { TextToSvgRequest } from "./Types";

var textToSvg = new TextToSvg();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/text-to-svg/:text", async (req: Request, res: Response) => {
  console.log(`Request received for:  ${req.params.text}`)
  var textToSvgRequest: TextToSvgRequest = {
    family: "Roboto",
    variant: "100",
    text: req.params.text,
    size: 9,
    union: false,
    filled: true,
    kerning: true,
    separate: false,
    bezierAccuracy: 0,
    units: "mm",
    fill: "#000",
    stroke: "#000",
    strokeWidth: "0.15mm",
    strokeNonScaling: true,
    fillRule: "evenodd",
  };

  let result = textToSvg.textToSvg(textToSvgRequest as TextToSvgRequest);
  
  res.send(result);
});

app.listen(8080, async () => {
  console.log(`Server is running at localhost:8080`);
});
