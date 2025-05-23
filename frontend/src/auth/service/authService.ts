import axiosInstance, { getRefreshToken } from "../../services/base/axiosInstance";
import BaseService from "../../services/base/baseService";
import { LoginSubmit } from "./auth";
import { UserActive } from "./user";

interface Mensagem {
	sucesso: boolean;
	mensagem: string ;
	usuario?: UserActive | null;
}

class AuthService extends BaseService {
	async loginAuth(data: LoginSubmit): Promise<Mensagem> {
		try {
			const response = await axiosInstance.post(`${this.serviceUrl}/auth/token/`, data);

			if (response.status === 200) {
				const { access, refresh } = response.data;
				localStorage.setItem("access_token", access);
				localStorage.setItem("refresh_token", refresh);
				// Buscar perfil
				const userData = await this.profile();
				if (userData) {
					localStorage.setItem("user", JSON.stringify(userData));
					return {
						sucesso: true,
						mensagem: "Login realizado com sucesso!",
						usuario: userData,
					};
				}
				
				return {
					sucesso: true,
					mensagem: "Login realizado com sucesso!",
				};
			}
			return {
				sucesso: false,
				mensagem: "Erro ao realizar login.",
			};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			
			if (error.response?.status === 401) {
				return {
					sucesso: false,
					mensagem: "Invalid username or password.",
				};
			}
			if (error.response?.status === 403) {
				return {
					sucesso: false,
					mensagem: "User is not active.",
				};
			}
			if (error.response?.status === 404) {
				return {
					sucesso: false,
					mensagem: "User not found.",
				};
			}
			if (error.response?.status === 500) {
				return {
					sucesso: false,
					mensagem: "Server error.",
				};
			}
			
			return {
				sucesso: false,
				mensagem: error.response?.data?.detail || error.message || "Erro de conexão.",
			};
		}
	}

	async refreshToken(): Promise<boolean> {
		const refresh = getRefreshToken();
		if (!refresh) return false;

		try {
			const response = await axiosInstance.post(
				`${this.serviceUrl}/auth/token/refresh/`,
				{ refresh }
			);
			const { access, refresh: newRefresh } = response.data;
			localStorage.setItem("access_token", access);
			localStorage.setItem("refresh_token", newRefresh);
			return true;
		} catch {
			return false;
		}
	}

	async profile(): Promise<UserActive | null> {
		const accessToken = localStorage.getItem("access_token");
		if (!accessToken) return null;
	
		try {
			const response = await axiosInstance.get(`${this.serviceUrl}/auth/token/profile/`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return response.data as UserActive;
		} catch {
			return null;
		}
	}
	
}

export default new AuthService("");
