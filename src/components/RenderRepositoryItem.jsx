import React, {useState, useEffect} from 'react';
import RepositoryItem from './RepositoryItem';
import { ItemSeparator } from './RepositoryList';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import Text from './Text';
import { FlatList, View, TouchableWithoutFeedback, Alert } from 'react-native';
//import { format } from 'date-fns';
import { styles } from './RepositoryItem';
import { useHistory } from 'react-router-native';

export const ReviewItem = ({review, myReview, refetch}) => {
    const [deleteReview /* , result */ ] = useMutation(DELETE_REVIEW);
    const history = useHistory();
    //const formattedDate = format(new Date(review.node.createdAt), 'dd.MM.yyyy');
    
    const deleteItem = async () => {
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
            {
              text: "Delete",
              onPress: async () => { 
                    const deleted = await deleteReview({variables: { id: review.node.id }});
        
                    refetch();}
              
            },
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                
            }
            
          ],
          { cancelable: true }
        );
        //console.log('Arvostelun id: ', review.node.id)
        
    };

    return (
        <View>

        <View style={styles.flexContainerLogoAndBasics}>
            <View style={styles.roundContainer}><Text >{review.node.rating}</Text></View>
            <View style={styles.flexContainerBasics} >
                {myReview
                ?<Text fontWeight="bold">{review.node.repository.fullName}</Text>
                :<Text fontWeight="bold">{review.node.user.username}</Text>}
                
                <Text>{review.node.createdAt}</Text>
            
                <View style={styles.flexText}>
                    <Text>{review.node.text}</Text>
                </View>
                
            </View>
            
        </View>

        {myReview
        ? <View style={styles.buttonsSideBySide}>
        <View style={styles.formButton}>
                <TouchableWithoutFeedback onPress={()=> {
                    //console.log('pressed view button')
                    history.push(`/${review.node.repository.id}`);
                    }} >
                    <Text color="textInTextBox" fontWeight="bold">View repository</Text>
                </TouchableWithoutFeedback>
        </View>

        <View style={styles.formButton}>
                <TouchableWithoutFeedback onPress={()=> {deleteItem();}} >
                    <Text color="textInTextBox" fontWeight="bold">Delete review</Text>
                </TouchableWithoutFeedback>
        </View>
        </View>
        : null}
        </View>
    );
};

const RenderRepositoryItem = (id/* , item */) => {
    const {data, /* error, */ loading, fetchMore} = useQuery(GET_REPOSITORY, { 
        fetchPolicy: "cache-and-network",
        variables: {id: id.id/* , after: "WyIxYjEwZTRkOC01N2VlLTRkMDAtODg4Ni1lNGEwNDlkN2ZmOGYuamFyZWRwYWxtZXIuZm9ybWlrIiwxNTg4NjU2NzUwMDgwXQ==" */} });
        console.log(id);
    const [repository, setRepository] = useState(null);
    //const [reviews, setReviews] = useState([])
    /* if (id) {
        käytä useLazyQuerya
    } */
    const handleFetchMore = () => {
        const canFetchMore =
          !loading && data && data.repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
        console.log('data aluksi: ', data);
        fetchMore({
            query: GET_REPOSITORY,
            variables: {
                after: /* "WyIxYjEwZTRkOC01N2VlLTRkMDAtODg4Ni1lNGEwNDlkN2ZmOGYuamFyZWRwYWxtZXIuZm9ybWlrIiwxNTg4NjU2NzUwMDgwXQ==", */data.repository.reviews.pageInfo.endCursor,
                id: id.id
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                //console.log('updateQueryssä: ', fetchMoreResult.repository.reviews) //seuraavat arvostelut
                const nextResult = {
                    ...data,
                    repository: { 
                        ...data.repository,
                        reviews: {
                        ...fetchMoreResult.repository.reviews,
                        edges: [
                            ...previousResult.repository.reviews.edges,
                            ...fetchMoreResult.repository.reviews.edges,
                        ],
                    },
                }
                };
                console.log('nextResult: ', nextResult);//reviews.edges ja reviews.pageinfo
                
                return nextResult;
            },
        });

    };

    const onEndReach = () => {
        console.log('Sivun lopussa!');
        handleFetchMore();
    };
    
    useEffect (()=> {
        if (data) {
          console.log('Data.repository useEffectissä: ', data.repository);
          console.log(data.repository.reviews.pageInfo);
          setRepository(data.repository);
          //setReviews(data.repository.reviews.edges)
        }
        
      }, [data]); 

      if (!repository) {
          return (
          <Text fontWeight='bold' color='primary' fontSize="subheading">Loading repository.</Text>
          );
      }
      //console.log(repository.reviews.edges)//edges on taulukollinen olioita (review),
      //joilla yksi kenttä, node. Noden arvona olio, jolla esim. kentät rating ja text
     
     /* if (item) {
         return <CustomTouchableOpacity item={item} />
     } */

      return (
        <View style={styles.reviewsContainer}>
        <FlatList 
          data={ /* reviews */ data.repository.reviews.edges }
          renderItem={({ item }) => <ReviewItem review={item} myReview={false} />}
          keyExtractor={( item ) => item.node.id} 
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={() => <RepositoryItem item={repository} pressed={true} />}
        />
        </View>
      );
};

export default RenderRepositoryItem;