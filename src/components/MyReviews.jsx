import React, { useState, useEffect } from 'react';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import { ReviewItem } from './RenderRepositoryItem';
import { ItemSeparator } from './RepositoryList';
import { FlatList, View } from 'react-native';
import { styles } from './RepositoryItem';
import { useQuery } from '@apollo/react-hooks';
import Text from './Text';
//import theme from '../theme';

const MyReviews = () => {
    const { data, error/* , loading */, refetch } = useQuery(GET_AUTHORIZED_USER, {
        variables: {includeReviews: Boolean(true)}
    });
    const [reviews, setReviews] = useState();

    useEffect(() => {
        if (data) {
          console.log('My reviews: ', data.authorizedUser.reviews)
          setReviews(data.authorizedUser.reviews);
          
          //console.log('Data haettu AppBarissa: ', data.authorizedUser);
        }
        else if (error) {
          console.log(error.message);
        } else {
          //console.log('Dataa ei ole haettu AppBarissa.');
        }
    }, [data]); 


    if (!reviews) {
        return (
            <Text fontWeight='bold' color='primary' fontSize="subheading">Loading reviews.</Text>
        );
    }
    return (

        <View style={styles.reviewsContainer}>
        <FlatList 
          data={reviews.edges}
          renderItem={({ item }) => <ReviewItem review={item} myReview={true} refetch={refetch}/>}
          keyExtractor={( item ) => item.node.id} 
          ItemSeparatorComponent={ItemSeparator}
          /* onEndReached={onEndReach}
          onEndReachedThreshold={0.5} */
          /* ListHeaderComponent={() => <Text fontWeight='bold' color='primary' fontSize="subheading">Your reviews:</Text>} */
        />
        
    </View>

    );
};

export default MyReviews;

