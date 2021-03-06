import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import Constants from "expo-constants";

import * as authActions from "../store/actions/auth";
import Background from "./Background";
import CustomButton from "./CustomButton";
import Logo from "./Logo";
import { largeFontSize, mediumFontSize } from "../constants/Sizes";

import { useTranslation } from "react-i18next";
import '../assets/i18n';

export default function VerifyEmail(props) {
	const idToken = useSelector((state) => state.auth.idToken);
	const [attempts, setAttempts] = useState(0);

	//Used for translating text/switch between english and chinese
	const {t, i18n} = useTranslation();

	const dispatch = useDispatch();

	const sendEmailHandler = async () => {
		// Send verfication email
		try {
			await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${props.apiKey}`,
				{
					requestType: "VERIFY_EMAIL",
					idToken: idToken,
				}
			);

			Alert.alert(
				t("verificationsent"),
				t("checkjunkmail")
			);
		} catch (err) {
			let message = t("CouldnotVerify");
			if (err.response) {
				switch (err.response.data.error.message) {
					case "INVALID_ID_TOKEN":
						message = t("invalidID");
					case "USER_NOT_FOUND":
						message = t("usernotfound");
					case "TOO_MANY_ATTEMPTS_TRY_LATER":
						message = "太多的嘗試。 請稍後再試。";
				}
			}
			Alert.alert(t("emailsentfail"), message);
		}

		if (attempts === 3) {
			// Third time failing
			Alert.alert(
				t("notworking"),
				t("checkemail")
			);
		}
		setAttempts((state) => state + 1);
	};

	const verifyHandler = async () => {
		try {
			// Verify that the user has clicked the verification link
			const verify = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${props.apiKey}`,
				{
					idToken: idToken,
				}
			);
			
			const emailVerified = verify.data.users[0].emailVerified;

			// If the user has not verified their email
			if (emailVerified === false) {
				Alert.alert(t("notverified"));
				return;
			}

			// Set redux state
			dispatch(authActions.sendToRedux({ emailVerified: emailVerified }));
		} catch (err) {
			let message = t("cantverifyyou");
			console.dir(err);
			if (err.response) {
				switch (err.response.data.error.message) {
					case "INVALID_ID_TOKEN":
						message = t("invalidID");
					case "USER_NOT_FOUND":
						message = t("usernotfound");
				}
			}
			Alert.alert(t("There was an error verifying your email."), message);
		}
		setAttempts(0);
	};

	return (
		<Background>
			<View style={styles.container}>
				<Logo />
				<Text style={styles.heading}>{t("Emailunverified")}</Text>
				<Text style={styles.body}>
					{t("Emailverified")}
				</Text>
				<View style={styles.buttonContainer}>
					<CustomButton onPress={sendEmailHandler}>
						{t("Send an email!")}
					</CustomButton>
					<CustomButton onPress={verifyHandler}>
						{t("whenverified")}
					</CustomButton>
				</View>
			</View>
		</Background>
	);
}

VerifyEmail.defaultProps = {
	apiKey: Constants.manifest.extra.apiKey || null,
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 30,
	},
	container: {
		padding: 20,
	},
	heading: {
		fontSize: largeFontSize,
		color: Colors.light,
		fontWeight: "500",
		marginBottom: 10,
	},
	body: {
		fontSize: mediumFontSize,
		color: "white",
	},
});
