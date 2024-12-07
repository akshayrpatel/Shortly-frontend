import axios from "axios";

const AXIOS = axios.create({
	baseURL:
		import.meta.env.MODE === "development"
			? import.meta.env.VITE_BACKEND_URL_DEV
			: import.meta.env.VITE_BACKEND_URL_PROD,
});

const PATHS = {
	BACKEND: {
		SERVER:
			import.meta.env.MODE === "development"
				? import.meta.env.VITE_BACKEND_URL_DEV
				: import.meta.env.VITE_BACKEND_URL_PROD,
		REGISTER: "/api/auth/public/register",
		LOGIN: "/api/auth/public/login",
		REDIRECT: "/r",
		SHORTEN: "/api/urls/shorten",
		MYURLS: "/api/urls/myurls",
	},
	FRONTEND: {
		HOME: "/",
		REGISTER: "/register",
		LOGIN: "/login",
		DASHBOARD: "/dashboard",
	},
};

const AUTH = {
	TOKEN: "SHORTLY_JWT_TOKEN",
	USER: "SHORTLY_USERNAME",
	EMAIL: "SHORTLY_EMAIL",
};

export { AXIOS, PATHS, AUTH };
