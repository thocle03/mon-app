import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import User from './User';
import { ScrollView } from 'react-native';
import { Button } from 'react-native';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zfoxpvufbkikcipthsup.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3hwdnVmYmtpa2NpcHRoc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODYxNDgsImV4cCI6MjAyMjQ2MjE0OH0.3-wtnTfPxRlf86E9hP86U2wymr4gHLtpxEsTgo1q18k "
const supabase = createClient(supabaseUrl, supabaseKey)


function UsersScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const { data } = await supabase.from("users").select();
        setUsers(data);
    }


    async function handleDelete(userId) {
        const { error } = await supabase.from('users').delete().eq('id', userId);
        if (error) {
            console.error('Error cant delete user:', error.message);
            return;
        }
        getUsers();
    }

    function handleUpdate(userId) {

        navigation.navigate('Update your user', { userId: userId });
    }


    function sortByRecent() {
        const sortedUsers = [...users].sort((a, b) => b.id - a.id);
        setUsers(sortedUsers);
    }

    function sortByOldest() {
        const sortedUsers = [...users].sort((a, b) => a.id - b.id);
        setUsers(sortedUsers);
    }
    function refresh() {
        getUsers();
    }

    return (

        <View style={styles.container}>
            <Button color="white" onPress={refresh} title="refresh the screen" />
            <View style={styles.crud}>
                <View style={styles.update}>
                    <Button onPress={sortByRecent} title="Sort by recent" color="white" />
                </View>
                <View style={styles.update}>
                    <Button onPress={sortByOldest} title="Sort by oldest" color="white" />
                </View>



            </View>

            <View style={styles.create}>
                    <Button color="white" margin="20" onPress={() => navigation.navigate('SignUp')} title="Create a new user" />
                </View>
            <ScrollView>
                {users.map((user, index) => (
                    <View key={index}>
                        <User username={user.username} password={user.password} adm={user.adm} />
                        <View style={styles.crud}>
                            <View style={styles.delete}>
                                <Button color="white" onPress={() => handleDelete(user.id)} title="Delete" />
                            </View>
                            <View style={styles.update}>
                                <Button color="white" onPress={() => handleUpdate(user.id)} title="Update" />
                            </View>
                        </View>

                    </View>

                ))}
                
            </ScrollView>
            
        </View>
    );
}

export default UsersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#77B5FE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sort: {
        flex: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 5,
        borderColor: 'black',

    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    crud: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,

    },
    delete: {
        backgroundColor: 'red',
        marginRight: 5,
        borderRadius: 5,
    },
    update: {
        backgroundColor: 'blue',
        marginLeft: 5,
        borderRadius: 5,
    },
    create: {
        backgroundColor: 'blue',
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 5,
    }
});
