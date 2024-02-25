import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zfoxpvufbkikcipthsup.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3hwdnVmYmtpa2NpcHRoc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODYxNDgsImV4cCI6MjAyMjQ2MjE0OH0.3-wtnTfPxRlf86E9hP86U2wymr4gHLtpxEsTgo1q18k "
const supabase = createClient(supabaseUrl, supabaseKey)


const CreateAccountScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignUp = async () => {
        // const { data, error } = await supabase.from('users').select().eq('username', username);
        // if (data.length > 0) {
        //     console.error('Ce nom d\'utilisateur est déjà utilisé.');
        //     return;
        // }
        try {
            const { data, error } = await supabase.from('users').insert([
                {
                    username: username,
                    password: password,
                },
            ]);
            navigation.navigate('Login');
        } catch (error) {
            console.log('error gros nul', error.message)
        }
        
    };

    return (
        <View style={styles.container}>
            <Text>Sign Up Page</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button onPress={handleSignUp} title="Sign Up" />
            <Button onPress={() => navigation.goBack()} title="Back" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
});

export default CreateAccountScreen;