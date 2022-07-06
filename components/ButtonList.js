import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View } from "react-native";

import Button from "./Button";
import { flatListWidth } from "../constants/Sizes";
import data from "../data/data";
import Background from "./Background";
import LogoutButton from "./LogoutButton";

import { useTranslation } from "react-i18next";
import '../assets/i18n';
import SwitchLanguage from "./SwitchLanguage";

export default function ButtonList(props) {
	// When ButtonList is called initially from the navigator, it won't have props
	// If it doesn't (e.g. props.route.params is undefined), we set items to be data.children (highest level)
	// Otherwise, we access the items through props.route.params.children


	//Used to Translate App.
	//Users will be given 2 buttons, One for English and One for Chinese
	//When pressed, all text will switch to english or chinese, depending on user selection
	const {t, i18n} = useTranslation();
	const currentLanguage = i18n.language

	const items = props.route.params
		? props.route.params.children
		: data.children;
	

	// Sets title in the navigation bar
	useEffect(() => {
		props.navigation.setOptions({
			headerTitle: props.route.params
				? props.route.params.name
				: t(data.name),
		});
	}, [props.navigation.setOptions, currentLanguage]);

	// Render function for home screen
	// Maps each data item to a Button
	const renderButton = (button) => {
		return <Button item={button.item} key={button.item.id} />;

	};


	// Render a FlatList that becomes a grid with 3 columns
	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={items}
					renderItem={renderButton}
					keyExtractor={(item) => item.id}
					numColumns={3}
					contentContainerStyle={styles.flatList}
				/>
				{items === data.children && (
					<>
					<LogoutButton />
					<SwitchLanguage/>
					</>
				)}
			</SafeAreaView>
		</Background>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	container: {
		flex: 1,
		alignItems: "center",
	},
	flatList: {
		width: flatListWidth,
		marginTop: "10%",
	},
});
