import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LanePage from "./pages/lanePage";
import HomePage from "./pages/home";
import { UserProvider, useUser } from "./auth/service/user.tsx";

function AppRoutes() {
	const { userActive } = useUser();
	const isAuthenticated = !!userActive;

	return (
		<Routes>
			<Route
				path="/"
				element={<LanePage />}
			/>

			<Route
				path="/login"
				element={
					isAuthenticated ? <Navigate to="/home" /> : <LanePage />
				}
			/>
			<Route
				path="/register"
				element={<LanePage />}
			/>

			<Route
				path="/home"
				element={
					isAuthenticated ? <HomePage /> : <Navigate to="/login" />
				}
			/>
		</Routes>
	);
}

export function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
