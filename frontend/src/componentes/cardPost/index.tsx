import { JSX } from "react";
import {
	ChatBubbleOvalLeftIcon,
	HeartIcon,
	ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../button";

interface PostCardProps {
	name: string;
	username: string;
	time: string;
	content: string;
	avatarUrl: string;
	imgPost?: string;
}

export default function PostCard({
	name,
	username,
	time,
	content,
	avatarUrl,
	imgPost,
}: PostCardProps): JSX.Element {
	return (
		<div className="border-b border-gray-200 p-4 hover:bg-gray-700 transition">
			<div className="flex items-start gap-4">
				<img
					src={avatarUrl}
					alt={username}
					className="w-12 h-12 rounded-full object-cover"
				/>
				<div className="flex-1">
					<div className="flex justify-between">
						<div>
							<span className="font-bold">{name}</span>{" "}
							<span className="text-gray-500">
								@{username} · {time}
							</span>
						</div>
					</div>
					<p className="mt-1">{content}</p>
					<img
						src={imgPost}
						className="mt-2"
					/>
					<div className="flex gap-8 mt-3 text-gray-500 text-sm">
						<Button
							variant="tertiaryDark"
							className="flex items-center gap-1"
							icon={
								<ChatBubbleOvalLeftIcon className="h-5 w-5" />
							}
						>
							<span>Comment</span>
						</Button>

						<Button
							variant="tertiaryDark"
							className="flex items-center gap-1"
							icon={<ArrowsRightLeftIcon className="h-5 w-5" />}
						>
							<span>Repost</span>
						</Button>

						<Button
							variant="tertiaryDark"
							className="flex items-center gap-1"
							icon={<HeartIcon className="h-5 w-5" />}
						>
							<span>Like</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
