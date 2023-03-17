import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet, Alert} from 'react-native'
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomBetween(min, max, exclude){
    const rndNumber= Math.floor(Math.random() * (max - min)) + min

    if(rndNumber === exclude){
        return generateRandomBetween(min,max,exclude)
    }else{
        return rndNumber
    }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({userNumber, onGameOver}){
    const initialGuess = generateRandomBetween(
        1,
        100,
        userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
  

    useEffect(() =>{
        if(currentGuess === userNumber){
            onGameOver()
        }
    },[currentGuess,userNumber,onGameOver])

    function nextGuessHandler(direction){
        if(
            (direction == 'lower' && currentGuess < userNumber) || 
            (direction == 'greater' && currentGuess > userNumber)
        ){
            Alert.alert("Don't lie!" ,'You know that this is wrong..',[
                {text:'sorry!', style:'cancel'}
            ])
        }
        if(direction === 'lower'){
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess + 1;
        }
        const newRndNumber =  generateRandomBetween(minBoundary,maxBoundary,currentGuess);
        setCurrentGuess(newRndNumber)
    }
    return(
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.container}>
                <Text>Higher or lower?</Text>
                <View style={styles.columLayout}>
                <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')} buttonName={'-'}/>
                <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')} buttonName={'+'} />
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:24
    },
    container:{
        //flexDirection:'row'
    },
    columLayout:{
        flexDirection:'column'
    }
    
})