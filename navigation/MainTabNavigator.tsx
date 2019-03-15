import * as React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';

const MockedScreen = () => <View />;
const withHeader = ({ title }: { title: string}) => (Component: any) => {
  Component.navigationOptions = {
    ...Component.navigationOptions,
    title,
  };

  return Component;
};

import { TabBarComponent } from '../library';

const HomeStack = createStackNavigator({
  Dashboard: withHeader({ title: 'Dashboard' })(MockedScreen),
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: () => <FontAwesome5 name="comment-alt" style={{ fontSize: 20, color: 'black' }} />,
};

const LinksStack = createStackNavigator({
  Chat: withHeader({ title: 'Chat' })(MockedScreen),
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: () => <FontAwesome5 name="comment-alt" style={{ fontSize: 20, color: 'black' }} />,
};

const SettingsStack = createStackNavigator({
  Search: withHeader({ title: 'Search' })(MockedScreen),
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: () => <FontAwesome5 name="comment-alt" style={{ fontSize: 20, color: 'black' }} />,
};

const SettingsStack2 = createStackNavigator({
  Profile: withHeader({ title: 'Profile' })(MockedScreen),
});

SettingsStack2.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <FontAwesome5 name="user" style={{ fontSize: 20, color: focused ? 'black' : 'red' }} />
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
    tabBarComponent: TabBarComponent,
  },
);

export default createAppContainer(Navigation);
