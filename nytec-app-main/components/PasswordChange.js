import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";

import * as authActions from "../store/actions/auth";
import { mediumFontSize } from "../constants/Sizes";
import CustomButton from "./CustomButton";
import Input from "./Input";
import axios from "axios";
import { t } from "i18next";

export default function PasswordChange(props) {
	const { changing, setChanging } = props;

	const [originalPassword, setOriginalPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [retypedPassword, setRetypedPassword] = useState("");

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const pressHandler = () => {
		if (changing) {
			setOriginalPassword("");
			setNewPassword("");
			setRetypedPassword("");
		}
		setChanging((state) => !state);
	};

	// Attempt to sign in and replace idToken in redux state
	const attemptToSignIn = async () => {
		try {
			const response = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${props.apiKey}`,
				{
					email: props.email,
					password: originalPassword,
					returnSecureToken: true,
				},
				{
					"Content-Type": "application/json",
				}
			);

			const { idToken, refreshToken, expiresIn } = response.data;
			const expirationDate = new Date(
				new Date().getTime() + +expiresIn * 1000
			).toISOString();
			return [idToken, refreshToken, expirationDate, expiresIn];
		} catch (err) {
			console.log(err.response.data.error.message);
			Alert.alert(t("error"), t("incorrectpassword"));
			return null;
		}
	};

	const submitHandler = async () => {
		// Check passwords match
		if (newPassword !== retypedPassword) {
			Alert.alert(t("Passwordsdonotmatch"), t("Tryagain"));
			return;
		}

		const arr = await attemptToSignIn();
		if (!arr) {
			console.log("Password is incorrect");
			return;
		}

		// Dispatch to redux and AsyncStorage

		const [idToken, refreshToken, expirationDate, expiresIn] = arr;
		dispatch(
			authActions.setIdToken(
				idToken,
				refreshToken,
				expirationDate,
				expiresIn
			)
		);

		console.log("New idToken was obtained");

		try {
			await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${props.apiKey}`,
				{
					idToken: idToken,
					password: newPassword,
				},
				{
					"Content-Type": "application/json",
				}
			);

			Alert.alert(t("成功!"), t("Passwordchanged"), [
				{
					text: "Ok",
					onPress: () => {
						navigation.replace("List");

						dispatch(authActions.logout());
					},
				},
			]);
		} catch (err) {
			let message = t("errormessage");
			if (err.response) {
				switch (err.response.data.error.message) {
					case "INVALID_ID_TOKEN":
						message = t("invalidID");
						break;
					case "WEAK_PASSWORD : Password should be at least 6 characters":
						message = t('weakpassword');
						break;
				}
			}
			Alert.alert(t("mistake"), message);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text} onPress={pressHandler}>
				{changing ? t("取消") : props.children}
			</Text>
			{changing && (
				<Input
					value={originalPassword}
					onChangeText={setOriginalPassword}
					placeholder={t("currentpassw")}
					secureTextEntry={true}
				/>
			)}
			{changing && (
				<Input
					value={newPassword}
					onChangeText={setNewPassword}
					placeholder={t("newpassw")}
					secureTextEntry={true}
				/>
			)}
			{changing && (
				<Input
					value={retypedPassword}
					onChangeText={setRetypedPassword}
					placeholder={t("rtypepword")}
					secureTextEntry={true}
				/>
			)}
			{changing && (
				<CustomButton onPress={submitHandler} style={styles.submit}>
					{t("change")}
				</CustomButton>
			)}
		</View>
	);
}

PasswordChange.defaultProps = {
	apiKey: Constants.manifest.extra.apiKey || null,
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	submit: {
		marginTop: "6%",
	},
	text: {
		color: "white",
		marginTop: 20,
		fontSize: mediumFontSize,
		textAlign: "center",
	},
});
