import NavBar from "../../componentes/navBar";

export default function HomePage() {
	return (
		<>
			<div className="backgroundSolid h-screen">
				<div className="container mx-auto">
					<NavBar autenticado={true} />
				</div>
			</div>
		</>
	);
}
