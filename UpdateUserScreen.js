import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zfoxpvufbkikcipthsup.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3hwdnVmYmtpa2NpcHRoc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODYxNDgsImV4cCI6MjAyMjQ2MjE0OH0.3-wtnTfPxRlf86E9hP86U2wymr4gHLtpxEsTgo1q18k "
const supabase = createClient(supabaseUrl, supabaseKey)

function UpdateUserScreen({ route, navigation }) {
  const { userId } = route.params;
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data, error } = await supabase.from('users').select().eq('id', userId);
    if (error) {
      console.error('Error recover users:', error.message);
      return;
    }
    setUser(data[0]);
    setUsername(data[0].username);
    setPassword(data[0].password);
  }

  async function updateUser() {
    const { data, error } = await supabase.from('users').update({
      username: username,
      password: password,
    }).eq('id', userId);
    if (error) {
      console.error('Error update user', error.message);
      return;
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update User</Text>
      <PaperTextInput
        label="Title"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
      />
      <PaperTextInput
        label="Content"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
      />
      
      
      
      <Button mode="contained" onPress={updateUser} style={styles.button}>
        Update User
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
  }
  
});

export default UpdateUserScreen;
