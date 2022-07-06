import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

import Colors from "../constants/Colors";
import { mediumFontSize } from "../constants/Sizes";

const width = Dimensions.get("screen").width;

export default function Textarea(props) {
	const { style, placeholder, secureTextEntry, value, onChangeText } = props;
	const finalStyle = style ? { ...styles.input, ...style } : styles.input;

	return (
		<TextInput
			value={value}
			onChangeText={onChangeText}
			style={finalStyle}
			placeholder={placeholder}
			autoCapitalize="none"
			secureTextEntry={secureTextEntry}
			multiline={true}
			numberOfLines = {6}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		padding: width / 40,
		marginTop: 10,
		fontSize: mediumFontSize,
		color: "black",
		backgroundColor: Colors.light,
	},
});
