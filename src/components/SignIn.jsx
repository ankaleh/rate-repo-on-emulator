import React from 'react';

import { View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
//import TextInput from './TextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';


export const styles = StyleSheet.create({
    form: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        padding: 10,
    }, 
    formField: {
        borderRadius: 4,
        borderWidth: 0.5,
        padding: 10,
        margin: 10,
    },
    formButton: {
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 4,
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: theme.colors.primary,
        margin: 10,
    },
    separator: {
        height: 10,
      },
    
  });

const SignInForm = ( {onSubmit} ) => {
    /* const [field1, meta1, helpers1] = useField("username");
    const [field2, meta2, helpers2] = useField("password");
    const showError = meta1.touched && meta1.error; */

  return (
    <View style={styles.form}>
        <View >
            <FormikTextInput style={styles.formField} name="username" placeholder="Username" />
            {/* <TextInput
            placeholder="Username"
            value={field1.value}
            onChangeText={text => helpers1.setValue(text)}
            /> */}
        </View>
        <View >
            <FormikTextInput secureTextEntry style={styles.formField} name="password" placeholder="Password"/>
            {/* <TextInput
            placeholder="Password"
            value={field2.value}
            onChangeText={text => helpers2.setValue(text)}
            /> */}
        </View>
        <View style={styles.formButton}>
            <TouchableWithoutFeedback onPress={onSubmit} >
                <Text color="textInTextBox" fontWeight="bold">Sign in</Text>
            </TouchableWithoutFeedback>
        </View>
    </View>
  );
        
};

const SignIn = () => {

    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;

        console.log('Tekstikenttiin kirjoitettiin: ', username, password); //values on olio, jolla kentät username ja password
        
        try {
            /* const { data } = */ await signIn({ username, password }); // kirjaudutaan
            //data on siis olio, jolla kenttä authorize, 
            //jonka arvona olio, jolla kenttä accessToken
            //console.log('SignIn-funktiokutsun palauttama data: ', data);

        } catch (e) {
            console.log(e);
        }
        history.push('/');
        
    };
    
    const validationSchema = yup.object().shape({
        password: yup
            .string()    
            .required('Password is required.'),
        username: yup
            .string()
            .required('Username is required.')
    });
    //Formikin sisällä (lapsena) on funktio, joka saa parametrikseen Formikin funktion, joka puolestaan annetaan 
    //kirjautumislomakkeelle propsina.
    return (
        <View>
            <Formik initialValues={{username: '', password: ''}} 
            onSubmit={onSubmit} validationSchema={validationSchema}
            >
                {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />} 
                
            </Formik>
        </View>
    );

    
  
};

export default SignIn;