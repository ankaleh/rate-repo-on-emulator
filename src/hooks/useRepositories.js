import { useLazyQuery } from '@apollo/react-hooks';

import { useState, useEffect } from 'react';
import { GET_ALL_REPOSITORIES, GET_ALL_REPOSITORIES_ORDER_BY_ORDER_DIRECTION, GET_ALL_REPOSITORIES_SEARCH_KEYWORD } from '../graphql/queries';

const useRepositories = (selectedOrder, selectedOrderDirection, keyword) => {

//console.log('selectedOrder: ', selectedOrder, 'selectedOrderDirection: ', selectedOrderDirection)

const [getRepositories, resultRepositories] = useLazyQuery(GET_ALL_REPOSITORIES);
const [getRepositoriesOrderByOrderDirection, resultRepositoriesOrderByOrderDirection] = useLazyQuery(GET_ALL_REPOSITORIES_ORDER_BY_ORDER_DIRECTION);
const [getRepositoriesSearchKeyword, resultRepositoriesSearchKeyword] = useLazyQuery(GET_ALL_REPOSITORIES_SEARCH_KEYWORD);


const [repositories, setRepositories] = useState();
/* const { data, error, loading } = useQuery(GET_ALL_REPOSITORIES, 
    { variables: {orderBy, orderDirection} });   */

useEffect(() => {
  if (selectedOrderDirection==="DESC" || selectedOrderDirection==="ASC") {
    //console.log('Tehdään kysely getRepositoriesOrderByOrderDirection.')
    getRepositoriesOrderByOrderDirection({ variables: {orderBy: selectedOrder, orderDirection: selectedOrderDirection, searchKeyword: keyword} });
  } else {
    //console.log('Tehdään kysely getRepositories.')
    getRepositories({ variables: { orderBy: selectedOrder, searchKeyword: keyword } });
  }

}, [selectedOrderDirection]);  


  useEffect(() => {
    if (resultRepositories.data) {
      setRepositories(resultRepositories.data.repositories);
    }
   else {
     //console.log('Ei asetettu mitään!')
   }
    
  }, [resultRepositories]);  

  useEffect(() => {
    
    if (resultRepositoriesOrderByOrderDirection.data) {
      setRepositories(resultRepositoriesOrderByOrderDirection.data.repositories);
    }
   else {
     //console.log('Ei asetettu mitään!')
   }
    
  }, [resultRepositoriesOrderByOrderDirection]);  
  
  useEffect(() => {
    getRepositoriesSearchKeyword({ variables: { searchKeyword: keyword } });
    
  }, [keyword]);  

  useEffect(() => {
    if (resultRepositoriesSearchKeyword.data) {
      setRepositories(resultRepositoriesSearchKeyword.data.repositories);
    }
   else {
     //console.log('Ei asetettu mitään!')
   }
    
  }, [resultRepositoriesSearchKeyword]);  
  /* useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
    //console.log('Repositoriot: ', data);
    
  }, [data]);  */

  /* if (loading) {
    console.log('Loading: ', loading)
    
  } */
  
  return { repositories/* , loading *//* , refetch: fetchRepositories */ };

};
export default useRepositories;