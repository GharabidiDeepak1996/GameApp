import React,{useState} from "react";
import {View,StyleSheet,TextInput,Text, Alert} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

export default function StartGameScreen({onPickNumber}){
    const [enteredNumber,setEnteredNumber] = useState('');

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText)
    }

    function resetInputHandler(){
        setEnteredNumber('')
    }
    function confirmInputHandler(){
        const chosenNumber  = parseInt(enteredNumber)

        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber >99){
            //show alert
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99',
                [{text:'Okay' ,style:'destructive',onPress:resetInputHandler}]
            )
        }

        onPickNumber(chosenNumber);
    }

    return(
        <View style={styles.rootContainer}>
            <Title>Guess my number</Title>
             <View style={styles.card}>
                <InstructionText >Enter a Number</InstructionText>
            <TextInput 
            onChangeText={numberInputHandler}
            value={enteredNumber}
            selectionColor={Colors.accent500}
            style={styles.numberInput} 
            keyboardType='number-pad'
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={2}/>

            <View style={styles.innerContainer}>
            <PrimaryButton onPress={confirmInputHandler} buttonName={'Confirm'}/>
            <PrimaryButton onPress={resetInputHandler} buttonName={'Restart'}/>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        marginTop:100,
        alignItems:'center'
    },
    card:{
        
        justifyContent:'center',
        alignItems:'center',
        marginTop:36,
        marginHorizontal:24,
        padding:16,
        backgroundColor: Colors.primary800,
        borderRadius:8,
        elevation:4,
        shadowColor:'black',
        shadowOffset:{width:0 , height:2},
        shadowRadius:6,
        shadowOpacity:0.25
    },
   
    numberInput:{
        height:50,
        fontSize:32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth:2,
        color: Colors.accent500,
        marginVertical:8,
        fontWeight:'bold',
        textAlign:'center'
   },
    innerContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
})