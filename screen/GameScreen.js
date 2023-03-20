import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native'
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Colors from "../constants/colors";
import { AntDesign } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNumber = Math.floor(Math.random() * (max - min)) + min

    if (rndNumber === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNumber
    }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(
        1,
        100,
        userNumber)

    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])


    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver()
        }
    }, [currentGuess, userNumber, onGameOver])

    function nextGuessHandler(direction) {
        if (
            (direction == 'lower' && currentGuess < userNumber) ||
            (direction == 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", 'You know that this is wrong..', [
                { text: 'sorry!', style: 'cancel' }
            ])
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);

        setCurrentGuess(newRndNumber)
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]) //... sprid operater to reload privious data
    }
    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.card}>
                <InstructionText>Higher or lower?</InstructionText>

                <View >
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}
                        buttonName={<AntDesign name="minuscircleo" size={24} color="white" />} />

                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}
                        buttonName={<AntDesign name="pluscircleo" size={24} color="white" />} />
                </View>
            </View>
            {/* `This view for list` */}
            <View>
              {/* {  guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}</Text>)} */}
              <FlatList
              data={guessRounds}
              renderItem={(itemData) => <GuessLogItem dataItem={itemData.index}
              guess={itemData.item}/>}
              keyExtractor= {(item) => item}
              />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },

    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },

})