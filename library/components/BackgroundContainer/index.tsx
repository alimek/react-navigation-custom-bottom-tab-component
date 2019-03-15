import * as React from 'react';
import { View, ViewStyle } from 'react-native';

import styles from './styles';

interface Props {
  style?: ViewStyle;
}

const BackgroundContainer: React.FunctionComponent<Props> = ({ style }: Props) => (
  <View style={styles.backgroundOverlay}>
    <View style={[styles.roundedBackground, style]} />
  </View>
);

export default BackgroundContainer;
