import { OverlayLayer, Pipe } from "@qatium/plugin/engine";
import { Color } from "@deck.gl/core/typed";
import { Feature } from "geojson";

export const buildPipeLayer = (
  id: string,
  pipes: Pipe[],
  color: string
): OverlayLayer<"GeoJsonLayer"> => {
  return {
    type: "GeoJsonLayer",
    id,
    data: pipes.map(
      (pipe) =>
        ({
          type: "Feature",
          geometry: pipe.geometry,
          properties: {}
        }) as Feature
    ),
    opacity: 1,
    getLineColor: hexToRgb(color),
    getLineWidth: 2,
    lineWidthUnits: "pixels",
    stroked: true,
    lineJointRounded: true,
    lineCapRounded: true,
    visible: true
  };
};

// const hexToRgb = (hex: string): Color => {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result
//     ? [
//         parseInt(result[1], 16),
//         parseInt(result[2], 16),
//         parseInt(result[3], 16),
//       ]
//     : [0, 0, 0];
// };

const hexToRgb = (hex: string): Color => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        hexToDecimal(result[1]),
        hexToDecimal(result[2]),
        hexToDecimal(result[3])
      ]
    : [0, 0, 0];
};

const hexToDecimal = (hexString: string): number => {
  const hexDigits = "0123456789ABCDEF";
  let decimalNumber = 0;

  for (let i = 0; i < hexString.length; i++) {
    const digit = hexDigits.indexOf(hexString[i].toUpperCase());
    if (digit === -1) {
      throw new Error("Invalid hexadecimal string");
    }
    decimalNumber = decimalNumber * 16 + digit;
  }

  return decimalNumber;
};