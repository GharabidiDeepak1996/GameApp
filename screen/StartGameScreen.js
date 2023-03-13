import React,{useState} from "react";
import {View,StyleSheet,TextInput, Alert} from 'react-native';
import PrimaryButton from '../components/PrimaryButton'

export default function StartGameScreen(){
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
    }

    return(
        <View style={styles.inputContainer}>
            <TextInput 
            onChangeText={numberInputHandler}
            value={enteredNumber}
            selectionColor={'#ddb52f'}
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
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:100,
        marginHorizontal:24,
        padding:16,
        backgroundColor:'#4e0329',
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
        borderBottomColor:'#ddb52f',
        borderBottomWidth:2,
        color:'#ddb52f',
        marginVertical:8,
        fontWeight:'bold',
        textAlign:'center'
   },
    innerContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
})