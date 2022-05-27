import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View } from "react-native";

import Button from "./Button";
import { flatListWidth } from "../constants/Sizes";
import data from "../data/data";
import Background from "./Background";
import LogoutButton from "./LogoutButton";

import { useTranslation } from "react-i18next";
import '../assets/i18n';
import {Pressable, Text} from "react-native";

export default function ButtonList(props) {
	// When ButtonList is called initially from the navigator, it won't have props
	// If it doesn't (e.g. props.route.params is undefined), we set items to be data.children (highest level)
	// Otherwise, we access the items through props.route.params.children
	const [isTitle, setIsTitle] = useState(false)

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
	}, [props.navigation.setOptions, isTitle]);

	// Render function for home screen
	// Maps each data item to a Button
	const renderButton = (button) => {
		return <Button item={button.item} key={button.item.id} />;
	};

	const {t, i18n} = useTranslation();

	const [currentLanguage, setLanguage] = useState('ch');

	const changeLanguage = value => {
		i18n
		.changeLanguage(value)
		.then(() => setLanguage(value))
		.catch(err => console.log(err))
	};

	const ToEnglish = () => {
		changeLanguage('en');
		setIsTitle('1');
	}
	const ToChinese = () => {
		changeLanguage('ch');
		setIsTitle('2');
	}



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
					<View style={styles.buttonContainer}>
						<LogoutButton />
					</View>
					<View style={styles.langchange}>
					<Pressable style={styles.langchangebox} onPress={ToEnglish}>
							<Text>Select English</Text>
						</Pressable>
						<Pressable style={styles.langchangebox} onPress={ToChinese}>
							<Text>选择中文</Text>
						</Pressable>
					</View>
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
	buttonContainer: {
		marginBottom: "10%",
	},
	container: {
		flex: 1,
		alignItems: "center",
	},
	flatList: {
		width: flatListWidth,
		marginTop: "10%",
	},
	langchange:{
		flex: 1,
		flexDirection: 'row',
		position: 'absolute',
		bottom: 10,
		backgroundColor: 'white',
	},
	langchangebox:{
		flex: 1,
		justifyContent: 'space-around',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
	}
});
