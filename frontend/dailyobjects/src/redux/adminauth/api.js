import axios from "axios";
export const adminLoginApi = async (payload) => {
	try {
		let response = await axios.post(
			"https://cute-ruby-rattlesnake-wig.cyclic.app/admin/login",
			payload
		);
		return response.data;
	} catch (e) {
		console.error("userLoginAPI error", e);
	}
};
