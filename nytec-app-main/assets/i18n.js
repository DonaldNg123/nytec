import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import en from './en.json'
import ch from './ch.json'

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	lng: 'ch',
	fallbacklng: 'ch',
	resources: {
		en: en,
		ch: ch,
	},
	interpolation: {
		escapeValue: false
	}
});

export default i18n;