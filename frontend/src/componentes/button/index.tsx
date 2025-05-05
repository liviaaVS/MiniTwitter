import { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline"; // Usando ArrowPathIcon para carregamento

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "tertiary" | "tertiaryDark";
	size?: "default" | "md" | "sm" | "circle";
	icon?: ReactNode; // A prop icon pode ser usada para adicionar um ícone personalizado
	isLoading?: boolean;
}

export function Button({
	variant = "primary",
	size = "default",
	icon,
	isLoading,
	disabled,
	children,
	className,
	...props
}: ButtonProps) {
	const base =
		"inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

	const variants: Record<string, string> = {
		primary:
			"bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500",
		secondary:
			"border border-white text-white hover:bg-white hover:text-violet-600 focus:ring-white",
		tertiary:
			"bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300",
		tertiaryDark:
			" text-gray-500 text-sm hover:bg-gray-700 hover:text-white",
	};

	const sizes: Record<string, string> = {
		default: "px-4 py-2", // Tamanho padrão
		md: "px-6 py-3", // Tamanho médio
		sm: "px-2 py-1", // Tamanho pequeno
		circle: "p-2 w-10 h-10 rounded-full", // Tamanho circular
	};

	return (
		<button
			type="button"
			disabled={disabled || isLoading}
			className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
			{...props}
		>
			{isLoading ? (
				<ArrowPathIcon className="animate-spin h-5 w-5" />
			) : (
				<div className="flex items-center gap-2">
					{icon && <span>{icon}</span>}
					{size !== "circle" ? children : null}
				</div>
			)}
		</button>
	);
}
