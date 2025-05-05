import { useState, useEffect } from "react";
import { useUser } from "../../../../auth/service/user";
import { Button } from "../../../../componentes/button";
import FollowService from "../../../../services/models/FollowService";

interface userFollowing {
	following: Follow[];
	count: number;
}

interface Follow {
	id: number;
	username: string;
	picture: string;
}

interface FollowSuggestions {
	suggestions: Follow[];
}

export default function SidebarUsers() {
	const { userActive } = useUser();
	const [following, setFollowing] = useState<userFollowing>();
	const userId = userActive?.id || 0; // Use 0 or a default value if userActive is null
	const [suggested, setSuggested] = useState<FollowSuggestions>();
	// Altere o estado de loading para controlar por ID
	const [loadingId, setLoadingId] = useState<number | null>(null);

	// Atualize as funções de follow/unfollow:
	async function handleFollow(id: number): Promise<void> {
		setLoadingId(id); // Define o ID que está carregando
		try {
			const response = await FollowService.followUser(id);
			if (response.success) {
				await getFollowing(); // Atualiza a lista
				await getSuggested(); // Atualiza sugestões
			}
		} catch (error) {
			console.error("Erro ao seguir:", error);
		} finally {
			setLoadingId(null); // Reseta o loading
		}
	}

	async function handleUnfollow(id: number): Promise<void> {
		setLoadingId(id);
		try {
			const response = await FollowService.unfollowUser(id);
			if (response.success) {
				await getFollowing();
				await getSuggested();
			}
		} catch (error) {
			console.error("Erro ao deixar de seguir:", error);
		} finally {
			setLoadingId(null);
		}
	}
	// Modifique as funções getFollowing e getSuggested para forçar atualização:
	async function getFollowing(): Promise<void> {
		const response = await FollowService.getFollowing(userId);
		setFollowing({ ...response.data }); // Força nova referência
	}

	async function getSuggested(): Promise<void> {
		const response = await FollowService.getSuggestions();
		setSuggested({ ...response.data }); // Força nova referência
	}

	// Remova TODOS os window.location.reload()

	// Simulação das buscas (substitua por chamadas reais depois)
	// Adicione um useEffect para recarregar quando o userId mudar
	useEffect(() => {
		const loadData = async () => {
			await getFollowing();
			await getSuggested();
		};
		loadData();
	}, [userId]); // Recarrega quando o usuário muda

	return (
		<>
			{" "}
			{/* Amigos */}
			<div>
				<h2 className="text-lg font-semibold mb-2">Amigos</h2>
				<ul className="flex flex-col gap-2">
					{following?.count === 0 && (
						<p className="text-gray-500">Você não tem amigos</p>
					)}
					{following?.following?.map((user, idx) => (
						<li
							key={idx}
							className="flex items-center justify-between gap-2 p-2 rounded hover:bg-gray-600"
						>
							<div className="flex items-center gap-2">
								<img
									src={
										user.picture !== null
											? user.picture
											: `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
									}
									className="w-10 h-10 rounded-full"
									alt={user.username}
								/>
								<div>
									<p className="font-medium">
										{user.username}
									</p>
									<p className="text-sm text-gray-500">
										@{user.username}
									</p>
								</div>
							</div>
							{/* Botão Unfollow */}
							<Button
								variant="secondary"
								onClick={() => handleUnfollow(user.id)}
								isLoading={loadingId === user.id} // Verifica por ID
							>
								unfollow
							</Button>
						</li>
					))}
				</ul>
			</div>
			{/* Sugeridos */}
			<div>
				<h2 className="text-lg font-semibold mb-2">
					Sugestões para seguir
				</h2>
				<ul className="flex flex-col gap-2">
					{suggested?.suggestions?.map((user, idx) => (
						<li
							key={idx}
							className="flex items-center justify-between gap-2 p-2 rounded hover:bg-gray-600"
						>
							<div className="flex items-center gap-2">
								<img
									src={
										user.picture !== null
											? user.picture
											: `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
									}
									className="w-10 h-10 rounded-full"
									alt={user.username}
								/>
								<div>
									<p className="font-medium">
										{user.username}
									</p>
									<p className="text-sm text-gray-500">
										@{user.username}
									</p>
								</div>
							</div>
							{/* Botão Follow */}
							<Button
								variant="secondary"
								onClick={(e) => {
									e.stopPropagation();
									handleFollow(user.id);
								}}
								isLoading={loadingId === user.id}
							>
								Follow
							</Button>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
