import axios from "axios";

export const registerUser = async (userDetails) => {
	try {
		const res = await axios.post(
			`c/users/register`,
			userDetails
		);
		return res.data;
	} catch (error) {
		return error;
	}
};

