import React, { useState } from 'react';
import { FlatList, View, TextInput as NativeTextInput } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import CustomTouchableOpacity from './CustomTouchableOpacity';
import RNPickerSelect from 'react-native-picker-select';
import { useDebounce } from 'use-debounce';
import { styles } from './SignIn';
//import RepositoryItem from './RepositoryItem';


export const ItemSeparator = () => <View style={styles.separator} />;

export const renderRepository = ({item }) => {
  
  return (
        <CustomTouchableOpacity item={item} />
        /* <RepositoryItem item={item} testID="repositoryItem"/> */
  );
    
};

export const RepositoryListContainer = ({ repositories }) => {
  
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderRepository}
      keyExtractor={item => item.id}
      testID="flatList"
      
    />
  );
};



/* const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('CREATED_AT');
  const [selectedOrderDirection, setSelectedOrderDirection] = useState('')
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 2000);
  const { repositories } = useRepositories(selectedOrder, selectedOrderDirection);

 
const onValueChange = (value) => {
  
    console.log('Value: ', value)
    if (value==='ASC' || value==='DESC') {
      setSelectedOrder('RATING_AVERAGE')
      setSelectedOrderDirection(value)
    } else {
      setSelectedOrder('CREATED_AT')
      setSelectedOrderDirection(value)
    }
    
}
  
  return (
    <View>

    <RepositoryListContainer repositories={repositories} />
    </View>
    )
};

export default RepositoryList; */


const RepositoryList = () => {
  
  const [selectedOrder, setSelectedOrder] = useState('CREATED_AT');
  const [selectedOrderDirection, setSelectedOrderDirection] = useState('');
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 2000);
  const { repositories } = useRepositories(selectedOrder, selectedOrderDirection, value);
  
  const onValueChange = (value) => {
    //console.log('Value: ', value)
    if (value==='ASC' || value==='DESC') {
      setSelectedOrder('RATING_AVERAGE');
      setSelectedOrderDirection(value);
    } else {
      setSelectedOrder('CREATED_AT');
      setSelectedOrderDirection(value);
    }
  };
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []; 

  return (
    <View>
      
    <FlatList
      data={repositoryNodes} 
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderRepository}
      keyExtractor={item => item.id}
      onEndReached={() => console.log('Listan lopussa!')}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<View><NativeTextInput style={styles.formField}
        defaultValue={'Find'}
        onChange={(e) => {
          //console.log('e.target.value', e.nativeEvent.text) //e.target.value toimii vain seilaimessa
          setText(e.nativeEvent.text);
        }}
      />
      <RNPickerSelect
        onValueChange={onValueChange}
        placeholder={{ label: 'Latest repositories', value: ''}}
        items={[
          { label: 'Highest rated repositories', value: 'DESC' },
          { label: 'Lowest rated repositories', value: 'ASC'},
        ]}
      
      />
      </View>}
    />
  </View>
  );
};

export default RepositoryList;