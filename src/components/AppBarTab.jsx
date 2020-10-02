import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingRight: Constants.statusBarHeight,
    //paddingBottom: Constants.statusBarHeight,
  },
  
});

const AppBarTab = ({ text, to }) => {

    return (

        <View style={styles.container}>
            
            <Link to={to} component={TouchableWithoutFeedback}>
            
                <Text fontWeight='bold' color='primary' fontSize="subheading" >
                    {text}
                </Text>
            
            </Link>
        </View>
    );   
};

export default AppBarTab;

