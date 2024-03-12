import { Dimensions, PixelRatio } from "react-native";
const screenWidth = Dimensions.get('window').width;
const referenceWidth = 375; // 375 dp as center

export const scaledVal = (value:number) => {
  const ratio = screenWidth / referenceWidth;
  const newValue = value * ratio;

  return PixelRatio.roundToNearestPixel(newValue);
};