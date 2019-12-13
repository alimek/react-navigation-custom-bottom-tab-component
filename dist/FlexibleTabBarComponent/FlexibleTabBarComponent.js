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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var components_1 = require("../components");
var PressTypes;
(function (PressTypes) {
    PressTypes["IN"] = "in";
    PressTypes["OUT"] = "out";
})(PressTypes || (PressTypes = {}));
var screenWidth = react_native_1.Dimensions.get('window').width;
var defaultTabBarHeight = 49;
var FlexibleTabBarComponent = /** @class */ (function (_super) {
    __extends(FlexibleTabBarComponent, _super);
    function FlexibleTabBarComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.navigateAnimation = function (prevItemIndex) {
            var _a = _this.props, navigation = _a.navigation, defaultFlexValue = _a.defaultFlexValue, activeFlexValue = _a.activeFlexValue, duration = _a.duration;
            var state = navigation.state;
            var routes = state.routes;
            react_native_1.Animated.parallel(__spreadArrays([
                react_native_1.Animated.timing(_this.itemWidthAnimations[prevItemIndex], {
                    toValue: defaultFlexValue,
                    duration: duration,
                    easing: react_native_1.Easing.linear,
                }),
                react_native_1.Animated.timing(_this.itemWidthAnimations[state.index], {
                    toValue: activeFlexValue,
                    duration: duration,
                    easing: react_native_1.Easing.linear,
                })
            ], routes.map(function (_route, index) {
                return react_native_1.Animated.timing(_this.textAnimation[index], {
                    toValue: prevItemIndex === index ? 0 : state.index === index ? 1 : 0,
                    duration: duration * 1.2,
                    useNativeDriver: true,
                });
            }))).start();
            react_native_1.Animated.spring(_this.currentItem, {
                toValue: state.index,
                useNativeDriver: true,
            }).start();
        };
        _this.renderAnimatedBackground = function () {
            var _a = _this.props, navigation = _a.navigation, backgroundViewStyle = _a.backgroundViewStyle, activeFlexValue = _a.activeFlexValue, tabBarHeight = _a.tabBarHeight;
            var state = navigation.state;
            var routes = state.routes;
            var width = _this.itemWidth * activeFlexValue;
            var translateX = _this.currentItem.interpolate({
                inputRange: routes.map(function (_route, index) { return index; }),
                outputRange: routes.map(function (_route, index) {
                    return index * _this.itemWidth;
                }),
                extrapolate: 'clamp',
            });
            return (<react_native_1.Animated.View style={[
                styles.animatedBackground,
                {
                    width: width,
                    height: tabBarHeight,
                    transform: [
                        {
                            translateX: translateX,
                        },
                    ],
                },
            ]}>
        <components_1.BackgroundContainer style={backgroundViewStyle}/>
      </react_native_1.Animated.View>);
        };
        _this.renderLabel = function (_a) {
            var index = _a.index, focused = _a.focused, route = _a.route;
            var _b = _this.props, getLabelText = _b.getLabelText, navigation = _b.navigation, activeTintColor = _b.activeTintColor, inactiveTintColor = _b.inactiveTintColor, allowFontScaling = _b.allowFontScaling, labelStyle = _b.labelStyle;
            var state = navigation.state;
            var routes = state.routes;
            if (!focused) {
                return null;
            }
            var color = focused ? activeTintColor : inactiveTintColor;
            var scale = _this.currentItem.interpolate({
                inputRange: routes.map(function (_route, index) { return index; }),
                outputRange: routes.map(function (_route, index) { return (index === state.index ? 1 : 0.5); }),
                extrapolate: 'clamp',
            });
            var opacity = _this.textAnimation[index].interpolate({
                inputRange: [0.7, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            });
            return (<react_native_1.Animated.Text allowFontScaling={allowFontScaling} style={[
                styles.text,
                labelStyle,
                { color: color, opacity: opacity },
                {
                    transform: [
                        {
                            scale: scale,
                        },
                    ],
                },
            ]}>
        {getLabelText({ route: route })}
      </react_native_1.Animated.Text>);
        };
        _this.renderIcon = function (props) {
            var renderIcon = _this.props.renderIcon;
            if (!renderIcon) {
                return null;
            }
            return (<react_native_1.Animated.View style={[
                styles.icon,
                {
                    transform: [
                        {
                            scale: _this.pressAnimation[props.index],
                        },
                    ],
                },
            ]}>
        {renderIcon(props)}
      </react_native_1.Animated.View>);
        };
        _this.setTestID = function (props) {
            return 'tab-' + props.route.key;
        };
        _this.onPress = function (_a) {
            var index = _a.index, type = _a.type;
            var _b = _this.props, onPressInScale = _b.onPressInScale, onPressOutScale = _b.onPressOutScale, navigation = _b.navigation;
            var state = navigation.state;
            if (state.index === index) {
                return;
            }
            var toValue = type && type === PressTypes.IN ? onPressInScale : onPressOutScale;
            react_native_1.Animated.spring(_this.pressAnimation[index], {
                toValue: toValue || 1,
                useNativeDriver: true,
            }).start();
        };
        var navigation = props.navigation, activeFlexValue = props.activeFlexValue, defaultFlexValue = props.defaultFlexValue;
        var state = navigation.state;
        var routes = state.routes;
        _this.currentItem = new react_native_1.Animated.Value(state.index);
        _this.itemWidth = screenWidth / (props.navigation.state.routes.length + (activeFlexValue - defaultFlexValue));
        _this.itemWidthAnimations = routes.map(function (_route, index) { return new react_native_1.Animated.Value(index === state.index ? activeFlexValue : defaultFlexValue); });
        _this.pressAnimation = routes.map(function () { return new react_native_1.Animated.Value(1); });
        _this.textAnimation = routes.map(function () { return new react_native_1.Animated.Value(state.index === 0 ? 1 : 0); });
        return _this;
    }
    FlexibleTabBarComponent.prototype.shouldComponentUpdate = function (nextProps) {
        return nextProps.navigation.state.index !== this.props.navigation.state.index;
    };
    FlexibleTabBarComponent.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.navigation.state.index !== this.props.navigation.state.index) {
            this.navigateAnimation(prevProps.navigation.state.index);
        }
    };
    FlexibleTabBarComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, navigation = _a.navigation, onTabPress = _a.onTabPress, style = _a.style, tabBarHeight = _a.tabBarHeight;
        var state = navigation.state;
        var routes = state.routes;
        return (<react_native_1.SafeAreaView style={[styles.container, style]}>
        {this.renderAnimatedBackground()}
        {routes.map(function (route, key) {
            var focused = key === state.index;
            return (<react_native_1.TouchableWithoutFeedback testID={_this.setTestID({ route: route })} delayPressIn={200} onPressIn={function () { return _this.onPress({ index: key, type: PressTypes.IN }); }} onPressOut={function () { return _this.onPress({ index: key, type: PressTypes.OUT }); }} onPress={function () { return onTabPress({ route: route }); }} {...{ key: key }}>
              <react_native_1.Animated.View style={[
                styles.tabBarContainer,
                {
                    flex: _this.itemWidthAnimations[key],
                    height: tabBarHeight,
                },
            ]}>
                <react_native_1.Animated.View style={[
                styles.tabBarContent,
                {
                    transform: [
                        {
                            scale: _this.currentItem.interpolate({
                                inputRange: routes.map(function (_route, index) { return index; }),
                                outputRange: routes.map(function (_route, index) { return (index === key ? 1 : 0.7); }),
                            }),
                        },
                    ],
                },
            ]}>
                  {_this.renderIcon({ index: key, route: route, focused: focused })}
                  {_this.renderLabel({ index: key, route: route, focused: focused })}
                </react_native_1.Animated.View>
              </react_native_1.Animated.View>
            </react_native_1.TouchableWithoutFeedback>);
        })}
      </react_native_1.SafeAreaView>);
    };
    FlexibleTabBarComponent.defaultProps = {
        onPressInScale: 1.3,
        onPressOutScale: 1,
        allowFontScaling: true,
        defaultFlexValue: 1,
        activeFlexValue: 2,
        duration: 200,
        tabBarHeight: defaultTabBarHeight,
    };
    return FlexibleTabBarComponent;
}(React.Component));
exports.default = FlexibleTabBarComponent;
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'relative',
        borderTopWidth: react_native_1.StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0, 0, 0, .3)',
        flexDirection: 'row',
    },
    tabBarContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    tabBarContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    animatedBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    icon: {
        marginLeft: 10,
    },
    text: {
        flex: 1,
        textAlign: 'center',
    },
});
