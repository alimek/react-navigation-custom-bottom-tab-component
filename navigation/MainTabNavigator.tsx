import * as React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';

const MockedScreen = () => <View />;

import { TabBarComponent, withCustomStyle } from '../library';

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
    <FontAwesome5 name="comment-alt" style={{ fontSize: 20, color: focused ? 'red' : 'black' }} />
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
    <FontAwesome5 name="comment-alt" style={{ fontSize: 20, color: focused ? 'red' : 'black' }} />
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
    <FontAwesome5 name="comment-alt" style={{ fontSize: 20, color: focused ? 'red' : 'black' }} />
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
    <FontAwesome5 name="user" style={{ fontSize: 20, color: focused ? 'red' : 'black' }} />
  ),
};

const Navigation = createBottomTabNavigator(
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
    })(TabBarComponent),
  },
);

export default createAppContainer(Navigation);
