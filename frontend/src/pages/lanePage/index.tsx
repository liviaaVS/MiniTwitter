import { JSX } from "react";
import { Outlet } from "react-router-dom";
import banner from "../../assets/banner-lane.svg";
import NavBar from "../../componentes/navBar";

export default function LanePage(): JSX.Element {
	return (
		<>
			<div className="backgroundGradient ">
				<div className="container mx-auto pb-10 overflow-x-hidden">
					<NavBar isLanePage />
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
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
