
import { useWindowDimensions, PixelRatio } from "react-native";
const BASE_W = 375, BASE_H = 812;  //baz alınacak figma  ölçüleri

export function useScale(options ) {
 
  //useWindowDimensions() ->cihaz ekranının anlık genişlik ve yüksekliğini verir. Ekran dönerse (portrait/landscape) otomatik güncellenir.
  const { width, height } = useWindowDimensions();  //cihaz boyutunu al
 
  //Böylece ekran dönse bile (landscape/portrait) doğru değerler alınır.
  const shortest = Math.min(width, height); //Ekranın kısa kenarı,genelde genişlik  (portrait modda)
  const longest  = Math.max(width, height); //Ekranın uzun kenarı,genelde yükseklik (portrait modda)


//Eğer maxLayoutWidth verilmişse (örn. tabletlerde max 600px kullanmak istiyorum) → kısa kenar ile kıyaslanıp daha küçük olan seçilir.
//Yoksa direkt shortest alınır.
//Yani bu, layout’un fazla büyümesini engellemek için limit.
  const layoutW = options?.maxLayoutWidth
    ? Math.min(shortest, options.maxLayoutWidth)
    : shortest;


  //ekran genişliği/baz alınan fima genişliği 
  const hScale = layoutW / BASE_W;  //genişlik bazlı oran

  //ekran yüksekliği/baz alınan figma yüksekliği
  const vScale = longest / BASE_H;  //yükseklik bazlı oran

  //PixelRatio->Cihazın piksel yoğunluğunu (DPI) bilmek ve değerleri yuvarlamak için kullanılır. Böylece bulanık görünüm engellenir.
  //Hesaplanan değerleri cihaz piksel yoğunluğuna göre en yakın sayıya yuvarlar.
  //Böylece fontlar, ikonlar bulanık görünmez.
  const round = (n) => PixelRatio.roundToNearestPixel(n); //Elde edilen değerleri cihazın piksel yoğunluğuna göre en yakın değere yuvarlıyor. Böylece daha keskin, bulanık olmayan çizimler elde ediliyor.


  const hs = (n) => round(n * hScale); //verilen değeri yatay ölçekle çarpıp ekrana uygun hale getirir.(icon, spacing, radius, font gibi çoğu yerde kullanılır)
  const vs = (n) => round(n * vScale); //dikey ölçekleme. (daha nadir, ama gerekli olduğunda kullanılabilir)             
  const ms = (n, f=0.2) => round(n + (hs(n) - n)*f); //“moderate scale”. Yani ani büyüme/küçülme yerine biraz yumuşatarak ölçekleme yapar.
  const fs = (n) => hs(n);  //font size için hs kullanılıyor.

  //Eğer kısa kenar 768px veya daha büyükse → cihaz tablet kabul edilir.
  const isTablet = shortest >= 768; 
  return { hs, vs, ms, fs, width: layoutW, height: longest, isTablet };
}
