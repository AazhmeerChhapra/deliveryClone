import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import BasketScreen from './screens/BasketScreen';

import { Provider } from 'react-redux';
import { store } from './store';
import PreparingOrderScreen from './screens/PrepareOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import LoginScreen from './screens/Login';

import SignUpScreen from './screens/SignUp';
import SearchScreen from './screens/searchScreen';






const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator>
        {/* <Stack.Screen name='SignupScreen' component={SignUpScreen}/> */}
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name = "HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen}/>
        <Stack.Screen name = "Restaurant" component={RestaurantScreen}/>
        <Stack.Screen name = "Basket" component={BasketScreen}
        options={{presentation : "modal", headerShown:false}}
        />
        <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} 
        options={{presentation:'fullScreenModal', headerShown:false}}
        />
        <Stack.Screen name="Delivery" component={DeliveryScreen} 
        options={{presentation:'fullScreenModal', headerShown:false}}
        />


      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

