// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH, PATHS } from "../api";

interface AuthContextType {
	token: string | null | undefined;
	username: string | null;
	loading: boolean;
	login: (token: string, username: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null | undefined>(undefined);
	const [username, setUsername] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		setToken(localStorage.getItem(AUTH.TOKEN));
		setUsername(localStorage.getItem(AUTH.USER));
		setLoading(false);
	}, []);

	const login = (newToken: string, newUsername: string) => {
		localStorage.setItem(AUTH.TOKEN, newToken);
		localStorage.setItem(AUTH.USER, newUsername);
		setToken(newToken);
		setUsername(newUsername);
		navigate(PATHS.FRONTEND.DASHBOARD);
	};

	const logout = () => {
		console.log("Removing local storage");
		localStorage.removeItem(AUTH.TOKEN);
		localStorage.removeItem(AUTH.USER);
		setToken(null);
		setUsername(null);
		navigate(PATHS.FRONTEND.LOGIN);
	};

	return (
		<AuthContext.Provider value={{ token, username, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
