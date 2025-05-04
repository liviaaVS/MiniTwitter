import { JSX } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Welcome(): JSX.Element {
	return (
		<section className="bg-gradient-to-br from-[#1e0438] to-[#4c0075] text-white p-10 rounded-md shadow-md max-w-3xl mx-auto mt-10">
			<div className="border-l-4 border-purple-500 pl-6 py-4 relative">
				<div className="absolute -left-3 top-4 w-6 h-6 rounded-full border-2 border-purple-500" />
				<h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
					Olá! somos o{" "}
					<span className="text-purple-400 font-bold">Cacatalks</span>{" "}
					<SparklesIcon className="h-6 w-6 inline-block text-purple-400" />
				</h1>
				<p className="text-gray-300 text-sm sm:text-base leading-relaxed">
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book. It has survived not only five centuries,
					but also the leap into electronic typesetting, remaining
					essentially unchanged. It was popularised in the 1960s.
				</p>
			</div>
			<h2 className="mt-6 text-lg sm:text-xl text-purple-200 font-bold">
				gostou da ideia?
			</h2>
		</section>
	);
}
