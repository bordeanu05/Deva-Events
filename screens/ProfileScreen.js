import React, { useState, useEffect, createContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../FirebaseConfig";
import UserProfileScreen from "./UserProfileScreen";
import OrganizerProfileScreen from "./OrganizerProfileScreen";

export const AuthContext = createContext();

export default function ProfileScreen() {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [logged, setLogged] = useState(false);
    
    const [organizer, setOrganizer] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        setIsLoading(true);
        
        await FIREBASE_AUTH.signInWithEmailAndPassword(email, password)
        .catch(error => {
            alert(error.message);
        });

        setIsLoading(false);
    }

    const handleLogout = async () => {
        setIsLoading(true);
        await FIREBASE_AUTH.signOut();
        setIsLoading(false);
    }

    const checkIfLoggedIn = () => {
        FIREBASE_AUTH.onAuthStateChanged((user) => {
            if (user) {
                const userDoc = FIREBASE_FIRESTORE
                    .collection("users")
                    .doc(user.uid)
                    .get();
                userDoc.then((doc) => {
                    if (doc.exists) {
                        setOrganizer(doc.data().organizer);
                    }
                });
                setLogged(true);
            } else {
                setLogged(false);
            }
        });
    }

   useEffect(() => {
     checkIfLoggedIn();
   }, []);

   return (
    <AuthContext.Provider value={{ handleLogout }}>
        { logged ? 
            (
                organizer ? (<OrganizerProfileScreen />) : (<UserProfileScreen />)
            ) 

            :

            (   
                <KeyboardAvoidingView 
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <Image style={{height: "25%", width: "40%", marginBottom: 30,}} source={require("../assets/logo.png")}/>

                    <View style={styles.inputContainer}>
                        <View>
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={styles.input}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder="Parola"
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            onPress={handleLogin}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Logare</Text>
                        </TouchableOpacity>


                        <TouchableOpacity 
                            onPress={() => {navigation.navigate("Register")}}
                            style={{marginTop: 15}}
                        >
                            <Text style={styles.signUpText}>Creeaza un cont nou</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => {navigation.navigate("Forgot")}}
                            style={{marginTop: 10}}
                        >
                            <Text style={styles.forgotText}>Ai uitat parola?</Text>
                        </TouchableOpacity>
                        
                    </View>

                </KeyboardAvoidingView>
            )
        }
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
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
    },
    buttonText:{
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutline:{
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonOutLineText:{
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
    signUpText: {
        color: "#EDC71C",
        fontWeight: "bold",
        fontSize: 16,
        shadowColor: "black",
    },
    forgotText: {
        color: "#D93D3F",
        fontWeight: "300",
        fontSize: 16,
    },
});