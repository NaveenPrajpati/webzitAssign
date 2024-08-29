import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SecondScreen from './screens/SecondScreen';
import FirstScreen from './screens/GreenLivingTips';
import DetailNavigator from './screens/DetailNavigator';
import VectorIcon from './components/VectorIcon';

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DetailNavigator"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <VectorIcon iconName="list" color="black" size={16} />
          ),
          tabBarLabel: 'Tips',
        }}
        component={DetailNavigator}
      />
      <Tab.Screen
        name="SecondScreen"
        options={{
          headerTitle: 'Eco-Friendly Products',
          tabBarIcon: () => (
            <VectorIcon iconName="product-hunt" color="black" size={16} />
          ),
          tabBarLabel: 'Products',
        }}
        component={SecondScreen}
      />
    </Tab.Navigator>
  );
}

export default Routes;
