import * as React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TouchableOpacity, Text } from 'react-native';

const MockedScreen = ({ navigation }: any) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity onPress={() => navigation.navigate('FlexibleTabBarNavigator')}>
      <Text>Switch to FlexibleTabBarNavigator</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('AnimatedCircleNavigation')}>
      <Text>Switch to AnimatedCircleNavigator</Text>
    </TouchableOpacity>
  </View>
);

import { FlexibleTabBarComponent, withCustomStyle } from '../library/FlexibleTabBarComponent';
import { AnimatedCircleNavigator } from '../library/AnimatedCircleBarComponent';

const HomeStack = createStackNavigator({
  Dashboard: {
    screen: MockedScreen,
    navigationOptions: {
      title: 'Dashboard',
    },
  },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <FontAwesome5 name="comment-alt" style={{ fontSize: 20, color: focused ? 'blue' : 'black' }} />
  ),
};

const LinksStack = createStackNavigator({
  Chat: {
    screen: MockedScreen,
    navigationOptions: {
      title: 'Chat',
    },
  },
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <FontAwesome5 name="comment-alt" style={{ fontSize: 20, color: focused ? 'blue' : 'black' }} />
  ),
};

const SettingsStack = createStackNavigator({
  Search: {
    screen: MockedScreen,
    navigationOptions: {
      title: 'Search',
    },
  },
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <FontAwesome5 name="comment-alt" style={{ fontSize: 20, color: focused ? 'blue' : 'black' }} />
  ),
};

const SettingsStack2 = createStackNavigator({
  Profile: {
    screen: MockedScreen,
    navigationOptions: {
      title: 'Profile',
    },
  },
});

SettingsStack2.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <FontAwesome5 name="user" style={{ fontSize: 20, color: focused ? 'blue' : 'black' }} />
  ),
};

const FlexibleTabBarNavigator = createBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack,
    SettingsStack2,
  },
  {
    tabBarComponent: withCustomStyle({
      defaultFlexValue: 1,
      activeFlexValue: 2,
    })(FlexibleTabBarComponent),
  },
);

const AnimatedCircleNavigation = createBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack,
    SettingsStack2,
    SettingsStack3: SettingsStack2,
  },
  {
    tabBarComponent: AnimatedCircleNavigator,
  },
);

const Navigator = createSwitchNavigator({
  FlexibleTabBarNavigator,
  AnimatedCircleNavigation,
}, {
  initialRouteName: 'AnimatedCircleNavigation',
});

export default createAppContainer(Navigator);
