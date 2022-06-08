import React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import * as authActions from "../store/actions/auth";
import CustomButton from "./CustomButton";

import { useTranslation } from "react-i18next";
import '../assets/i18n';

export default function LogoutButton() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const {t, i18n} = useTranslation();

	const logoutHandler = () => {
		dispatch(authActions.logout());

		navigation.replace("List");
	};

	return <CustomButton onPress={logoutHandler}>{t("Signout")}</CustomButton>;
}
