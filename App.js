import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';

import { View } from 'react-native';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
//import { gql } from 'apollo-boost';

const authStorage = new AuthStorage();
export const apolloClient = createApolloClient(authStorage);
//const apolloClient = createApolloClient();

/* const query = gql`
query {
	authorizedUser {
	  id
	  username
	}
  }

`;
apolloClient.query({query})
.then((response)=> {
  console.log(response.data);
}); */
const App = () => {

  //console.log('Constants.manifest: ', Constants.manifest);
  
  return (
    <View>
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
  
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
        
      </ApolloProvider>
    </NativeRouter>
    </View>
  );
};

export default App;