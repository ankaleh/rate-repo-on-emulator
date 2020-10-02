import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    invalidField: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: theme.colors.error,
        padding: 10,
        margin: 10,
    },
});

const TextInput = ({ style, error, ...props }) => {
  //const textInputStyle = [style];
  const textInputStyle = [style, error && styles.invalidField];


  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;