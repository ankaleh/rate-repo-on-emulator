
import React, { useContext } from 'react';
//import Constants from 'expo-constants';
import { /* Text, */ StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Switch } from 'react-router-native';
import SignIn from './SignIn';
import { useApolloClient } from '@apollo/client';
import Text from './Text';
import RenderRepositoryItem from './RenderRepositoryItem';
import Review from './Review';
import SignUp from './SignUp';
//import RNPickerSelect from /* '@react-native-community/picker' */'react-native-picker-select';
import MyReviews from './MyReviews';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    //marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const SignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  //const history = useHistory();
  authStorage.removeAccessToken()
  apolloClient.resetStore();
  //history.push('/')
  return (
    <View>
      <Text fontWeight='bold' color='primary' fontSize="subheading">You have been signed out!</Text>
    </View>
  );
};
 
const Main = () => {

  



  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path="/" exact >
          <RepositoryList  />
        </Route>

        <Route path="/my-reviews">
          <MyReviews/>
        </Route>

        <Route path="/sign-in">
            <SignIn />
        </Route>
        <Route path="/sign-out">
          <SignOut/>
        </Route>
        <Route path="/sign-up">
          <SignUp/>
        </Route>
        <Route path="/create-review">
          <Review/>
        </Route>
        <Route
          path="/:id"
          render={({ match }) => {
            const id=match.params.id; 
        return <RenderRepositoryItem id={id}/>; 
        }}
        />
      </Switch>
    </View>
  );
};

export default Main;