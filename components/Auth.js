import axios from "axios";
import React, { useState, useEffect} from "react";
import { View, StyleSheet, Alert, KeyboardAvoidingView, Touchable} from "react-native";
import { useSelector, useDispatch } from "react-redux";
// import { useHeaderHeight } from "@react-navigation/stack";
import Constants from "expo-constants";

import * as authActions from "../store/actions/auth";
import Input from "./Input";
import CustomButton from "./CustomButton";
import Background from "./Background";
import Loading from "./Loading";
import Logo from "./Logo";
import PasswordReset from "./PasswordReset";
import SwitchLanguage from "./SwitchLanguage";

import { useTranslation } from "react-i18next";
import '../assets/i18n';

export default function Auth(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypedPassword, setRetypedPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);

	//Used to Translate App.
	//Users will be given 2 buttons, One for English and One for Chinese
	//When pressed, all text will switch to english or chinese, depending on user selection
	const {t, i18n} = useTranslation();

	const currentLanguage = i18n.language;
	const [isLoading, setIsLoading] = useState(false);
	

	const token = useSelector((state) => state.notification.pushToken)

	const dispatch = useDispatch();
	// const headerHeight = useHeaderHeight();

	// Sets title in the navigation bar
	useEffect(() => {
		props.navigation.setOptions({
			headerTitle: isLogin ? t('login') : t('signup'),
		});
	}, [props.navigation.setOptions, isLogin, currentLanguage]);

	const submitHandler = async () => {
		// Check that passwords match
		if (!isLogin && password !== retypedPassword) {
			Alert.alert(t("Passwordsdonotmatch"), t("Tryagain"));
			return;
		}

		setIsLoading(true);
		// --- LOGIN ---
		if (isLogin) {
			try {
				const response = await axios.post(
					`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${props.apiKey}`,
					{
						email: email,
						password: password,
						returnSecureToken: true,
					},
					{
						"Content-Type": "application/json",
					}
				);

				dispatch(authActions.authenticate(response, token));
			} catch (err) {
				let message = t("errormessage");
				if (err.response) {
					console.log(err.response.data.error.message);
					switch (err.response.data.error.message) {
						// Login errors
						case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
							message =
								t("toomanyattemptstryagain");
							break;
						case "EMAIL_NOT_FOUND":
							message = t("emailnotfound");
							break;
						case "INVALID_EMAIL":
							message = t("invalidemail");
							break;
						case "INVALID_PASSWORD":
							message = t("invalidpassword");
							break;
						case "USER_DISABLED":
							message = t("Userdisabled");
							break;
					}
				}
				Alert.alert(t("mistake"), message);
			}
		}
		// --- SIGNUP ---
		else {
			try {
				const response = await axios.post(
					`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${props.apiKey}`,
					{
						email: email,
						password: password,
						returnSecureToken: true,
					},
					{
						"Content-Type": "application/json",
					}
				);

				dispatch(authActions.authenticate(response, token));
			} catch (err) {
				// Error handling
				let message = t("errormessage");
				if (err.response) {
					switch (err.response.data.error.message) {
						case "EMAIL_EXISTS":
							message = t("emailexist");
							break;
						case "INVALID_EMAIL":
							message = t("invalidemail");
							break;
						case "INVALID_PASSWORD":
							message =  t("invalidpassword");
							break;
						case "USER_DISABLED":
							message = t("Userdisabled");
							break;
						case "TOO_MANY_ATTEMPTS_TRY_LATER":
							message =t("toomanyattempts");
							break;
						case "WEAK_PASSWORD : Password should be at least 6 characters":
							message = t("weakpassword");
							break;
					}
				}

				Alert.alert(t("mistake"), message);
			}
		}
		setIsLoading(false);
	};

	const switchModeHandler = () => {
		setIsLogin((state) => !state);
	};

	const emailChangeHandler = (text) => {
		setEmail(text);
	};

	const passwordChangeHandler = (text) => {
		setPassword(text);
	};

	const retypePasswordChangeHandler = (text) => {
		setRetypedPassword(text);
	};


	return (
		<Background>
			<View style={styles.container}>
				<Logo />
				{/* <KeyboardAvoidingView
					behavior="position"
					keyboardVerticalOffset={headerHeight + 10}
				> */}
				<Input
					value={email}
					onChangeText={emailChangeHandler}
					placeholder={t('e-mail1')}
				/>
				<Input
					value={password}
					onChangeText={passwordChangeHandler}
					placeholder={t('pword')}
					secureTextEntry
				/>
				{!isLogin && (
					<Input
						value={retypedPassword}
						onChangeText={retypePasswordChangeHandler}
						placeholder={t('rtypepword')}
						secureTextEntry
					/>
				)}
				{/* </KeyboardAvoidingView> */}
				<View style={styles.buttonContainer}>
					<CustomButton onPress={submitHandler}>
						{isLogin ? t('login') : t('signup') }
					</CustomButton>
					<CustomButton onPress={switchModeHandler}>
						{isLogin ? t('new') : t('Switch')}
					</CustomButton>
				</View>
				<PasswordReset>{t('resetpword')}</PasswordReset>
				{isLoading && <Loading />}
				<SwitchLanguage/>
			</View>
		</Background>
	);
}

Auth.defaultProps = {
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
		flex: 1,
	},
	input: {
		borderWidth: 2,
		padding: 10,
		margin: 10,
		fontSize: 14,
	},
});
