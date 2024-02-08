import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';

export default function Post(props) {

  return (
    <View>
      <Card>
        <Card.Title>{props.title}</Card.Title>
        <Card.Divider />
        <Card.Image
          source={{ uri: props.url_image }}
        />
        <Text style={{ marginBottom: 10 }}>
          {props.content}
        </Text>
        <Text style={{ marginBottom: 10, fontSize:10 }}>
          {props.publisher}
        </Text>
        <Text style={{ justifyContent: 'center', }}>
          {props.rate}/10
        </Text>
        {/* <Text style={{ marginBottom: 10, fontSize:10 }}>
          {props.url_image}
        </Text> */}
        <Button
          title="COUCOU"
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  

});