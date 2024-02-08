import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdatePostScreen from './UpdatePostScreen';
import NewPostScreen from './NewPostScreen';
import { createClient } from '@supabase/supabase-js';
import HomeScreen from './HomeScreen';
import ScrollViewScreen from './ScrollViewScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="New Book Post" component={NewPostScreen} />
        <Stack.Screen name="Book Post" component={ScrollViewScreen} />
        <Stack.Screen name="Update your post" component={UpdatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

