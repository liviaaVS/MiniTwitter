import { RegisterFormData } from "../../pages/lanePage/RegisterForm";
import BaseService from "../base/baseService";

class UserService extends BaseService {
	
	async userRegister(data: RegisterFormData): Promise<unknown> {
		const response = await this.post(data);
		return response;
	}
}

export default new UserService("users");
