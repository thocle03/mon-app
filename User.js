import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';

export default function User(props) {

  return (
    <View style={styles.container}>
      <Card >
        <Card.Title>Username : {props.username}</Card.Title>
        <Card.Divider />
        
        <Text style={{ marginBottom: 10 }}>
          Password : {props.password}
        </Text>
        <Text style={{ marginBottom: 10, fontSize:10 }}>
          Is Admin : {props.adm}
        </Text>
        
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
},

});