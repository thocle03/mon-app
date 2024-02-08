import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import { createClient } from '@supabase/supabase-js';
import App from './App';
import {
    List,
    Title,
    IconButton,
    TextInput as PaperTextInput,
} from 'react-native-paper';
const supabaseUrl = 'https://zfoxpvufbkikcipthsup.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3hwdnVmYmtpa2NpcHRoc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODYxNDgsImV4cCI6MjAyMjQ2MjE0OH0.3-wtnTfPxRlf86E9hP86U2wymr4gHLtpxEsTgo1q18k "
const supabase = createClient(supabaseUrl, supabaseKey)

function NewPostScreen({ navigation }) {
    const [url_image, setUrl_image] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [publisher, setPublisher] = useState('');
    const [rate, setRate] = useState('');

    const createBooks = async () => {
        try {
            const { data, error } = await supabase.from('posts').insert([
                {
                    title: title,
                    content: content,
                    url_image: url_image,
                    publisher: publisher,
                    rate: rate,
                },
            ]);
            navigation.goBack();
        } catch (error) {
            console.log('error gros nul', error.message)
        }
    };
    return (
        <View style={styles.create}>
            <Text style={styles.title}>Create a new book post</Text>

            <View>
                <PaperTextInput
                    value={title}
                    onChangeText={setTitle}
                    label="New Book Title"
                    mode="outlined"

                />
                <PaperTextInput

                    value={content}
                    onChangeText={setContent}
                    label="New book Content"
                    mode="outlined"

                />
                <PaperTextInput
                    value={url_image}
                    onChangeText={setUrl_image}
                    label="image"
                    mode="outlined"

                />
                <PaperTextInput
                    value={publisher}
                    onChangeText={setPublisher}
                    label="New book Publisher"
                    mode="outlined"

                />
                <PaperTextInput
                    value={rate}
                    onChangeText={setRate}
                    label="Your Rate"
                    mode="outlined"
                    keyboardType='numeric'

                />
                <Button
                    onPress={createBooks}
                    mode="contained"
                    icon="plus"
                    color={'#208AEC'}
                    style={styles.create_todo_button}>
                    {'Add my book post'}
                </Button>

            </View>



        </View>
    );
};
export default NewPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    super: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 2,
    },
    red: {
        color: "red",
        backgroundColor: "yellow",
        padding: 100,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    create_todo_button: {
        marginTop: 6,

        height: 40,

    },
    create: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },

});
