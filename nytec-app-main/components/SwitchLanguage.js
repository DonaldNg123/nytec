import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

import { useTranslation } from "react-i18next";
import '../assets/i18n';


function SwitchLanguage() {
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
	}
	const ToChinese = () => {
		changeLanguage('ch');
	}

	return( 
			<View style={styles.buttonContainer}>
				<CustomButton style={styles.langchangebox} onPress={ToEnglish}>
					<Text>Select English</Text>
				</CustomButton>
				<CustomButton style={styles.langchangebox1} onPress={ToChinese}>
					<Text>选择中文</Text>
				</CustomButton>
			</View>
)
}

export default SwitchLanguage;



const styles = StyleSheet.create({
    buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 15,
		marginBottom: 5,
		marginLeft:0,
		marginRight:0
	},
	langchangebox:{
		flex: 1,
		justifyContent: 'space-around',
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 0.5,
	},
	langchangebox1:{
		flex: 1,
		justifyContent: 'space-around',
		justifyContent: 'center',
		alignItems: 'center',
		borderLeftWidth: 0.5,
	},
});
