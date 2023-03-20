import React from "react";
import {Text,StyleSheet} from 'react-native'
import Colors from "../../constants/colors";

export default function Title({children}){
    return(
        <Text style={styles.title}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    title :{
        fontFamily:'roboto-mono-bold',
        borderColor: Colors.accent500,
        borderWidth:2,
        fontSize:24,
        fontWeight:'bold',
        color: Colors.accent500,
        textAlign:'center',
        padding:6
        //borderColor:'white'
    }
})