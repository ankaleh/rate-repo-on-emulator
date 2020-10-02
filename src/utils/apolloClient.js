import ApolloClient from 'apollo-boost';
import { API_URL } from "@env"

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
    uri: API_URL
  });
};

export default createApolloClient;