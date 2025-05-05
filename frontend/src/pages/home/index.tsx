import { Outlet } from "react-router-dom";
import NavBar from "../../componentes/navBar";

export default function HomePage() {
	return (
		<>
			<div className="container mx-auto ">
				<NavBar isLanePage={false} />
				<div>
					<div className="max-w-7xl mx-auto">
						<div className="flex mx-auto w-5/6  flex">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
