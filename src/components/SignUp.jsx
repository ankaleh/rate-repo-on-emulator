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
import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';

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
    
  });

const SignUpForm = ( {onSubmit} ) => {
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
        <View >
            <FormikTextInput secureTextEntry style={styles.formField} name="passwordConf" placeholder="Password confirmation"/>
            {/* <TextInput
            placeholder="Password"
            value={field2.value}
            onChangeText={text => helpers2.setValue(text)}
            /> */}
        </View>
        <View style={styles.formButton}>
            <TouchableWithoutFeedback onPress={onSubmit} >
                <Text color="textInTextBox" fontWeight="bold">Sign up</Text>
            </TouchableWithoutFeedback>
        </View>
    </View>
  );
        
};

const SignUp = () => {

    const [signIn] = useSignIn();
    const history = useHistory();
    const [createUser /* , result */ ] = useMutation(CREATE_USER);

    const onSubmit = async (values) => {
        const { username, password, passwordConf } = values;
        
        console.log('Tekstikenttiin kirjoitettiin: ', username, password, passwordConf); //values on olio, jolla kentät username ja password
        
        try {
            //rekisteröidytään:
            const result = await createUser({ variables: {
                user: {
                    username,
                    password,
                }
            }});
            //kirjataan käyttäjä sisään:
            await signIn({ username, password }); 

        } catch (e) {
            console.log(e);
        }
        history.push('/');
        
    };
    
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(1).max(30)
            .required('Username is required.'),

        password: yup
            .string()
            .min(5).max(50)
            .required('Password is required.'),
        passwordConf: yup
            .string()
            .oneOf([yup.ref('password'), null])
            .required('Password confirmation is required.'),
    });
    //Formikin sisällä (lapsena) on funktio, joka saa parametrikseen Formikin funktion, joka puolestaan annetaan 
    //kirjautumislomakkeelle propsina.
    return (
        <View>
            <Formik initialValues={{username: '', password: '', passwordConf: ''}} 
            onSubmit={onSubmit} validationSchema={validationSchema}
            >
                {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} />} 
                
            </Formik>
        </View>
    );

    
  
};

export default SignUp;