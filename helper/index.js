// useScale.ts
import { useWindowDimensions, PixelRatio } from "react-native";

const BASE_W = 375;  // Figma referans genişliği (iPhone 11)
const BASE_H = 812;  // Figma referans yüksekliği

export function useScale(options) {
  const { width, height /*, fontScale*/ } = useWindowDimensions();
  const shortest = Math.min(width, height);
  const longest  = Math.max(width, height);

  // Tabletlerde aşırı büyümeyi engelle
  const layoutW = options?.maxLayoutWidth
    ? Math.min(shortest, options.maxLayoutWidth)
    : shortest;

  const hScale = layoutW / BASE_W;     // yatay/spacing/ikon için
  const vScale = longest  / BASE_H;    // dikey ölçüler için (gerekliyse)

  const round = (n) => PixelRatio.roundToNearestPixel(n);

  // genişlik tabanlı ölçek
  const hs = (n) => round(n * hScale);

  // yükseklik tabanlı ölçek (daha az kullan)
  const vs = (n) => round(n * vScale);
  // moderate scale: aşırı büyümeyi yumuşat

  const ms = (n, factor = 0.2) => round(n + (hs(n) - n) * factor);
  // font: çoğu projede hs ile aynı; erişilebilirliği OS yönetsin diye fontScale’e elle dokunma
  
  const fs = (n) => hs(n);

  const isTablet = shortest >= 768;

  return { hs, vs, ms, fs, width: layoutW, height: longest, isTablet };
}
