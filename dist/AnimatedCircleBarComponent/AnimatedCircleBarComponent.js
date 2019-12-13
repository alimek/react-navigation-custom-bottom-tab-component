"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var react_native_svg_1 = require("react-native-svg");
var shape = require("d3-shape");
var screenWidth = react_native_1.Dimensions.get('window').width;
var height = 49;
var duration = 200;
var line = shape
    .line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .curve(shape.curveBasis);
var platformZeroPoint = react_native_1.Platform.select({
    ios: 0,
    android: 1,
});
var AnimatedCircleBarComponent = /** @class */ (function (_super) {
    __extends(AnimatedCircleBarComponent, _super);
    function AnimatedCircleBarComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            previousIndex: null,
        };
        _this.navigateAnimation = function (prevItemIndex) {
            var navigation = _this.props.navigation;
            var state = navigation.state;
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(_this.itemsAnimation[prevItemIndex], {
                    toValue: 1,
                    duration: duration,
                    easing: react_native_1.Easing.linear,
                    useNativeDriver: true,
                }),
                react_native_1.Animated.timing(_this.itemsAnimation[state.index], {
                    toValue: 0,
                    duration: duration,
                    easing: react_native_1.Easing.linear,
                    useNativeDriver: true,
                }),
                react_native_1.Animated.spring(_this.currentIndexAnimatedValue, {
                    toValue: navigation.state.index,
                    useNativeDriver: true,
                }),
            ]).start();
        };
        _this.renderLabel = function (_a) {
            var focused = _a.focused, route = _a.route, index = _a.index;
            if (focused) {
                return null;
            }
            var _b = _this.props, getLabelText = _b.getLabelText, activeTintColor = _b.activeTintColor, inactiveTintColor = _b.inactiveTintColor, allowFontScaling = _b.allowFontScaling, labelStyle = _b.labelStyle;
            var color = focused ? activeTintColor : inactiveTintColor;
            return (<react_native_1.Animated.Text allowFontScaling={allowFontScaling} style={[styles.text, labelStyle, { color: color, opacity: _this.itemsAnimation[index] }]}>
        {getLabelText({ route: route })}
      </react_native_1.Animated.Text>);
        };
        _this.renderIcon = function (props) {
            var renderIcon = _this.props.renderIcon;
            if (!props.forceRender && props.focused) {
                return null;
            }
            return renderIcon(props);
        };
        _this.renderAnimatedBackground = function () {
            var navigation = _this.props.navigation;
            var state = navigation.state;
            var routes = state.routes;
            var translateX = _this.currentIndexAnimatedValue.interpolate({
                inputRange: routes.map(function (_route, index) { return index; }),
                outputRange: routes.map(function (_route, index) { return index * (screenWidth / routes.length); }),
                extrapolate: 'clamp',
            });
            return (<react_native_1.Animated.View style={[
                {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: screenWidth / routes.length,
                    transform: [
                        {
                            translateX: translateX,
                        },
                    ],
                },
            ]}>
        <react_native_svg_1.Svg width={screenWidth / routes.length} height={height} style={{
                top: -(height - platformZeroPoint),
                transform: [
                    {
                        rotate: '180deg',
                    },
                ],
            }}>
          <react_native_svg_1.Path d={line(_this.data)} stroke={'rgba(0, 0, 0, .3)'} strokeWidth={react_native_1.StyleSheet.hairlineWidth} fill="white"/>
        </react_native_svg_1.Svg>
      </react_native_1.Animated.View>);
        };
        _this.renderActiveItem = function () {
            var previousIndex = _this.state.previousIndex;
            var navigation = _this.props.navigation;
            var state = navigation.state;
            var routes = state.routes;
            var size = screenWidth / routes.length;
            var translateX = _this.currentIndexAnimatedValue.interpolate({
                inputRange: routes.map(function (_route, index) { return index; }),
                outputRange: routes.map(function (_route, index) { return index * (screenWidth / routes.length); }),
                extrapolate: 'clamp',
            });
            var scale = _this.itemsAnimation[state.index].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1],
                extrapolate: 'clamp',
            });
            var translateY = _this.itemsAnimation[state.index].interpolate({
                inputRange: [0, 1],
                outputRange: [-5, -5],
                extrapolate: 'clamp',
            });
            return (<react_native_1.Animated.View style={[
                styles.activeItem,
                {
                    marginLeft: (size - height) / 2,
                    width: height,
                    height: height,
                    borderRadius: 50,
                    transform: [
                        {
                            translateX: translateX,
                        },
                        {
                            translateY: translateY,
                        },
                        {
                            scale: scale,
                        },
                    ],
                },
            ]}>
        {previousIndex !== null ? (<react_native_1.Animated.View style={[
                styles.activeItemIcon,
                {
                    opacity: _this.itemsAnimation[previousIndex].interpolate({
                        inputRange: [0, 0.8],
                        outputRange: [1, 0],
                    }),
                },
            ]}>
            {_this.renderIcon({
                index: previousIndex,
                route: routes[previousIndex],
                focused: true,
                forceRender: true,
            })}
          </react_native_1.Animated.View>) : null}
        <react_native_1.Animated.View style={[
                styles.activeItemIcon,
                {
                    opacity: _this.itemsAnimation[state.index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                    }),
                },
            ]}>
          {_this.renderIcon({
                index: state.index,
                route: routes[state.index],
                focused: true,
                forceRender: true,
            })}
        </react_native_1.Animated.View>
      </react_native_1.Animated.View>);
        };
        var navigation = props.navigation;
        var state = navigation.state;
        var routes = state.routes;
        _this.currentIndexAnimatedValue = new react_native_1.Animated.Value(state.index);
        _this.itemsAnimation = routes.map(function (_route, index) { return new react_native_1.Animated.Value(state.index === index ? 0 : 1); });
        _this.data = [
            { x: 0, y: platformZeroPoint },
            { x: 10, y: platformZeroPoint },
            { x: screenWidth / (routes.length * 2), y: 20 },
            { x: screenWidth / routes.length - 10, y: platformZeroPoint },
            { x: screenWidth / routes.length, y: platformZeroPoint },
        ];
        return _this;
    }
    AnimatedCircleBarComponent.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return (nextProps.navigation.state.index !== this.props.navigation.state.index ||
            this.state.previousIndex !== nextState.previousIndex);
    };
    AnimatedCircleBarComponent.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.navigation.state.index !== this.props.navigation.state.index) {
            this.setState({
                previousIndex: prevProps.navigation.state.index,
            });
            this.navigateAnimation(prevProps.navigation.state.index);
        }
    };
    AnimatedCircleBarComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, navigation = _a.navigation, onTabPress = _a.onTabPress;
        var state = navigation.state;
        var routes = state.routes;
        return (<react_native_1.SafeAreaView style={[styles.container, style]}>
        {this.renderAnimatedBackground()}
        {routes.map(function (route, index) {
            var focused = state.index === index;
            return (<react_native_1.TouchableWithoutFeedback onPress={function () { return onTabPress({ route: route }); }} key={index.toString()}>
              <react_native_1.View style={styles.item}>
                {_this.renderIcon({ index: index, route: route, focused: focused })}
                {_this.renderLabel({ index: index, route: route, focused: focused })}
              </react_native_1.View>
            </react_native_1.TouchableWithoutFeedback>);
        })}
        {this.renderActiveItem()}
      </react_native_1.SafeAreaView>);
    };
    return AnimatedCircleBarComponent;
}(React.Component));
exports.default = AnimatedCircleBarComponent;
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'relative',
        borderTopWidth: react_native_1.StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0, 0, 0, .3)',
    },
    text: {},
    item: {
        flex: 1,
        height: height,
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
