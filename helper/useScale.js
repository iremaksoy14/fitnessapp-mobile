
import { useWindowDimensions, PixelRatio } from "react-native";
const BASE_W = 375, BASE_H = 812;

export function useScale(options ) {
 
  const { width, height } = useWindowDimensions();
 
  const shortest = Math.min(width, height);
  const longest  = Math.max(width, height);

  const layoutW = options?.maxLayoutWidth
    ? Math.min(shortest, options.maxLayoutWidth)
    : shortest;

  const hScale = layoutW / BASE_W;
  const vScale = longest / BASE_H;
  const round = (n) => PixelRatio.roundToNearestPixel(n);

  const hs = (n) => round(n * hScale);                 // spacing/icon/radius/font
  const vs = (n) => round(n * vScale);                 // nadir: dikey zorunlu
  const ms = (n, f=0.2) => round(n + (hs(n) - n)*f);   // yumuşak büyütme
  const fs = (n) => hs(n);                             // font

  const isTablet = shortest >= 768;
  return { hs, vs, ms, fs, width: layoutW, height: longest, isTablet };
}
