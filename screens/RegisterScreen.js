import {
    StyleSheet,
    Modal,
    View,
    Text,
    TouchableOpacity,
    Button,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    TextInput,
  } from "react-native";
  import { useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";

  import { FIREBASE_AUTH } from "../FirebaseConfig";
  import { FIREBASE_FIRESTORE } from "../FirebaseConfig";
  
  export default function RegisterScreen() {
    const navigation = useNavigation();
  
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFName] = useState("");
    const [lastname, setLName] = useState("");
    
    let organizer = false;

    const handleSignUp = async () => {
        setIsLoading(true);
        if (firstname.length === 0) {
            alert("Introudceti prenumele");
            return;
        }
        if (lastname.length === 0) {
            alert("Introudceti numele");
            return;
        }
        if (email.length === 0) {
            alert("Introduceti email-ul");
            return;
        }
        if (password.length === 0) {
            alert("Introduceti parola");
            return;
        }

        let signUpError = false;

        await FIREBASE_AUTH
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            alert(error.message);
            signUpError = true;
        })
        .then(async () => {
            await FIREBASE_FIRESTORE
            .collection("users")
            .doc(FIREBASE_AUTH.currentUser.uid)
            .set({
                userId: FIREBASE_AUTH.currentUser.uid,
                firstname: firstname,
                lastname: lastname,
                email: email,
                organizer: (organizer ? true : false),
                favoriteEvents: [],
                favoriteOfficialEvents: [],
            })
            .catch((error) => {
                alert(error.message);
            });
        })
        .then(async () => {
            if (!signUpError) {
                FIREBASE_AUTH.currentUser
                .sendEmailVerification({
                  handleCodeInApp: true,
                  url: "https://devaevents-a3f03.firebaseapp.com",
                })
                .then(() => {
                  alert("A fost trimis un email de verificare la adresa " + email + ".");
                });
                
                await FIREBASE_AUTH.signOut();
                navigation.pop(1);
            }
        });

        setIsLoading(false);
    };

    const handleSignUpOrganizer = async () => {
        organizer = true;
        handleSignUp();
    }

    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ position: "absolute", flex: 1, justifyContent: "center", alignItems: "center" }}>
            {isLoading && <ActivityIndicator size={"large"} color={"#999999"} />}
        </View>

        <Text style={styles.headerText}>
          Introduceti datele
        </Text>
  
        <View
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Prenume"
            value={firstname}
            onChangeText={(text) => setFName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nume"
            value={lastname}
            onChangeText={(text) => setLName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Parola"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <Text style={styles.headerText}>
            Inregistreaza-te ca si
        </Text>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUpOrganizer}>
            <Text style={styles.buttonText}>Organizator</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Participant</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 35,
        marginBottom: 35,
        fontWeight: "400",
    },
    inputContainer: {
        width: "80%",
        marginBottom: 30,
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: "column",
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
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
  });