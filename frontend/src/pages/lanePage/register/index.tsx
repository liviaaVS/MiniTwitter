import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sleep } from "../../../utils"; // Função de espera para simular carregamento
import { Button } from "../../../componentes/button";
import UserService from "../../../services/models/UserService";

export interface RegisterFormData {
	email: string;
	username: string;
	password: string;
}

// Esquema de validação com yup
const schema = yup.object().shape({
	email: yup.string().email("Email inválido").required("Email obrigatório"),
	username: yup.string().required("O nome de usuário é obrigatório"),
	password: yup
		.string()
		.min(6, "Mínimo 6 caracteres")
		.required("Senha obrigatória"),
});

export default function Register() {
	const navigate = useNavigate(); // Hook para navegação

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

	async function onSubmit(data: RegisterFormData): Promise<void> {
		await UserService.userRegister(data)
			.then(() => {
				setMessage({
					detail: "Registro realizado com sucesso!",
					color: "text-green-500",
				});
				sleep(1000);
				navigate("/login");
			})
			.catch((errors) => {
				setMessage({
					detail: errors.response.data.mensagem,
					color: "text-red-500",
				});
				sleep(1000);
			});
	}

	return (
		<>
			{/* Formulário de registro de usuário (lado direito) */}
			<div className="w-full flex items-center justify-center max-w-sm">
				{/* Formulário de registro de usuário */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full max-w-sm transp p-8 rounded-lg shadow-lg space-y-6"
				>
					<h2 className="text-2xl text-center">
						Hi! Nice too meet you! 🐦
					</h2>

					<p
						className={`text-sm text-center w-full ${message.color} font-semibold mt-4`}
					>
						{message.detail}
					</p>
					<div>
						<label className="block mb-1 text-sm font-medium">
							Email
						</label>
						<input
							{...register("email")}
							type="email"
							placeholder="Enter your email..."
							className="w-full bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						{errors.email && (
							<p className="text-sm text-red-500 mt-1">
								{errors.email.message}
							</p>
						)}
					</div>
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
					<Button
						variant="primary"
						type="submit"
						disabled={isSubmitting}
						className="w-full"
					>
						{isSubmitting ? "Siging in..." : "Sign up"}
					</Button>
				</form>
			</div>
		</>
	);
}
