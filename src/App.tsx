import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	LandingPage,
	RegisterPage,
	LoginPage,
	DashboardPage,
	Navbar,
} from "./components";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context";

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Toaster position="top-center" />
					<Navbar />
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/dashboard" element={<DashboardPage />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
