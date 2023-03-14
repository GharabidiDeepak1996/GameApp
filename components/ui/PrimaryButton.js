import react from "react";
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Colors from "../../constants/colors";

export default function PrimaryButton({buttonName,onPress}) {

    return (
            <View style={styles.buttonOuterContainer}>
                <Pressable 
                //style={({pressed}) => pressed ? [styles.buttonInnerContainer,styles.opacity]: styles.buttonInnerContainer}
               style={styles.buttonInnerContainer}
               android_ripple={{color: Colors.primary600}}
               onPress={onPress}>
                <Text style={styles.buttonText}>{buttonName}</Text>
                </Pressable>
            </View>
       
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius:28,
        margin:4,
        overflow:'hidden'
    },
    buttonInnerContainer:{
        elevation:2,
        backgroundColor: Colors.primary500,
        paddingVertical:8,
        paddingHorizontal:16,
    },
    buttonText:{
        color:'white',
        textAlign:'center',
        paddingHorizontal:30
    },
    pressed:{
        opacity:0.65
    }
})