export type TextToSvgRequest = {
    family: string;
    variant: string;
    text: string;
    size: number;
    union: boolean;
    filled: boolean;
    kerning: boolean;
    separate: boolean;
    bezierAccuracy: number;
    units: string;
    fill: string;
    stroke: string;
    strokeWidth: string;
    strokeNonScaling: boolean;
    fillRule: FillRule;
  };

export type FillRule = "nonzero" | "evenodd";