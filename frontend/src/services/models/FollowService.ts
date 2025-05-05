import axiosInstance from "../base/axiosInstance";
import BaseService from "../base/baseService";

class FollowService extends BaseService {
	async getFollowing(userId: number): Promise<unknown> {
		const response = await axiosInstance.get(
			`/follow/${userId}/following/`,
		);
		return response;
	}
	async getSuggestions(): Promise<unknown> {
		const response = await axiosInstance.get(`/follow/suggestions/`);
		return response;
	}

	async unfollowUser(userId: number): Promise<unknown> {
		return axiosInstance
			.delete(`follow/${userId}/unfollow/`)
			.then((response) => {
				if (response.status === 204) {
					return {
						success: true,
						message: "Unfollowed successfully",
					};
				}
				return { success: false, message: "Failed to unfollow" };
			});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async followUser(userId: number): Promise<any> {
		return axiosInstance
			.post(`${this.serviceUrl}/`, {
				followed: userId,
			})
			.then((response) => {
				if (response.status === 201) {
					return { success: true, message: "followed successfully" };
				}
				return { success: false, message: "Failed to follow" };
			});
	}
}
export default new FollowService("follow");
