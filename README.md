# react-navigation-custom-bottom-tab-component
ReactNavigation - TabBarComponent with custom animation

## How it looks

It works both on iOS and Android!

iOS Preview:

![iOS](https://thumbs.gfycat.com/AdorableCelebratedLemur.webp)

## Installation and usage

### Install

```bash
$ yarn add react-navigation-custom-bottom-tab-component
```

or 

```bash
$ npm install react-navigation-custom-bottom-tab-component --save
```

### Usage

Usage with default theme

```
import * as React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

import { TabBarComponent } from 'react-navigation-custom-bottom-tab-component';

const Navigation = createBottomTabNavigator(
  bottomTabNavigatorRouteConfig,
  {
    tabBarComponent: TabBarComponent,
  },
);

export default createAppContainer(Navigation);

```

If you would like to customize some styles you can do it by:

```
import { TabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component';

const Navigation = createBottomTabNavigator(
  bottomTabNavigatorRouteConfig,
  {
    tabBarComponent: withCustomStyle({
        style: {
            backgroundColor: 'red',
        },
    })(TabBarComponent),
  },
);
```

## Documentation

[See documentation](https://alimek.github.io/react-navigation-custom-bottom-tab-component/)
