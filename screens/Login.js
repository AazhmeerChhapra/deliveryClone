import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert, Image} from 'react-native';
import { auth } from './firebase';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const login = async () => {
    try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const userid = userCredential.user.uid;
    console.log(userid)
    navigation.navigate('HomeScreen', {userid});
    }
    catch {
      console.error('Login failed:', error.message);
    }
  }
    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.image}
        imageStyle={{ opacity: 0.1, backgroundColor: "rgba(0, 255, 0, 1)" }}
        >
            <View style={styles.container}>
                <Image source = {require('../assets/logo.png')} style = {{width:200, height: 100, marginBottom:30}}/>
                <View style = {{backgroundColor:"#00CCBB", paddingVertical: 20, paddingHorizontal:20, borderRadius: 25, borderColor: "white", borderWidth: 1}}>
                <TextInput 
                placeholder="Email" 
                style={styles.input} 
                value= {email} 
                onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry 
                value={password}
                onChangeText={(text) => setPassword(text)}
                
                />
                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Forget Password')}>
                    <Text style={styles.forgotPassword}>Forget password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= {login}>
                    <Text style={styles.signUp}>Sign up</Text>
                </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        tintColor: 'black'
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        marginBottom: 10
    },
    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        color: 'white'
    },
    button: {
        width: 300,
        height: 44,
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'white',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 18
    },
    forgotPassword: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
        alignSelf : "center"
        
    },
    signUp: {
        color: 'white',
        fontSize: 16,
        alignSelf : "center"
    }
});

export default LoginScreen;