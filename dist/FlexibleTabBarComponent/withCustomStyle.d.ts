import * as React from 'react';
import { OverwriteProps } from './FlexibleTabBarComponent';
interface Any {
    defaultFlexValue?: number;
    activeFlexValue?: number;
    tabBarHeight?: number;
}
declare const withCustomStyle: (overwriteProps: OverwriteProps & Any) => (Component: any) => React.FunctionComponent<{}>;
export default withCustomStyle;
