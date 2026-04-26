import React, { useMemo } from "react";
import Text from "@components/uikits/Text";
import { useI18n } from "@i18n";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@screens/HomeScreen";
import SettingsScreen from "@screens/SettingsScreen";
import { useTheme } from "@theme";
import type { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const { colors } = useTheme();
  const { t } = useI18n();

  const screenOptions = useMemo(
    () => ({
      tabBarActiveTintColor: colors.tabBarActive,
      tabBarInactiveTintColor: colors.tabBarInactive,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
      },
      headerStyle: {
        backgroundColor: colors.surface,
      },
      headerTintColor: colors.text,
    }),
    [colors]
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t("tabs.home"),
          title: t("tabs.home"),
          tabBarIcon: (props) => (
            <TabIcon {...props} active="🛖" inactive="🪹" />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t("tabs.settings"),
          title: t("tabs.settings"),
          tabBarIcon: (props) => (
            <TabIcon {...props} active="🛠️" inactive="🔧" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const TabIcon = ({
  focused,
  active,
  inactive,
}: {
  focused: boolean;
  active: string;
  inactive: string;
}) => {
  return <Text>{focused ? active : inactive}</Text>;
};
