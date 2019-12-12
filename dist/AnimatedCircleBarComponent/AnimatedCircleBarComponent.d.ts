import * as React from 'react';
import { ViewStyle, Animated } from 'react-native';
import { NavigationState } from 'react-navigation';
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
    onTabPress: ({ route }: {
        route: any;
    }) => void;
    renderIcon?: any;
    getLabelText: (props: {
        route: any;
    }) => any;
}
interface State {
    previousIndex: null | number;
}
declare type Props = RNProps & OverwriteProps;
declare class AnimatedCircleBarComponent extends React.Component<Props, State> {
    currentIndexAnimatedValue: Animated.Value;
    itemsAnimation: Animated.Value[];
    data: {
        x: number;
        y: number;
    }[];
    state: {
        previousIndex: null;
    };
    constructor(props: Props);
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean;
    componentDidUpdate(prevProps: Readonly<Props>): void;
    navigateAnimation: (prevItemIndex: number) => void;
    renderLabel: ({ focused, route, index }: {
        index: number;
        focused: boolean;
        route: any;
    }) => JSX.Element | null;
    renderIcon: (props: {
        index: number;
        route: any;
        focused: boolean;
        forceRender?: boolean | undefined;
    }) => React.ReactNode;
    renderAnimatedBackground: () => JSX.Element;
    renderActiveItem: () => JSX.Element;
    render(): JSX.Element;
}
export default AnimatedCircleBarComponent;
