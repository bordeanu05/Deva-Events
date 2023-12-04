import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button,
     TouchableOpacity, Image, KeyboardAvoidingView, TextInput, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function ForgotScreen(){
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleForgot = async () => {
        setIsLoading(true);
        let threwError = false;
        await FIREBASE_AUTH.sendPasswordResetEmail(email).catch((error) => {threwError = true; alert(error.message)});
        if(!threwError){
            alert("A fost trimis mail-ul de recuperare a parolei!");
            setTimeout(() => {
                navigation.pop(1);
            }, 1500);
        }
        setIsLoading(false);
    }

    return (
        <KeyboardAvoidingView style={styles.cotainer}>
            <View style={{ position: "absolute", flex: 1, justifyContent: "center", alignItems: "center" }}>
                {isLoading && <ActivityIndicator size={"large"} color={"#999999"} />}
            </View>
            <Text style={{fontSize: 22, marginBottom: 20, fontWeight: "500"}} >Ti-ai uitat parola?</Text>

            <View style={styles.inputContainer}>
                <View>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={handleForgot}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Trimite link</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
    },

    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button:{
        backgroundColor: "#228B22",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        marginBottom: 10,
    },
    buttonText:{
        color: "white",
        fontWeight: "700",
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,
    },
})