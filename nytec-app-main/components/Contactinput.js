import { View, TextInput, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import Background from './Background'
import { mediumFontSize } from "../constants/Sizes";


function Contactinput() {
    const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	// Handle title change
	const titleChangeHandler = (text) => {
		setTitle(text);
	};

	// Handle message change
	const messageChangeHandler = (text) => {
		setMessage(text);
	};

    return( 
        <Background>
        <View style={styles.container}>
            <Text style={styles.label} >Please enter your Email</Text>
				<Input
					value={title}
                    onChangeText={titleChangeHandler}
					placeholder="Email"
				/>
				<Text style={styles.label} >Test123</Text>
				<Input
					value={message}
                    onChangeText={messageChangeHandler}
					placeholder="RandonInput"
                    style={styles.messageInput}
				/>
        </View>
        </Background>
)
}

export default Contactinput;

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	label: {
		marginTop: 15,
		color: "white",
		fontSize: mediumFontSize,
		fontWeight: "500",
	},
	messageInput: {
		marginBottom: 30,
	},
});
