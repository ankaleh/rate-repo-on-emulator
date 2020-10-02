import ApolloClient from 'apollo-boost';

const createApolloClient = (authStorage) => {//luodaan palvelimen kanssa kommunikoiva client, 
//jonka pyyntöihin lisätään token: token saadaan parametrina tulevalta authStoragelta
                                              
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        //console.log('token: ', accessToken);
        //console.log(`Bearer ${accessToken}`);
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });

        //console.log(operation.query)
        
      } catch (e) {
        console.log(e);
      }
    },
    uri: 'http://192.168.0.2:5000/graphql'
  });
};

export default createApolloClient;