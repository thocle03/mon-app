import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import Post from './Card';
import { ScrollView } from 'react-native';
import { Button } from 'react-native';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zfoxpvufbkikcipthsup.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3hwdnVmYmtpa2NpcHRoc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODYxNDgsImV4cCI6MjAyMjQ2MjE0OH0.3-wtnTfPxRlf86E9hP86U2wymr4gHLtpxEsTgo1q18k "
const supabase = createClient(supabaseUrl, supabaseKey)


function ScrollViewScreen({ navigation }) {
    const [postes, setPostes] = useState([]);
    

    useEffect(() => {
        getPostes();
    }, []);

    async function getPostes() {
        const { data } = await supabase.from("posts").select('*');
        setPostes(data);
    }


    async function handleDelete(postId) {
        const { error } = await supabase.from('posts').delete().eq('id', postId);
        if (error) {
            console.error('Error when you delete the post:', error.message);
            return;
        }
        getPostes();
    }

    function handleUpdate(postId) {

        navigation.navigate('Update your post', { postId: postId });
    }


    function sortByRecent() {
        const sortedPosts = [...postes].sort((a, b) => b.id - a.id);
        setPostes(sortedPosts);
    }

    function sortByOldest() {
        const sortedPosts = [...postes].sort((a, b) => a.id - b.id);
        setPostes(sortedPosts);
    }
    function refresh() {
        getPostes();
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


            <ScrollView>
                {postes.map((post, index) => (
                    <View key={index}>
                        <Post title={post.title} content={post.content} publisher={post.publisher} url_image={post.url_image} rate={post.rate} />
                        <View style={styles.crud}>
                            <View style={styles.delete}>
                                <Button color="white" onPress={() => handleDelete(post.id)} title="Delete" />
                            </View>
                            <View style={styles.update}>
                                <Button color="white" onPress={() => handleUpdate(post.id)} title="Update" />
                            </View>
                        </View>

                    </View>

                ))}
            </ScrollView>
            {/* <View style={styles.bottomButtonContainer}>
        <Button onPress={() => navigation.navigate('Home')} title="Home" />
      </View> */}
        </View>
    );
}

export default ScrollViewScreen;

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
    }


});
