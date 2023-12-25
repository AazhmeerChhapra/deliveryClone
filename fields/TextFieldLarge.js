import { View } from "react-native";
import { TextInput, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';



const TextFieldLarge = ({ label, isPasswordField, onChangeText, value }) => {
  return (
    <View
      style={{
        alignContent: "center",
        justifyContent: "center",
        marginBottom: 24,
        width:350,
        height: 56,
        borderRadius: 10,
        backgroundColor: "white",
        alignContent: "center",
        shadowColor: "grey",
        shadowOffset: 0.5,
      }}
    >
      <GestureHandlerRootView>
      <GestureDetector>
      <TextInput
        cursorColor={"darkgrey"}
        style={{ marginLeft: 20, fontFamily:'Poppins' }}
        placeholder={label}
        secureTextEntry={isPasswordField ? true : false}
        onChangeText={onChangeText}
        value={value}
      />
      </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export { TextFieldLarge };
