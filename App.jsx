import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screen/HomeScreen';
import LinearGradient from 'react-native-linear-gradient';
import MyStackNavigation from './src/navigation/MyStackNavigation';
import CollectionScreen from './src/screen/CollectionScreen';
import CollectionStackNavigation from './src/navigation/CollectionStackNavigation';
import SearchScreen from './src/screen/SearchScreen';
import SearchStack from './src/navigation/SearchStack';
import LikeScreen from './src/screen/LikeScreen';
import LikeStack from './src/navigation/LikeStack';
import LoginScreen from './src/screen/LoginScreen';
import ProfileStack from './src/navigation/ProfileStack';
import Loading from './src/components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from './src/utils/constData';

const Tab = createBottomTabNavigator();



const App = () => {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("wallhubToken");
        const verifyToken = await axios.get(`${baseUrl}/api/wallpapers/verify`,
          {
            headers:{
              'x-access-token':token,
            }
          }
        );
        console.log("verify Token" , verifyToken);
        if (verifyToken.status === 200) {
          setIsLogin(false);
          setToken(token);
        } else {
          new Error("Token Unverified");
        }
        console.log("Token ", token);
        setToken(token);
      }
      catch (error) {
        console.log("error", error);
        setIsLogin(true);
        setToken(null);
      }
      finally {
        setLoading(false);
        console.log("Hello");
      }
    }
    getToken();
  }, []);

  return (
    <>
      {
        loading ? <Loading /> :
          (
            token === null ?
              // Show Login Conatainer Only

              <NavigationContainer>
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarBackground: () => {
                      return <LinearGradient colors={['#3B3599', '#8C69FF']}
                        style={{
                          flex: 1,
                        }}
                      />
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: '#CCCCCC'
                  }}
                >
                  <Tab.Screen name='LOGIN_SCREEN' component={LoginScreen}
                    options={{
                      tabBarIcon: ({ color, focused, size }) => {
                        return <AntDesign name={"adduser"} size={focused ? 30 : 25} color={color} />
                      }
                    }}
                  />
                </Tab.Navigator>
              </NavigationContainer>
              :
              <NavigationContainer>
                <Tab.Navigator
                  screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                      height: 60,
                      position: "absolute",
                      marginBottom: 35,
                      marginLeft: 20,
                      marginRight: 20,
                      borderRadius: 30,
                    },
                    tabBarBackground: () => {
                      return <LinearGradient colors={['#3B3599', '#8C69FF']}
                        style={{
                          flex: 1,
                          borderRadius: 30,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      />
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: '#CCCCCC'
                  }}>
                  <Tab.Screen name='HOME_STACK' component={MyStackNavigation}
                    options={{
                      tabBarIcon: ({ color, focused, size }) => {
                        return <AntDesign name={"home"} size={focused ? 30 : 25} color={color} />
                      }
                    }}
                  />
                  <Tab.Screen name='COLLECTION_STACK' component={CollectionStackNavigation}
                    options={{
                      tabBarIcon: ({ color, focused, size }) => {
                        return <FontAwesome name={"th-large"} size={focused ? 30 : 25} color={color} />
                      }
                    }}
                  />
                  <Tab.Screen name='SEARCH_STACK' component={SearchStack}
                    options={{
                      tabBarIcon: ({ color, focused, size }) => {
                        return <AntDesign name={"search1"} size={focused ? 30 : 25} color={color} />
                      }
                    }}
                  />
                  <Tab.Screen name='LIKE_STACK' component={LikeStack}
                    options={{
                      tabBarIcon: ({ color, focused, size }) => {
                        return <AntDesign name={"hearto"} size={focused ? 30 : 25} color={color} />
                      }
                    }}
                  />
                  {!token ? <Tab.Screen name='LOGIN_SCREEN' component={LoginScreen}
                    options={{
                      tabBarIcon: ({ color, focused, size }) => {
                        return <AntDesign name={"adduser"} size={focused ? 30 : 25} color={color} />
                      }
                    }}
                  />
                    :
                    <Tab.Screen name='PROFILE_STACK' component={ProfileStack}
                      options={{
                        tabBarIcon: ({ color, focused, size }) => {
                          return <AntDesign name={"user"} size={focused ? 30 : 25} color={color} />
                        }
                      }}
                    />
                  }
                </Tab.Navigator>
              </NavigationContainer>
          )
      }
    </>
  )
}

export default App

const styles = StyleSheet.create({})