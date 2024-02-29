import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zfoxpvufbkikcipthsup.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3hwdnVmYmtpa2NpcHRoc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODYxNDgsImV4cCI6MjAyMjQ2MjE0OH0.3-wtnTfPxRlf86E9hP86U2wymr4gHLtpxEsTgo1q18k "
const supabase = createClient(supabaseUrl, supabaseKey)



const LoginScreen = ({ navigation , setIsLoggedIn, setIsAdm, setUserConnect }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    
    
    const handleLogin = async () => {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('username', username)
            .eq('password', password)
            .single();

        if (error) {
            console.error(':( Error you cant connect:', error.message);
            return;
        }

        if (data) {
            console.log(':) connect with succed:', data);
            setIsLoggedIn(data.id);
            setIsAdm(data.adm);
            setUserConnect(data.username);
            navigation.navigate('Home');

        } else {
            console.error('incorrect username or password :( ');
        }

    };
    
    

    return (
        <View style={styles.container}>
            <Text>Login Page</Text>
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
            <Button onPress={handleLogin} title="Login" />
            <Button onPress={() => navigation.navigate('SignUp')} title="Sign Up" />
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

export default LoginScreen;
