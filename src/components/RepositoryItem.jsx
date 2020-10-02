import React from 'react';
import { /* Text, */ View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as Linking from 'expo-linking';

export const styles = StyleSheet.create({
    flexContainerStats: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: "center",
      paddingLeft: 20,
      
    },
    flexItemStats: {
        flexGrow: 1,
    },

    flexContainerLogoAndBasics: { //tämän sisällä kuva (item 1) ja perustietonippu (item2) rinnakkain
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: 20,
        paddingRight: 50,
        paddingTop: 30,
        //backgroundColor: theme.colors.primary,
    },

    flexItemLogo: {
        width: 50,
        height: 50,
    },

    flexContainerBasics: { //tämän sisällä perustiedot eli nimi, kuvaus JA KIELI allekkain
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 20
    },

    flexText: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 5,
        //backgroundColor: theme.colors.primary,
        width: 300,
        
    },
    flexBoxContainer: { //flex container
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 5,
    
    },
    flexBox: { //flex item
        flexGrow: 0,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: theme.colors.primary,
        padding: 5,
        backgroundColor: theme.colors.primary,

    },
    formButton: {
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 4,
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
        margin: 10,

    },
    roundContainer: { 
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 0.10,
        borderColor: theme.colors.primary,
        paddingTop: 15,
        width: 50,
        height: 50,
        borderRadius: 50/2

    },
    reviewsContainer: {
        display: 'flex',
        //backgroundColor: "#b7d7e82",
        margin: 10,
    },

    buttonsSideBySide: { 
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: 10
        //backgroundColor: theme.colors.primary,
    },
  });

const RepositoryItem = ({ item, pressed }) => {


    //console.log(pressed)
    const getCount = (count) => {
        if (count>=1000) {
            const number = count/1000;
            return `${number.toFixed(1)}k`;
        }
        return count;
    };
    const stargazersCount = getCount(item.stargazersCount);
    const forks = getCount(item.forksCount);
    const reviews = getCount(item.reviewCount);
    const ratings = getCount(item.ratingAverage);
    //console.log(getCount(item.forksCount));

    return (
        
         <View >
             
            <View style={styles.flexContainerLogoAndBasics}> 
                
                <Image style={styles.flexItemLogo} source={{ uri:item.ownerAvatarUrl }}/>
                
                <View style={styles.flexContainerBasics}>
                    <Text testID='name' style={styles.flexText} fontWeight="bold" fontSize="subheading">{item.fullName} </Text>
                    <Text testID='description' style={styles.flexText} fontSize="subheading">{item.description} </Text>
                    <View style={styles.flexBoxContainer}>
                        <Text testID='language' style= {styles.flexBox} color="textInTextBox" fontWeight="bold">{item.language}
                    </Text>
                </View>
                </View>
                
            </View>
            
            <View style={styles.flexContainerStats}>
                <View style={styles.flexItemStats}>
                <Text testID='starsCount' fontWeight="bold" fontSize="subheading">{stargazersCount}</Text>
                    <Text fontSize="subheading" testID='stars'>Stars</Text>
                </View>

                <View style={styles.flexItemStats}>
                    <Text testID='forks' fontWeight="bold" fontSize="subheading">{forks}</Text>
                    <Text fontSize="subheading">Forks</Text>
                </View>

                <View style={styles.flexItemStats}>
                    <Text testID='reviews' fontWeight="bold" fontSize="subheading">{reviews}</Text>
                    <Text fontSize="subheading">Reviews</Text>
                </View>

                <View style={styles.flexItemStats}>
                    <Text testID='ratings' fontWeight="bold" fontSize="subheading">{ratings}</Text>
                    <Text fontSize="subheading">Rating</Text>
                </View>
            </View>
            {pressed === true
            ? <View style={styles.formButton}>
                <TouchableWithoutFeedback onPress={()=> {
                    console.log('pressed');
                    Linking.openURL(item.url);
                    }} >
                    <Text color="textInTextBox" fontWeight="bold">Open in GitHub</Text>
                </TouchableWithoutFeedback>
                </View>
            : null
            }
        </View>

  );
};

export default RepositoryItem;