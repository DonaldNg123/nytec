import { View, ScrollView,  Text, StyleSheet, Linking, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import Background from './Background'
import { mediumFontSize } from "../constants/Sizes";
import DropDownPicker from 'react-native-dropdown-picker';
import Textarea from './Textarea';
import CustomButton from './CustomButton';
import { Platform } from 'react-native-web';
import { sendEmail } from './SendEmail';


function Contactinput() {
    const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [subject, setSubject] = useState("");
	const [name, setName] = useState("");

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{label:'Admin', value:'placeholder@gmail.com'},
		{label:'Teacher', value:'placeholder1@gmail.com'},
		{label:'IT Support', value:'placeholder3@gmail.com'},
		{label:'Feedback', value:'placeholder4@gmail.com'}
	])

	// Handle title change
	const titleChangeHandler = (text) => {
		setTitle(text);
	};

	// Handle message change
	const messageChangeHandler = (text) => {
		setMessage(text);
	};

	// Handle subject change
	const subjectChangeHandler = (text) => {
		setSubject(text);
	};

	// Handle name change
	const nameChangeHandler = (text) => {
		setName(text);
	};

	const sendmessagetoemail = () => {
		sendEmail(
			'obm85796@jiooq.com',
			'Greeting!',
			'Test123'
		).then(() => {
			console.log('Our email successful provided to device mail ');
		});
	}

    return( 
        <Background>
			<View style={styles.container}>
			<DropDownPicker
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
				/>
			</View>
			<KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
			<ScrollView style={styles.container}>
				<Text style={styles.label1}>Please enter your Email</Text>
					<Input
						value={title}
						onChangeText={titleChangeHandler}
						placeholder="Email"
					/>
				<Text style={styles.label}>Please enter your Name</Text>
					<Input
						value={name}
						onChangeText={nameChangeHandler}
						placeholder="Name"
					/>
				<Text style={styles.label}>Subject</Text>
					<Input
						value={subject}
						onChangeText={subjectChangeHandler}
						placeholder="Subject"
					/>
				<Text style={styles.label}>Message</Text>
				<Textarea
					value={message}
					onChangeText={messageChangeHandler}
					placeholder="Message"
					style={styles.messageInput}
				/>
				<CustomButton onPress={sendmessagetoemail}>
					<Text>Send</Text>
				</CustomButton>
			</ScrollView>
			</KeyboardAvoidingView>
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
	label1: {
		marginTop: 0,
		color: "white",
		fontSize: mediumFontSize,
		fontWeight: "500",
	},
	messageInput: {
		marginBottom: 30,
	},
});
