import React from 'react';
import { useHistory } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import { TouchableOpacity, View } from 'react-native';

const CustomTouchableOpacity = ({item}) => {

    let history = useHistory();

    const onPress = () => {
    history.push(`/${item.id}`);
    };
    
    return (
        <View>
        <TouchableOpacity onPress={onPress}><RepositoryItem item={item} testID="repositoryItem"/></TouchableOpacity>
        </View>
    );
};

export default CustomTouchableOpacity;