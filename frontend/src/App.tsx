import { useEffect, useState } from "react";
import authService from "./auth/service/authService";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LanePage from "./pages/lanePage";

export function App() {
	const [isAuthenticatedState, setIsAuthenticatedState] = useState<
		boolean | null
	>(null);

	// Função assíncrona para verificar autenticação
	const checkAuth = async () => {
		const isAuthenticatedResult = await authService.profile();
		setIsAuthenticatedState(isAuthenticatedResult);
	};

	// Verifica a autenticação assim que o componente é montado
	useEffect(() => {
		checkAuth();
		console.log(isAuthenticatedState);
	}, []);

	// Enquanto estamos verificando a autenticação, mostramos um carregando
	if (isAuthenticatedState === null) {
		return <div>Loading...</div>;
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
						isAuthenticatedState ? (
							<Navigate to="/home" />
						) : (
							<LanePage />
						)
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
