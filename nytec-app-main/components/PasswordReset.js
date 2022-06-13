import axios from "axios";
import React, {useState} from "react";
import { StyleSheet, Text, Alert, View, Button } from "react-native";
import Constants from "expo-constants";
import { mediumFontSize } from "../constants/Sizes";
import Dialog from "react-native-dialog"
import DialogInput from "react-native-dialog/lib/Input";

export default function PasswordReset(props) {
	const [visible, setVisible] = useState(false);
	const [email1, setemail1] = useState('');
	// const passwordChangeHandler = async () => {
		// // Prompt user for email, make API call to send email
		// console.log("hi")
		// Alert.prompt("輸入你的電子郵箱:", null, async (email) => {
		// 	try {
		// 		await axios.post(
		// 			`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${props.apiKey}`,
		// 			{
		// 				requestType: "PASSWORD_RESET",
		// 				email: email,
		// 			}
		// 		);

		// 		Alert.alert("成功", "電子郵件已經發送成功.");
		// 	} catch (err) {
		// 		let message = "發送電子郵件時出錯.";
		// 		console.log(err.response.data.error.message);
		// 		if (err.response) {
		// 			switch (err.response.data.error.message) {
		// 				case "EMAIL_NOT_FOUND":
		// 					message = "電子郵件有錯誤.";
		// 					break;
		// 				case "INVALID_EMAIL":
		// 					message = "電子郵件無效。";
		// 					break;
		// 			}
		// 		}
		// 		Alert.alert("失敗", message);
		// 	}
		// });
	// };


	const emailvalue = (text) =>{
		setemail1(text)
	}
	const showDialog = () => {
		setVisible(true);
	}

	const cancelDialog = () => {
		setVisible(false);
	}

	const passwordChangeHandlerandroid = async () => {
		console.log(email1)
		// Prompt user for email, make API call to send email
			try {
				await axios.post(
					`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${props.apiKey}`,
					{
						requestType: "PASSWORD_RESET",
						email: email1,
					}
				);
				setVisible(false)
				Alert.alert("成功", "電子郵件已經發送成功.");
				setemail1("")
			} catch (err) {
				let message = "發送電子郵件時出錯.";
				console.log(err.response.data.error.message);
				if (err.response) {
					switch (err.response.data.error.message) {
						case "EMAIL_NOT_FOUND":
							message = "電子郵件有錯誤.";
							setemail1("")
							break;
						case "INVALID_EMAIL":
							message = "電子郵件無效。";
							setemail1("")
							break;
					}
				}
				Alert.alert("失敗", message);
			};

	}

	return (
		<>
		<Text onPress={showDialog} style={styles.text}>
			{props.children}
		</Text>
		<View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Forgot your password?</Dialog.Title>
        <Dialog.Description>
          Enter Email that is associated with your account
        </Dialog.Description>
		<DialogInput onChangeText={emailvalue} placeholder="Email">
		</DialogInput>
        <Dialog.Button label="Cancel" onPress={cancelDialog} />
        <Dialog.Button label="OK" onPress={passwordChangeHandlerandroid} />
      </Dialog.Container>
    </View>
	</>
	);
}

PasswordReset.defaultProps = {
	apiKey: Constants.manifest.extra.apiKey || null,
};

const styles = StyleSheet.create({
	text: {
		color: "white",
		marginTop: 20,
		fontSize: mediumFontSize,
	},
});
