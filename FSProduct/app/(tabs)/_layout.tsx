import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { router } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { logoutUser, current, authenticated } = useAuth();

  useEffect(() => {
    if (current === null && !authenticated) {
      router.replace("/login");
    }
  }, [current]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="product"
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="handbag" size={25} color={color} />
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Link href="/cart" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <AntDesign
                      name="shoppingcart"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Pressable
                onPress={() => {
                  logoutUser();
                  router.replace("/");
                }}
              >
                {({ pressed }) => (
                  <AntDesign
                    name="logout"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="truck" size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
