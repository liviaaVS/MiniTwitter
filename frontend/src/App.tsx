import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LanePage from "./pages/lanePage";
import HomePage from "./pages/home";
import { UserProvider, useUser } from "./auth/service/user.tsx";
import Login from "./pages/lanePage/login/index.tsx";
import Register from "./pages/lanePage/register/index.tsx";
import Feed from "./pages/home/feed/index.tsx";
import Welcome from "./pages/lanePage/home/index.tsx";

function AppRoutes() {
	const { userActive } = useUser();
	const isAuthenticated = !!userActive;

	return (
		<Routes>
			<Route
				path="/"
				element={<LanePage />}
			>
				<Route
					index
					element={<Welcome />}
				/>
				<Route
					path="/login"
					element={
						isAuthenticated ? <Navigate to="/home" /> : <Login />
					}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
			</Route>

			<Route
				path="/home"
				element={
					isAuthenticated ? <HomePage /> : <Navigate to="/login" />
				}
			>
				<Route
					index
					element={<Feed />}
				/>
			</Route>
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
