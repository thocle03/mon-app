import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
// Initialize Supabase client
const supabaseUrl = 'https://zfoxpvufbkikcipthsup.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmb3hwdnVmYmtpa2NpcHRoc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODYxNDgsImV4cCI6MjAyMjQ2MjE0OH0.3-wtnTfPxRlf86E9hP86U2wymr4gHLtpxEsTgo1q18k "
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Post(props) {

  // we use this function to retrieve the data of each user
  const [publisher, setPublisher] = useState(null);
  useEffect(() => {
    const fetchPublisher = async () => {
      if (props.publisher !== undefined) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('username')
            .eq('id', props.publisher)
            .single();
          if (error) {
            console.error('Error fetching publisher:', error.message);
          } else {
            setPublisher(data.username);
          }
        } catch (error) {
          console.error('Error fetching publisher:', error.message);
        }
      }
    };

    fetchPublisher();
  }, [props.publisher]);
  return (
    // front of each card
    <View style={styles.container}>
      <Card >
        <Card.Title>{props.title}</Card.Title>
        <Card.Divider />
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.url_image }} style={styles.image} />
          
        </View>
        <Text style={{ marginBottom: 10 }}>
          {props.content}
        </Text>
        <View style={styles.bottomContainer}>
          {/* Text component to display the username of the publisher */}
          <Text style={styles.publisher}>{publisher}</Text>
          {/* Text component to display the rating of the book */}
          <Text style={styles.rate}>{props.rate}/10</Text>
        </View>


      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 225, 
    resizeMode: 'cover',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  publisher: {
    fontSize: 10,
  },
  rate: {
    justifyContent: 'center',
  },
  

});