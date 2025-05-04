import { JSX } from "react";
import { useLocation } from "react-router-dom";
import banner from "../../assets/banner-lane.svg";
import LoginForm from "./Login";
import NavBar from "../../componentes/navBar";
import RegisterForm from "./RegisterForm";

export default function LanePage(): JSX.Element {
	const location = useLocation();
	let content;
	if (location.pathname === "/login") {
		content = <LoginForm />;
	} else if (location.pathname === "/register") {
		content = <RegisterForm />;
	} else {
		content = <p className="text-center">Welcome to Cacatalks!</p>;
	}
	return (
		<>
			<div className="backgroundGradient ">
				<div className="container mx-auto pb-10 overflow-x-hidden">
					<NavBar autenticado={false} />
					<div className="flex mx-auto w-5/6  flex items-center justify-center">
						{/* Banner (lado esquerdo) */}
						<div className="w-1/2 hidden md:block">
							<img
								src={banner}
								alt="Banner"
							/>
						</div>
						{/* Conteúdo condicional (lado direito) */}
						<div className="w-full md:w-1/2 flex justify-center">
							{content}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
