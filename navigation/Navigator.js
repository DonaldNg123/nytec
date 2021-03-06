import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import ButtonList from "../components/ButtonList";
import Auth from "../components/Auth";
import Admin from "../components/Admin";
import Account from "../components/Account";
import Colors from "../constants/Colors";
import VerifyEmail from "../components/VerifyEmail";
import { mediumFontSize, smallFontSize } from "../constants/Sizes";
import Contactinput from "../components/Contactinput";

import { useTranslation } from "react-i18next";
import '../assets/i18n';

// Default stack navigator header style


const defaultStyle = {
	headerTintColor: Colors.primary,
	headerStyle: {
		backgroundColor: Colors.light,
	},
	headerTitleStyle: {
		fontSize: mediumFontSize,
	},
	headerTitleAlign: "center",
};

// Auth screen
const AuthNavigatorStack = createStackNavigator();

const AuthNavigator = () => {
	return (
		<AuthNavigatorStack.Navigator screenOptions={defaultStyle}>
			<AuthNavigatorStack.Screen name="Auth" component={Auth} />
		</AuthNavigatorStack.Navigator>
	);
};

// Account screen
const AccountNavigatorStack = createStackNavigator();

const AccountNavigator = () => {
	//Used for Translating Apps
	const {t, i18n} = useTranslation();
	return (
		<AccountNavigatorStack.Navigator screenOptions={defaultStyle}>
			<AccountNavigatorStack.Screen name={t("Account")} component={Account} />
		</AccountNavigatorStack.Navigator>
	);
};

// Main app screen
const ButtonNavigatorStack = createStackNavigator();

const ButtonNavigator = () => {
	const {t, i18n} = useTranslation();
	return (
		<ButtonNavigatorStack.Navigator screenOptions={defaultStyle}>
			<ButtonNavigatorStack.Screen name="List" component={ButtonList} />
			<ButtonNavigatorStack.Screen name={t("ContactForms")} component={ButtonList} />
		</ButtonNavigatorStack.Navigator>
	);
};

// Admin Screen
const AdminNavigatorStack = createStackNavigator();

const AdminNavigator = () => {
	//Used for Translating Apps
	const {t, i18n} = useTranslation();
	return (
		<AdminNavigatorStack.Navigator screenOptions={defaultStyle}>
			<AdminNavigatorStack.Screen name={t("Administrative")} component={Admin} />
		</AdminNavigatorStack.Navigator>
	);
};

// Verify email screen
const VerifyNavigatorStack = createStackNavigator();

const VerifyNavigator = () => {
	return (
		<VerifyNavigatorStack.Navigator screenOptions={defaultStyle}>
			<VerifyNavigatorStack.Screen
				name="VerifyEmail"
				component={VerifyEmail}
			/>
		</VerifyNavigatorStack.Navigator>
	);
};

const bottomTabBarOptions = {
	activeTintColor: Colors.primary,
	tabStyle: {
		backgroundColor: Colors.light,
	},
	labelStyle: {
		fontSize: smallFontSize,
	},
	tabStyle: {
		marginVertical: 5,
	},
};

const bottomTabBarScreenOptions = (navData) => ({
	tabBarIcon: (tabInfo) => {
		if (navData.route.name === "??????") {
			return <Ionicons name="home" size={20} color={tabInfo.color} />;
		} else if (navData.route.name === "??????") {
			return <Ionicons name="person" size={20} color={tabInfo.color} />;
		} else {
			return <Ionicons name="key" size={20} color={tabInfo.color} />;
		}
	},
});

// Main User Navigator
const MainUserNavigatorBottomTabs = createBottomTabNavigator();

const MainUserNavigator = (props) => {
	//Used for Translating Apps
	const {t, i18n} = useTranslation();
	return (
		<MainUserNavigatorBottomTabs.Navigator
			tabBarOptions={bottomTabBarOptions}
			screenOptions={bottomTabBarScreenOptions}
		>
			<MainUserNavigatorBottomTabs.Screen
				name={t("home")}
				component={props.verified ? ButtonNavigator : VerifyNavigator}
			/>
			<MainUserNavigatorBottomTabs.Screen
				name={t("Account")}
				component={AccountNavigator}
			/>
		</MainUserNavigatorBottomTabs.Navigator>
	);
};

// Main Admin Navigator
const MainAdminNavigatorBottomTabs = createBottomTabNavigator();

const MainAdminNavigator = (props) => {
	//Used for Translating Apps
	const {t, i18n} = useTranslation();
	return (
		<MainAdminNavigatorBottomTabs.Navigator
			tabBarOptions={bottomTabBarOptions}
			screenOptions={bottomTabBarScreenOptions}
		>
			<MainAdminNavigatorBottomTabs.Screen
				name={t("home")}
				component={props.verified ? ButtonNavigator : VerifyNavigator}
			/>
			<MainAdminNavigatorBottomTabs.Screen
				name={t("Account")}
				component={AccountNavigator}
			/>
			<MainAdminNavigatorBottomTabs.Screen
				name={t("Administrative")}
				component={AdminNavigator}
			/>
		</MainAdminNavigatorBottomTabs.Navigator>
	);
};

// Main function
export default function Navigator() {
	const role = useSelector((state) => state.auth.role);
	const emailVerified = useSelector((state) => state.auth.emailVerified);

	// If the user does not have a role (e.g. not authenticated), show auth screen
	// Show either User navigator or Admin navigator based on role if it exists
	return (
		<NavigationContainer>
			{!role && <AuthNavigator />}
			{role === "user" && <MainUserNavigator verified={emailVerified} />}
			{role === "admin" && (
				<MainAdminNavigator verified={emailVerified} />
			)}
		</NavigationContainer>
	);
}
