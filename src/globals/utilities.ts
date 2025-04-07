import {Dimensions, PixelRatio} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const referenceWidth = 375; // 375 dp as center
const maxWidthCap = 500;
export const scaledVal = (value: number) => {
  const effectiveWidth = screenWidth > maxWidthCap ? maxWidthCap : screenWidth;
  const ratio = effectiveWidth / referenceWidth;
  const newValue = value * ratio;

  return PixelRatio.roundToNearestPixel(newValue);
};

export const getNumColumns = () => {
  if (screenWidth >= 1000) return 5;
  if (screenWidth >= 700) return 4;
  return 3;
};

export const getCardWidth = () => {
  const spacing = 10;
  const numColumns = getNumColumns();

  const totalHorizontalSpacing = spacing * (numColumns - 1);
  // flatlist added 5 px left padding by default
  // can be resolved with justifyContent center but makes last columns looks odd
  // this is workaround for now
  const isTablet = screenWidth >= 700;
  const totalSidePadding = isTablet ? spacing * 2 : spacing + 5; // left + right FlatList padding

  const availableWidth =
    screenWidth - totalHorizontalSpacing - totalSidePadding;

  const cardWidth = availableWidth / numColumns;

  return Math.floor(cardWidth);
};
