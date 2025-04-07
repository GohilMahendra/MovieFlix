import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {scaledVal} from '../../globals/utilities';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';
const {width} = Dimensions.get('screen');

interface MovieCardShimmerProps {
  testID: string;
}

const MovieCardShimmer = (props: MovieCardShimmerProps) => {
  const {testID} = props;
  return (
    <View testID={`${testID}MovieCardShimmer_view`}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.container}
        shimmerColors={['#2e2e2e', '#3a3a3a', '#2e2e2e']}
      />
    </View>
  );
};
export default React.memo(MovieCardShimmer);

const styles = StyleSheet.create({
  container: {
    height: scaledVal(200),
    width: width / 3 - 20 / 2,
    borderRadius: scaledVal(15),
    margin: scaledVal(5),
  },
});
