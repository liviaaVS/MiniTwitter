import { JSX } from "react";
import {
	ChatBubbleOvalLeftIcon,
	HeartIcon,
	ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

interface PostCardProps {
	name: string;
	username: string;
	time: string;
	content: string;
	avatarUrl: string;
}

export default function PostCard({
	name,
	username,
	time,
	content,
	avatarUrl,
}: PostCardProps): JSX.Element {
	return (
		<div className="border-b border-gray-200 p-4 hover:bg-gray-50 transition">
			{" "}
			<div className="flex items-start gap-4">
				{" "}
				<img
					src={avatarUrl}
					alt={username}
					className="w-12 h-12 rounded-full object-cover"
				/>{" "}
				<div className="flex-1">
					{" "}
					<div className="flex justify-between">
						{" "}
						<div>
							{" "}
							<span className="font-bold">{name}</span>{" "}
							<span className="text-gray-500">
								@{username} · {time}
							</span>{" "}
						</div>{" "}
					</div>{" "}
					<p className="mt-1 text-gray-800">{content}</p>{" "}
					<div className="flex gap-8 mt-3 text-gray-500 text-sm">
						{" "}
						<button className="flex items-center gap-1 hover:text-blue-500 transition">
							{" "}
							<ChatBubbleOvalLeftIcon className="h-5 w-5" />{" "}
							<span>Comment</span>{" "}
						</button>{" "}
						<button className="flex items-center gap-1 hover:text-green-500 transition">
							{" "}
							<ArrowsRightLeftIcon className="h-5 w-5" />{" "}
							<span>Repost</span>{" "}
						</button>{" "}
						<button className="flex items-center gap-1 hover:text-pink-500 transition">
							{" "}
							<HeartIcon className="h-5 w-5" />{" "}
							<span>Like</span>{" "}
						</button>{" "}
					</div>{" "}
				</div>{" "}
			</div>{" "}
		</div>
	);
}
