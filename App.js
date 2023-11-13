import * as React from 'react';
import { BottomNavigation, Text, Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Category from './components/Categories';
import HomePage from './components/HomePage';
import { Platform } from 'react-native';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const HomePageComponents = () => <HomePage />;
{/* <Text style={{ fontSize: 24, color: 'blue',textAlign:'center',marginTop:300 }} >HomeScreen</Text>; */}

const CategoryComponents  = () => <Category />;
{/* <Text style={{ fontSize: 24, color: 'red',textAlign:'center',marginTop:300  }} >Category</Text>;  */}

const FavoriteComponents = () => <Text style={{ fontSize: 24, color: 'pink',textAlign:'center',marginTop:300  }} >Favourites</Text>;

const NotificationsRoute = () => <Text style={{ fontSize: 24, color: 'green',textAlign:'center',marginTop:300  }} >Notifications</Text>;

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'category', title: 'Category', focusedIcon: 'album' },
    { key: 'favorite', title: 'Favorites', focusedIcon: 'heart' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomePageComponents ,
    category: CategoryComponents,
    favorite: FavoriteComponents,
    notifications: NotificationsRoute,
  });

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <SafeAreaProvider>
      <>
        <Appbar.Header>
          <Appbar.Content title="iraqpad" />
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>

        {/* <Text>hiii react</Text> */}
        <BottomNavigation
       
         navigationState={{ index, routes }}
         
          onIndexChange={handleIndexChange}
          renderScene={renderScene}
        />
        {/* </SafeAreaView> */}
      </>
    </SafeAreaProvider>
  );
};

export default App;