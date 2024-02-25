import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zfoxpvufbkikcipthsup.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3hwdnVmYmtpa2NpcHRoc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODYxNDgsImV4cCI6MjAyMjQ2MjE0OH0.3-wtnTfPxRlf86E9hP86U2wymr4gHLtpxEsTgo1q18k "
const supabase = createClient(supabaseUrl, supabaseKey)

function UpdatePostScreen({ route, navigation }) {
  const { postId } = route.params;
  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url_image, setUrl_image] = useState('');
  const [publisher, setPublisher] = useState('');
  const [rate, setRate] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    const { data, error } = await supabase.from('posts').select().eq('id', postId);
    if (error) {
      console.error('Erreur lors de la récupération de l\'article:', error.message);
      return;
    }
    setPost(data[0]);
    setTitle(data[0].title);
    setContent(data[0].content);
    setUrl_image(data[0].url_image);
    setPublisher(data[0].publisher);
    setRate(data[0].rate);
  }

  async function updatePost() {
    const { data, error } = await supabase.from('posts').update({
      title: title,
      content: content,
      url_image: url_image,
      publisher: publisher,
      rate: rate,
    }).eq('id', postId);
    if (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error.message);
      return;
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Post</Text>
      <PaperTextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
      />
      <PaperTextInput
        label="Content"
        value={content}
        onChangeText={setContent}
        mode="outlined"
      />
      <PaperTextInput
        label="Image URL"
        value={url_image}
        onChangeText={setUrl_image}
        mode="outlined"
      />
      {/* <PaperTextInput
        label="Publisher"
        value={publisher}
        onChangeText={setPublisher}
        mode="outlined"
      /> */}
      <PaperTextInput
        label="Rate"
        value={rate}
        onChangeText={setRate}
        mode="outlined"
        keyboardType='numeric'
      />
      <Button mode="contained" onPress={updatePost} style={styles.button}>
        Update Post
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#77B5FE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  
});

export default UpdatePostScreen;
