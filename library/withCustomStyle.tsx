import * as React from 'react';
import { OverwriteProps } from './TabBarComponent';

interface Any {
  defaultFlexValue?: number;
  activeFlexValue?: number;
  tabBarHeight?: number;
}

const withCustomStyle = (overwriteProps: OverwriteProps & Any) => (Component: any): React.FunctionComponent => (props: any) => (
  <Component {...props} {...overwriteProps} />
);

export default withCustomStyle;
