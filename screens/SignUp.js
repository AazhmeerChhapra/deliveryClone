import React, {useState} from 'react';
import {
 View,
 Text,
 TextInput,
 Button,
 TouchableOpacity,
 StyleSheet,
 ImageBackground,
 Image, ScrollView
} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth , db} from './firebase';
import { addDoc, collection, setDoc, doc} from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';



const SignUpScreen = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [name, setName] = useState('');
 const [mobileNumber, setMobileNumber] = useState('');
 const [location, setLocation] = useState('');
 const navigation = useNavigation();

 const handleSignup = async () => {

  console.log('LOGGED')
  
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user.displayName);
      // Sign Up
      console.log("Succesfull",userCredential);
      const user = userCredential.user;
      console.log("user data,", user);

      setDoc(doc(db, "users", userCredential.user.uid), {
        userid: userCredential.user.uid,
        name: name,
        city: location,
        phonenumber: mobileNumber
      });

      // Save other Values in Real Time Database
      // Save other Values in Firestore DB

      
      // write code to save your data in firestore
      // FirebaseError.firestore.write(user.uid,user.uid)
      // ...


       // ...
      //  AsyncStorage.setItem("myuser", JSON.stringify(user));
       navigation.navigate('LoginScreen');

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error Code == ',errorCode)
      console.log('Error Message == ',errorMessage)
      // ..
    });

};

return (
  <ImageBackground source={require('../assets/background.jpg')} style={styles.image}
  imageStyle={{ opacity: 0.1, backgroundColor: "rgba(0, 255, 0, 1)" }}
  >
  <ScrollView contentContainerStyle={styles.container}>
  <Image source = {require('../assets/logo.png')} style = {{width:200, height: 100, marginBottom:30}}/>
                <ScrollView  contentContainerStyle={{
    backgroundColor: "#00CCBB",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 1
  }}>
                <TextInput
      placeholder="Name"
      value={name}
      onChangeText={(text) => setName(text)}
      style={styles.input}
    />
    <TextInput
      placeholder="Email"
      value={email}
      onChangeText={(text) => setEmail(text)}
      style={styles.input}
    />
    <TextInput
      placeholder="Password"
      value={password}
      onChangeText={(text) => setPassword(text)}
      secureTextEntry
      style={styles.input}
    />
        <TextInput
      placeholder="Phone Number"
      value={mobileNumber}
      onChangeText={(text) => setMobileNumber(text)}
      style={styles.input}
    />
        <TextInput
      placeholder="City"
      value={location}
      onChangeText={(text) => setLocation(text)}
      style={styles.input}
    />
    <TouchableOpacity style={styles.button} onPress={handleSignup}>
      <Text style={styles.buttonText}>Signup</Text>
    </TouchableOpacity>
    </ScrollView>
  </ScrollView>
  </ImageBackground>
);
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignSelf: "center",
      padding: 10,
      justifyContent: 'center',
      alignItems:"center",
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
      marginBottom: 10,
      
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
export default SignUpScreen;