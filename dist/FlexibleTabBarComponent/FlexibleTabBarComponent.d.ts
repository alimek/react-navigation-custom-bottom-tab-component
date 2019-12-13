import * as React from 'react';
import { NavigationState } from 'react-navigation';
import { Animated, ViewStyle } from 'react-native';
declare enum PressTypes {
    IN = "in",
    OUT = "out"
}
export interface OverwriteProps {
    activeTintColor?: string;
    inactiveTintColor?: string;
    allowFontScaling?: boolean;
    labelStyle?: any;
    adaptive?: boolean;
    style?: ViewStyle;
    backgroundViewStyle?: ViewStyle;
    tintColor?: string;
    onPressInScale?: number;
    onPressOutScale?: number;
}
interface TabBarComponentProps {
    duration: number;
    tabBarHeight: number;
    allowFontScaling?: boolean;
    defaultFlexValue: number;
    activeFlexValue: number;
    navigation: {
        state: NavigationState;
    };
    onTabPress: ({ route }: {
        route: any;
    }) => void;
    renderIcon?: any;
    setTestID?: (props: {
        route: any;
    }) => string;
    getLabelText: (props: {
        route: any;
    }) => any;
    testID?: string;
}
declare type Props = OverwriteProps & TabBarComponentProps;
declare class FlexibleTabBarComponent extends React.Component<Props> {
    static defaultProps: {
        onPressInScale: number;
        onPressOutScale: number;
        allowFontScaling: boolean;
        defaultFlexValue: number;
        activeFlexValue: number;
        duration: number;
        tabBarHeight: number;
    };
    itemWidth: number;
    itemWidthAnimations: Animated.Value[];
    pressAnimation: Animated.Value[];
    textAnimation: Animated.Value[];
    currentItem: Animated.Value;
    constructor(props: Props);
    shouldComponentUpdate(nextProps: Readonly<Props>): boolean;
    componentDidUpdate(prevProps: Readonly<TabBarComponentProps>): void;
    navigateAnimation: (prevItemIndex: number) => void;
    renderAnimatedBackground: () => JSX.Element;
    renderLabel: ({ index, focused, route }: {
        index: number;
        focused: boolean;
        route: any;
    }) => JSX.Element | null;
    renderIcon: (props: {
        index: number;
        route: any;
        focused: boolean;
    }) => React.ReactNode;
    setTestID: (props: {
        route: any;
    }) => string;
    onPress: ({ index, type }: {
        index: number;
        type: PressTypes;
    }) => void;
    render(): JSX.Element;
}
export default FlexibleTabBarComponent;
