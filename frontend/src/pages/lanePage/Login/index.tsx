import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "../../../auth/service/authService";
import { useNavigate } from "react-router-dom";
import { sleep } from "../../../utils"; // Função de espera para simular carregamento
import { Button } from "../../../componentes/button";
import { MoonIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../../auth/service/user";
interface FormData {
	username: string;
	password: string;
}

// Esquema de validação com yup
const schema = yup.object().shape({
	username: yup.string().required("O nome de usuário é obrigatório"),
	password: yup
		.string()
		.min(6, "Mínimo 6 caracteres")
		.required("Senha obrigatória"),
});

export default function Login() {
	const navigate = useNavigate(); // Hook para navegação
	const { setUserActive } = useUser(); // Função para definir o usuário ativo
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [message, setMessage] = useState<{ detail: string; color: string }>(
		{} as { detail: string; color: string },
	);

	async function onSubmit(data: FormData): Promise<void> {
		await authService
			.loginAuth(data)
			.then(async (response): Promise<void> => {
				if (response.sucesso && response.usuario) {
					setMessage({
						detail: "Login realizado com sucesso!",
						color: "green-500",
					});
					// Armazenar o usuário ativo no contexto
					setUserActive(response.usuario);
					await sleep(1000);
					navigate("/home");
				} else {
					setMessage({
						detail: response.mensagem,
						color: "red-500",
					});
				}
			});
	}

	return (
		<>
			{/* Formulário de login (lado direito) */}
			<div className="w-full flex items-center justify-center max-w-sm">
				{/* Formulário de login */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full max-w-sm transp p-8 rounded-lg shadow-lg space-y-6"
				>
					<h2 className="text-2xl text-center">
						Hi! Good to see you{" "}
						<span className="text-violet-600">again</span> 🐦
					</h2>
					<p
						className={`text-sm text-center w-full ${message.color} font-semibold mt-4`}
					>
						{message.detail}
					</p>
					<div>
						<label className="block mb-1 text-sm font-medium">
							Username
						</label>
						<input
							{...register("username")}
							type="username"
							placeholder="Enter your username..."
							className="w-full bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						{errors.username && (
							<p className="text-sm text-red-500 mt-1">
								{errors.username.message}
							</p>
						)}
					</div>
					<div>
						<label className="block mb-1 text-sm font-medium">
							Password
						</label>
						<input
							{...register("password")}
							type="password"
							placeholder="Enter your password..."
							className="w-full bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						{errors.password && (
							<p className="text-sm text-red-500 mt-1">
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition"
					>
						{isSubmitting ? "Logging in..." : "Log in"}
					</button>
					<Button
						variant="secondary"
						icon={<MoonIcon className="h-5 w-5" />}
						onClick={() => {
							navigate("/register");
						}}
						className="w-full"
					>
						Sign up
					</Button>
				</form>
			</div>
		</>
	);
}
