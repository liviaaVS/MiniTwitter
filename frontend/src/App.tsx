import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LanePage from "./pages/lanePage";
import HomePage from "./pages/home";

export function App() {
	function isAuthenticatedState(): boolean {
		const accessToken = localStorage.getItem("access_token");
		const refreshToken = localStorage.getItem("refresh_token");
		return !!accessToken && !!refreshToken;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<LanePage />}
				/>

				<Route
					path="/login"
					element={
						isAuthenticatedState() ? (
							<Navigate to="/home" />
						) : (
							<LanePage />
						)
					}
				/>

				<Route
					path="/home"
					element={
						isAuthenticatedState() ? (
							<HomePage />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
