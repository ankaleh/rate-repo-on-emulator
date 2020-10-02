import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { /* useState, useEffect, */ useContext } from 'react';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';


const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);

    const apolloClient = useApolloClient();

    const [ authorize, result ] = useMutation(AUTHORIZE); //tämä mutaatio palauttaa mm. tokenin
    
    const signIn = async ({ username, password }) => {
        const result = await authorize({ variables: {
            credentials: {
              username,
              password,
            }
          }
            
        });
        //console.log('useSignInissä result.data.authorize.accessToken: ', result.data.authorize.accessToken)
        authStorage.setAccessToken(result.data.authorize.accessToken);//token localStorageen talteen
        //console.log('ApolloClient: ', apolloClient)
        apolloClient.resetStore(); 
        //console.log('ApolloClient storen resetoimisen jälkeen: ', apolloClient)

        return result;
    };
    
    //console.log('useMutation-hookin result: ', result) //resultissa mm. loading, data (olio, jolla kenttä authorize, 
    //jonka arvona olio, jolla kenttä accessToken) ja error
    
    return [signIn, result];

};
export default useSignIn;