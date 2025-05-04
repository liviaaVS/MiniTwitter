import { JSX } from "react";
import cacatua from "../../assets/cacatua.svg";
import { useState } from "react";
import { MoonIcon, SunIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function NavBar(props: { autenticado: boolean }): JSX.Element {
	const [toggleMenu, setToggleMenu] = useState(false);
	const { autenticado } = props;
	const navigate = useNavigate();
	function handleLogout(): void {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user");
		navigate("/login");
	}
	return (
		<nav>
			<div className="max-w-7xl mx-auto">
				<div className="flex mx-auto justify-between w-5/6 ">
					{/* Primary menu and logo */}
					<div className="flex items-center gap-16 my-12">
						{/* logo */}
						<div>
							<a
								href="/"
								className="flex gap-1 font-bold items-center "
							>
								<img
									src={cacatua}
									alt=""
									className={" h-10 w-10 text-primary"}
								/>
								<span className="mt-2">Cacatalks</span>
							</a>
						</div>
						{/* primary */}
						<div className="hidden lg:flex gap-8 items-center mt-2">
							{autenticado ? (
								<>
									<a href="/profile">Profile</a>
									<a href="/feed">Feed</a>
								</>
							) : (
								<>
									<a
										href="#"
										className=""
									>
										Home
									</a>
									<a href="#">Benefits</a>
									<a href="#">Our Classes</a>
									<a href="#">Contact Us</a>
								</>
							)}
						</div>
					</div>
					{/* secondary */}
					<div className="flex gap-6">
						<div className="hidden xs:flex items-center gap-10">
							<div className="hidden lg:flex items-center gap-2">
								<MoonIcon className="h-6 w-6" />
								<SunIcon className="h-6 w-6" />
							</div>
							<div>
								<button
									onClick={() => {
										if (autenticado) {
											console.log("Logout");
											handleLogout();
											navigate("/login");
										} else {
											navigate("/login");
										}
									}}
									className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100"
								>
									{autenticado ? "Logout" : "Login"}
								</button>
							</div>
						</div>
						{/* Mobile navigation toggle */}
						<div className="lg:hidden flex items-center">
							<button onClick={() => setToggleMenu(!toggleMenu)}>
								<Bars3Icon className="h-6" />
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* mobile navigation */}
			<div
				className={`fixed z-40 w-full flex flex-col lg:hidden gap-12  origin-top duration-700 ${
					!toggleMenu ? "h-0" : "h-full"
				}`}
			>
				<div className="px-8 p-4 mx-4 transp2 ">
					<div className="flex flex-col gap-8 justify-start ">
						{autenticado ? (
							<>
								<a href="/profile">Profile</a>
								<a href="/feed">Feed</a>
							</>
						) : (
							<>
								<a
									href="#"
									className=""
								>
									Home
								</a>
								<a href="#">Benefits</a>
								<a href="#">Our Classes</a>
								<a href="#">Contact Us</a>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
