import axios from "axios";
import React, { useState } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";
import Input from "./Input";
import CustomButton from "./CustomButton";
import Background from "./Background";
import { mediumFontSize } from "../constants/Sizes";

import { useTranslation } from "react-i18next";
import '../assets/i18n';

export default function Admin() {
	//Used for Translating App
	const {t, i18n} = useTranslation();
	// Input states
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	const idToken = useSelector((state) => state.auth.idToken);

	// Handle title change
	const titleChangeHandler = (text) => {
		setTitle(text);
	};

	// Handle message change
	const messageChangeHandler = (text) => {
		setMessage(text);
	};

	const sendNotification = async () => {
		const tokenList = new Set();

		// Obtain all push tokens and add them to a set so they're unique
		try {
			const response = await axios.get(
				`https://nytec-app-default-rtdb.firebaseio.com/tokens.json?auth=${idToken}`
			);
			 const obj = response.data;

			//   for (const key in obj) {
			//   	const arr = obj[key];
			//   	for (const item of arr.tokens) {
			//   		tokenList.add(item);
			//   	}
			//   }
			tokenList.add("ExponentPushToken[XCXl6HO5kxm_AZ1hBYIrkD]")

		} catch (err) {
			console.log(err.message);
		}

		Alert.alert(t("開始!"));
		const failedTokens = [];
		let errorCount = 0;

		// Make push notification API request to Expo notification endpoint
		const send = async () => {
			try {
				await axios.post(
					"https://exp.host/--/api/v2/push/send",
					{
						to: "ExponentPushToken[XCXl6HO5kxm_AZ1hBYIrkD]",
						title: title,
						body: message,
					},
					{
						headers: {
							host: "exp.host",
							Accept: "application/json",
							"Accept-Encoding": "gzip, deflate",
							"Content-Type": "application/json",
						},
					}
				);
			} catch (err) {
				console.log(
					`There was an error sending notification with push token: ${token}`
				);
				throw err;
			}
		};

		// Iterate through all unique tokens and send to Expo push notification API
		for (const token of tokenList) {
			try {
				await send(token);
			} catch (err) {
				failedTokens.push(token);

				++errorCount;
			}
		}

		// Indicate how many failed notifications
		Alert.alert(t("成功!"), (t('有') + errorCount + t('failed')));

		// Attempt to resend failed tokens
		for (const token of failedTokens) {
			await send(token);
		}
	};

	const notificationClickHandler = () => {
		const confirmContent = () => {
			// Confirm that admin wants to do this
			Alert.alert(t("你確定嗎?"), t("將向所有用戶發送通知."), [
				{ text: "Cancel", style: "destructive" },
				{ text: "Yes", onPress: sendNotification },
			]);
		};

		// Show message
		Alert.alert(t("您的留言"), `Title: ${title}\nMessage: ${message}`, [
			{ text: t("取消"), style: "destructive" },
			{ text: t("發送"), onPress: confirmContent },
		]);
	};
	
	return (
		<Background>
			<View style={styles.container}>
				<Text style={styles.label}>{t("Title2")}</Text>
				<Input
					value={title}
					onChangeText={titleChangeHandler}
					placeholder={t("Title1")}
				/>
				<Text style={styles.label}>{t("Information")}</Text>
				<Input
					value={message}
					onChangeText={messageChangeHandler}
					placeholder={t("Information")}
					style={styles.messageInput}
				/>
				<CustomButton
					color={Colors.primary}
					onPress={notificationClickHandler}
				>
					{t("Send")}
				</CustomButton>
			</View>
		</Background>
	);
}

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
