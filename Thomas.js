import { Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { Component } from 'react'
import { useState } from 'react';

export default function Thomas (props) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
      <View>
        <Text>Thomas {props.firstname} {isVisible ? "Je suis une star !":"je suis un noub"}</Text>
        <Text>Thomas {props.firstname == 'Jacques' ? "Je suis une star !":"je suis un noub"}</Text>
        <Button onPress={() => setIsVisible(true)} title="Le bouton"/>
        <Button onPress={() => setIsVisible(false)} title="Le bouton 2"/>

        
      </View>
  )
  
}

