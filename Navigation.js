import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home'
import Settings from './src/components/Settings'
import Register from './src/components/Register';
import Login from './src/components/Login';
import Barrio from './src/components/Barrio';
import Ruta from './src/components/Ruta';
import ListRutas from './src/components/auxiliares/ListRutas';
import EditarRutas from './src/components/auxiliares/EditarRutas';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName='LoginScreen'
        >
            <HomeStackNavigator.Screen name="HomeScreen" component={MyTabs} options={{ headerShown: false }}/>
            <HomeStackNavigator.Screen name="LoginScreen" component={Login} />
            <HomeStackNavigator.Screen name="SettingsScreen" component={Settings} />
            <HomeStackNavigator.Screen name="RegisterScreen" component={Register} />
            <HomeStackNavigator.Screen name="BarrioScreen" component={Barrio} />
            <HomeStackNavigator.Screen name="RutaScreen" component={Ruta} />
            <HomeStackNavigator.Screen name="ListRutas" component={ListRutas} />
            <HomeStackNavigator.Screen name="EditarRutas" component={EditarRutas} />
            
        </HomeStackNavigator.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
            tabBarActiveTintColor: '#e91e63',
        }}
    >
      <Tab.Screen 
      name="Home" 
      // component={MyStack}
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
        // tabBarBadge: 3,
        headerShown: false    
      }}
      />
      <Tab.Screen 
      name="Settings" 
      component={Settings}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
            <Fontisto name="player-settings" size={24} color={color} />
            ),
      }}
      />
      <Tab.Screen 
      name="Barrio" 
      component={Barrio}
      options={{
        tabBarLabel: 'Barrio',
        tabBarIcon: ({ color, size }) => (
            <Entypo name="login" size={24} color={color} />
            ),
      }}
      />

      <Tab.Screen 
      name='Ruta'
      component={Ruta}
      options={{
        tabBarLabel: 'Ruta',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="route" size={24} color="black" />
            ),
      }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack/>
      {/* <MyTabs /> */}
    </NavigationContainer>
  );
}