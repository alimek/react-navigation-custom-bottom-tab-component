import * as React from 'react';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  Animated,
  Dimensions,
  Easing, Platform,
} from 'react-native';
import { NavigationState } from 'react-navigation';
import { Svg, Path } from 'react-native-svg';
import * as shape from 'd3-shape';

const { width: screenWidth } = Dimensions.get('window');
const height = 49;
const duration = 200;

interface OverwriteProps {
  style?: ViewStyle;
  activeTintColor?: string;
  inactiveTintColor?: string;
  allowFontScaling?: boolean;
  labelStyle?: any;
  tintColor?: string;
}

interface RNProps {
  navigation: {
    state: NavigationState;
  };
  onTabPress: ({ route }: { route: any }) => void;
  renderIcon?: any;
  getLabelText: (props: { route: any }) => any;
}

interface State {
  previousIndex: null | number;
}

type Props = RNProps & OverwriteProps;

const line: any = shape
  .line()
  .x((d: any) => d.x)
  .y((d: any) => d.y)
  .curve(shape.curveBasis);

const platformZeroPoint = Platform.select({
  ios: 0,
  android: 1,
});

class AnimatedCircleNavigator extends React.Component<Props, State> {
  currentIndexAnimatedValue: Animated.Value;
  itemsAnimation: Animated.Value[];
  data: { x: number; y: number }[];

  state = {
    previousIndex: null,
  };

  constructor(props: Props) {
    super(props);

    const { navigation } = props;
    const { state } = navigation;
    const { routes } = state;

    this.currentIndexAnimatedValue = new Animated.Value(state.index);
    this.itemsAnimation = routes.map((_route, index) => new Animated.Value(state.index === index ? 0 : 1));

    this.data = [
      { x: 0, y: platformZeroPoint },
      { x: 10, y: platformZeroPoint },
      { x: screenWidth / (routes.length * 2), y: 20 },
      { x: screenWidth / routes.length - 10, y: platformZeroPoint },
      { x: screenWidth / routes.length, y: platformZeroPoint },
    ];
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean {
    return (
      nextProps.navigation.state.index !== this.props.navigation.state.index ||
      this.state.previousIndex !== nextState.previousIndex
    );
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.navigation.state.index !== this.props.navigation.state.index) {
      this.setState({
        previousIndex: prevProps.navigation.state.index,
      });
      this.navigateAnimation(prevProps.navigation.state.index);
    }
  }

  navigateAnimation = (prevItemIndex: number) => {
    const { navigation } = this.props;
    const { state } = navigation;

    Animated.parallel([
      Animated.timing(this.itemsAnimation[prevItemIndex], {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this.itemsAnimation[state.index], {
        toValue: 0,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.spring(this.currentIndexAnimatedValue, {
        toValue: navigation.state.index,
        useNativeDriver: true,
      }),
    ]).start();
  };

  renderLabel = ({ focused, route, index }: { index: number; focused: boolean; route: any }) => {
    if (focused) {
      return null;
    }

    const { getLabelText, activeTintColor, inactiveTintColor, allowFontScaling, labelStyle } = this.props;
    const color = focused ? activeTintColor : inactiveTintColor;

    return (
      <Animated.Text
        allowFontScaling={allowFontScaling}
        style={[styles.text, labelStyle, { color, opacity: this.itemsAnimation[index] }]}
      >
        {getLabelText({ route })}
      </Animated.Text>
    );
  };

  renderIcon = (props: { index: number; route: any; focused: boolean }): React.ReactNode => {
    const { renderIcon } = this.props;

    if (props.focused) {
      return null;
    }

    return renderIcon(props);
  };

  renderAnimatedBackground = () => {
    const { navigation } = this.props;
    const { state } = navigation;
    const { routes } = state;

    const translateX = this.currentIndexAnimatedValue.interpolate({
      inputRange: routes.map((_route, index) => index),
      outputRange: routes.map((_route, index) => index * (screenWidth / routes.length)),
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: screenWidth / routes.length,
            transform: [
              {
                translateX,
              },
            ],
          },
        ]}
      >
        <Svg
          width={screenWidth / routes.length}
          height={height}
          style={{
            top: -(height - platformZeroPoint),
            transform: [
              {
                rotate: '180deg',
              },
            ],
          }}
        >
          <Path d={line(this.data)} stroke={'rgba(0, 0, 0, .3)'} strokeWidth={StyleSheet.hairlineWidth} fill="white" />
        </Svg>
      </Animated.View>
    );
  };

  renderActiveItem = () => {
    const { previousIndex } = this.state;
    const { navigation } = this.props;
    const { state } = navigation;
    const { routes } = state;
    const size = screenWidth / routes.length;

    const translateX = this.currentIndexAnimatedValue.interpolate({
      inputRange: routes.map((_route, index) => index),
      outputRange: routes.map((_route, index) => index * (screenWidth / routes.length)),
      extrapolate: 'clamp',
    });

    const scale = this.itemsAnimation[state.index].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1],
      extrapolate: 'clamp',
    });

    const translateY = this.itemsAnimation[state.index].interpolate({
      inputRange: [0, 1],
      outputRange: [-5, -5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.activeItem,
          {
            marginLeft: (size - height) / 2,
            width: height,
            height: height,
            borderRadius: 50,
            transform: [
              {
                translateX,
              },
              {
                translateY,
              },
              {
                scale,
              },
            ],
          },
        ]}
      >
        {previousIndex !== null ? (
          <Animated.View
            style={[
              styles.activeItemIcon,
              {
                opacity: this.itemsAnimation[previousIndex].interpolate({
                  inputRange: [0, 0.8],
                  outputRange: [1, 0],
                }),
              },
            ]}
          >
            {this.renderIcon({
              index: previousIndex,
              route: routes[previousIndex],
              focused: false,
            })}
          </Animated.View>
        ) : null}
        <Animated.View
          style={[
            styles.activeItemIcon,
            {
              opacity: this.itemsAnimation[state.index].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          {this.renderIcon({
            index: state.index,
            route: routes[state.index],
            focused: false,
          })}
        </Animated.View>
      </Animated.View>
    );
  };

  render() {
    const { style, navigation, onTabPress } = this.props;
    const { state } = navigation;
    const { routes } = state;

    return (
      <SafeAreaView style={[styles.container, style]}>
        {this.renderAnimatedBackground()}
        {routes.map((route, index) => {
          const focused = state.index === index;

          return (
            <TouchableWithoutFeedback onPress={() => onTabPress({ route })} key={index.toString()}>
              <View style={styles.item}>
                {this.renderIcon({ index, route, focused })}
                {this.renderLabel({ index, route, focused })}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
        {this.renderActiveItem()}
      </SafeAreaView>
    );
  }
}

export default AnimatedCircleNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .3)',
  },
  text: {},
  item: {
    flex: 1,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: 100,
    height: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: 'absolute',
    top: -20,
  },
  activeItemIcon: {
    position: 'absolute',
  },
  activeItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
