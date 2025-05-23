import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authService from "./service/authService";

// Função para verificar se o usuário está autenticado
export async function isAuthenticated(): Promise<boolean> {
	("Verificando autenticação...");
	try {
		const result = await authService.profile();
		return !!result; // Converte o resultado para um booleano (true ou false)
	} catch (error) {
		console.error("Erro ao verificar autenticação", error);
		return false;
	}
}

// Componente para proteger rotas
export function ProtectedRoute({
	element,
	requiredRole,
}: {
	element: JSX.Element;
	requiredRole?: string[];
}): JSX.Element {
	const [isAuthenticatedState, setIsAuthenticatedState] = useState<
		boolean | null
	>(null);

	// Verificação de autenticação ao carregar o componente
	useEffect(() => {
		const checkAuthentication = async () => {
			const authenticated = await isAuthenticated();
			setIsAuthenticatedState(authenticated);
		};

		checkAuthentication();
	}, [requiredRole]);

	if (isAuthenticatedState === null) {
		// Enquanto não sabemos se o usuário está autenticado, podemos retornar um loading
		return <div>Loading...</div>;
	}

	if (!isAuthenticatedState) {
		// Redireciona para a página de login se o usuário não estiver autenticado
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}
	return element; // Retorna o elemento caso a autenticação e permissão sejam válidas
}
