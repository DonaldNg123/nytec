import Url from "../models/url";
import Category from "../models/category";
import inputcategory from "../models/inputcategory";

// Image imports for ID 1 - 10
import 紐神 from "../assets/紐神.png";
import 漢神 from "../assets/漢神.png";
import 神學薈萃 from "../assets/神學薈萃.png";
import 神學百科 from "../assets/神學百科.png";
import 神學院級主日學課程 from "../assets/神學院級主日學課程.png";
import 最新消息 from "../assets/最新消息.png";
import 聯絡我們 from "../assets/聯絡我們.png";
import 奉獻支持 from "../assets/奉獻支持.png";
import 漢神之友 from "../assets/漢神之友.png";

// Image imports for ID 21 - 22
import 漢神網站 from "../assets/漢神網站.png";
import 漢神校務系統 from "../assets/漢神校務系統.png";

// Image imports for ID 51 - 52
import 課程網站 from "../assets/課程網站.png";
import 課程系統 from "../assets/課程系統.png";

// Image imports for ID 61 - 64
import 各類講座 from "../assets/各類講座.png";
import 中心活動 from "../assets/中心活動.png";
import 聖地旅遊學習團 from "../assets/聖地旅遊學習團.png";
import 其他最新消息 from "../assets/其他最新消息.png";

// Image imports for ID 81 - 86
import 支持紐神事工 from "../assets/支持紐神事工.png";
import 支持漢神事工 from "../assets/支持漢神事工.png";
import 支持神學院級主日學課程事工 from "../assets/支持神學院級主日學課程事工.png";
import 支持神學薈萃事工 from "../assets/支持神學薈萃事工.png";
import 支持神學百科事工 from "../assets/支持神學百科事工.png";
import 支持文字宣教事工 from "../assets/支持文字宣教事工.png";

// Image imports for ID 91 - 93
import 美國與其他國家漢神之友 from "../assets/美國與其他國家漢神之友.png";
import 香港漢神之友 from "../assets/香港漢神之友.png";
import 加拿大漢神之友 from "../assets/加拿大漢神之友.png";

export default new Category(0, "home", null, [
	new Url(1, "NYTEC", 紐神, "https://nytec.net"),

	new Category(2, "COST", 漢神, [
		new Url(21, "COSTwebsite", 漢神網站, "https://cost.nytec.net"),
		new Url(22, "COSTSchool", 漢神校務系統, "https://online.nytec.net"),
	]),

	new Url(3, "TheologicalEssence", 神學薈萃, "https://workshop.nytec.net"),

	new Url(4, "TheologicalEncyclopedia", 神學百科, "https://ebook.nytec.net"),

	new Category(5, "SundaySchoolProgram", 神學院級主日學課程, [
		new Url(51, "CourseWebsite", 課程網站, "https://ss.nytec.net"),
		new Url(52, "CurriculumSystem", 課程系統, "https://ssonline.nytec.net"),
	]),

	new Category(6, "LatestNews", 最新消息, [
		new Url(61, "Workshops", 各類講座, "https://nytec.net/news"),
		new Url(62, "UpcomingEvents", 中心活動, "https://nytec.net/news"),
		new Url(
			63,
			"Holylandtour",
			聖地旅遊學習團,
			"https://nytec.net/holyland/"
		),
		new Url(64, "LatestNews", 其他最新消息, "https://nytec.net/news"),
	]),

	new Category(7, "ContactUs", 聯絡我們, [
		new Url(71, "ContactWebsite", 聯絡我們 , "https://nytec.net/contact-us"),
		new inputcategory(72, "ContactForms", 聯絡我們),
	]),

	new Category(8, "DedicatedSupport", 奉獻支持, [
		new Url(
			81,
			"SupportNYTECMinistries",
			支持紐神事工,
			"https://nytec.net/donation/"
		),
		new Url(
			82,
			"SupportCOSTMinistries",
			支持漢神事工,
			"https://cost.nytec.net/support-us"
		),
		new Url(
			83,
			"SupportSundaySchoolProgram",
			支持神學院級主日學課程事工,
			"http://nytec.us/support-us/"
		),
		new Url(
			84,
			"SupportTheological",
			支持神學薈萃事工,
			"https://nytec.net/support-ws/"
		),
		new Url(
			85,
			"SupportTheologicalEBook",
			支持神學百科事工,
			"https://nytec.net/support-ebook/"
		),
		new Url(
			86,
			"Supporttextmissions",
			支持文字宣教事工,
			"https://nytec.net/support-le/"
		),
	]),

	new Category(9, "FriendsofCOST", 漢神之友, [
		new Url(
			91,
			"FriendsofCOSTinOtherCountries",
			美國與其他國家漢神之友,
			"https://cost.nytec.net/costfriends-us"
		),
		new Url(
			92,
			"FriendsofCOSTHK",
			香港漢神之友,
			"https://cost.nytec.net/costfriends-hk"
		),
		new Url(
			93,
			"FriendsofCOSTCanada",
			加拿大漢神之友,
			"https://cost.nytec.net/costfriends-ca"
		),
	]),
]);
