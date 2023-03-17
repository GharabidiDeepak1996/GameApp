import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { ImageBackground, StyleSheet, SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import StartGameScreen from './screen/StartGameScreen';
import GameScreen from './screen/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screen/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  function gameOverHandler(){
    setGameIsOver(true)
  }

  let screen =<StartGameScreen onPickNumber={pickedNumberHandler}/>

  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }
  if(gameIsOver && userNumber){
    screen = <GameOverScreen/>
  }
 
  return (
    <LinearGradient 
    colors={[Colors.primary700,Colors.accent500]} 
    style = {styles.rootScreen}>
      <ImageBackground source={require('./assets/playing_die.jpg')} 
      resizeMode='cover'
      style = {styles.rootScreen}
      imageStyle = {styles.backgroundImage}>
      <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient> 
  )
}

const styles = StyleSheet.create({
  rootScreen:{
    flex: 1
  },
  backgroundImage:{
    opacity:0.15
  }
})