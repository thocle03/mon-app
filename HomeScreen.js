import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, Image } from 'react-native';
import SearchScreen from './SearchSreen';

import { Button } from '@rneui/themed';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zfoxpvufbkikcipthsup.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3hwdnVmYmtpa2NpcHRoc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODYxNDgsImV4cCI6MjAyMjQ2MjE0OH0.3-wtnTfPxRlf86E9hP86U2wymr4gHLtpxEsTgo1q18k "
const supabase = createClient(supabaseUrl, supabaseKey)




function HomeScreen({ navigation, isAdm, userConnect }) {
    // const [isModalVisible, setIsModalVisible] = useState(false);

    const [postes, setPostes] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(isAdm);

    useEffect(() => {
        getPostes();
        getUsers();
    }, []);

    async function getPostes() {
        const { data } = await supabase.from("posts").select();
        setPostes(data);
    }
    async function getUsers() {
        const { data } = await supabase.from('users').select();
        setUsers(data);
    }
    

    return (
        <View style={styles.container}>
            <Text>Bienvenue : {userConnect}</Text>

            <Image
                style={styles.tinyLogo}
                source={require('./logo.webp')}
            />
            <StatusBar style="auto" />
            {/* <Button style={{margin: 10}} onPress={() => setIsModalVisible(true)} title="ouvrir le formulaire"></Button> */}
            <Button style={{ margin: 10 }} onPress={() => navigation.navigate('Book Post')} title="See the book posts" />
            <Button style={{ margin: 10 }} onPress={() => navigation.navigate('New Book Post')} title="Create a new post" />
            <Button style={{ margin: 10 }} onPress={() => navigation.navigate('Search post')} title="Search post" />
            <Button style={{ margin: 10 }} onPress={() => navigation.navigate('Login')} title="Login" />
            {isAdm == 1 ? <Button style={{ margin: 10 }} onPress={() => navigation.navigate('Users')} title="Users" />
            : null}
            
            {/* <Modal visible={isModalVisible}>
                <ActivityIndicator />
                <TouchableOpacity onPress={() => setIsModalVisible(false)}><Text style={styles.red}>Fermer la modale</Text></TouchableOpacity>
            </Modal>
            <Thomas firstname="Jacques" />
            <View style={styles.super}>
                <View style={{ width: 50, height: 50, backgroundColor: "skyblue" }} />
                <View style={{ width: 50, height: 50, backgroundColor: "blue" }} />
                <View style={{ width: 50, height: 50, backgroundColor: "skyblue" }} />
                <View style={{ width: 50, height: 50, backgroundColor: "blue" }} />
            </View> */}



            {/* <View style={styles.container}>

                <ScrollView>
                    {postes.map((post, index) => (
                        <View key={index}>
                            {post.rate == 8 ?
                                <Post title={post.title} content={post.content} publisher={post.publisher} url_image={post.url_image} rate={post.rate} />
                                : <Text> </Text>}
                        </View>
                    ))}
                </ScrollView>
                
            </View> */}
        </View>


    );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,

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
    tinyLogo: {
        width: 275,
        height: 150,
    },

});
