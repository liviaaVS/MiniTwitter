import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { JSX } from "react";

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

export default function Login(): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data: FormData): Promise<void> {
		console.log("Enviando dados fictícios:", data);
		await new Promise((resolve) => setTimeout(resolve, 2000)); // simula delay
		alert("Login simulado com sucesso!");
	}

	return (
		<>
			{/* Formulário de login (lado direito) */}
			<div className="w-full flex items-center justify-center max-w-sm">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full max-w-sm transp p-8 rounded-lg shadow-lg space-y-6"
				>
					<h2 className="text-2xl text-center">
						Hi! Good to see you{" "}
						<span className="text-violet-600">again</span> 🐦
					</h2>
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
				</form>
			</div>
		</>
	);
}
