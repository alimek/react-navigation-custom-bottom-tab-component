import * as React from 'react';
import { OverwriteProps } from './TabBarComponent';

const withCustomStyle = (overwriteProps: OverwriteProps) => (Component: any): React.FunctionComponent => (props: any) => (
  <Component {...props} {...overwriteProps} />
);

export default withCustomStyle;
