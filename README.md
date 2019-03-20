# react-navigation-custom-bottom-tab-component
ReactNavigation - TabBarComponent with custom animation

Providing few solution for Bottom Navigation.

* FlexibleTabBarComponent
* AnimatedCircleBarComponent

## How it looks

It works both on iOS and Android!

FlexibleTabBarComponent iOS Preview:

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

```js
import { createBottomTabNavigator } from 'react-navigation';

import { TabBarComponent } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';

const Navigation = createBottomTabNavigator(
  bottomTabNavigatorRouteConfig,
  {
    tabBarComponent: TabBarComponent,
  },
);
```

If you would like to customize some styles you can do it by:

```js
import { createBottomTabNavigator } from 'react-navigation';
import { TabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';

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
