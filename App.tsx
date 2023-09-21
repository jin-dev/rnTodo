import React from 'react'
import { View, SafeAreaView } from 'react-native'
import MainScreen from './src/screen/MainScreen'
export default function App() {
  return (
    <SafeAreaView>
      <View>
        <MainScreen />
      </View>
    </SafeAreaView>
  )
}
