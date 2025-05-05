import { useEffect, useState } from "react";
import PostCard from "../../../componentes/cardPost";
import PostService from "../../../services/models/PostService";
import { Button } from "../../../componentes/button";
import SidebarUsers from "./componentes/sidebarUsers";

export interface PostSubmit {
	authorId: string;
	content: string;
	image: string;
}

interface PostResponse {
	id: string;
	author: string;
	title: string;
	content: string;
	user_image: string;
	image: string;
	date_created: string;
	count_likes: number;
}

export default function Feed() {
	const [posts, setPosts] = useState<PostResponse[]>([]);
	const [page, setPage] = useState<number>(1);
	const [hasNext, setHasNext] = useState<boolean>(false);
	const [hasPrevious, setHasPrevious] = useState<boolean>(false);

	async function getPosts(page: number): Promise<void> {
		const filter = {
			limit: 10,
			offset: (page - 1) * 10,
		};
		await PostService.getAll(filter).then((response) => {
			const posts = response.results as PostResponse[];
			const formattedPosts = posts.map((post) => ({
				...post,
				date_created: new Date(post.date_created).toLocaleDateString(
					"pt-BR",
					{
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					},
				),
				user_image:
					post.user_image !== null
						? post.user_image
						: "https://comofazeremcasa.net/wp-content/uploads/2020/04/desenho-de-flor-4.jpg",
			}));

			setPosts(formattedPosts);

			setHasNext(response.next !== null);
			setHasPrevious(response.previous !== null);
		});
	}

	useEffect(() => {
		getPosts(page);
	}, []);

	return (
		<div className="flex flex-col gap-4 w-full max-w-7xl mx-auto p-4">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl">Feed</h1>
				<p className="">Welcome to your feed!</p>
			</div>
			<div className="grid grid-cols-12 gap-4 w-full">
				<section className="col-span-8 flex flex-col gap-4">
					{posts.length === 0 ? (
						<div className="flex items-center justify-center w-full h-64 bg-gray-800 rounded-lg">
							<p className="text-gray-500">
								Nenhum post encontrado
							</p>
						</div>
					) : (
						<>
							{posts.map((post) => (
								<PostCard
									key={post.id}
									name={post.author}
									username={post.author}
									time={post.date_created}
									content={post.content}
									imgPost={post.image}
									avatarUrl={post.user_image}
								/>
							))}
						</>
					)}
					{/* Paginação */}
					<div className="flex justify-between mt-4">
						<Button
							variant="secondary"
							onClick={() => setPage((prev) => prev - 1)}
							disabled={!hasPrevious}
						>
							Anterior
						</Button>

						<Button
							onClick={() => setPage((prev) => prev + 1)}
							disabled={!hasNext}
							variant="secondary"
						>
							Próximo
						</Button>
					</div>
				</section>

				<section className="col-span-4 flex flex-col gap-4">
					<SidebarUsers />
				</section>
			</div>
		</div>
	);
}
