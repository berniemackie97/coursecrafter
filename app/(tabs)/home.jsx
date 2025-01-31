import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Colors from '../../constants/Colors'
import NoCourses from '../../components/Home/NoCourses'

export default function Home() {
  return (
    <View style={styles.HomeView}>
      <Header/>
      <NoCourses />
    </View>
  )
}

const styles = StyleSheet.create({
    HomeView: {
        padding: 25,
        paddingTop: Platform.OS=='ios' && 45,
        flex: 1,
        backgroundColor: Colors.WHITE
    }
})