import { useState } from "react";
import axios from "axios";

function LoginForm() {
	const [login, setLogin] = useState("");
	const [psw, setPsw] = useState("");
	const [user, setUser] = useState({
		isLogged: false,
		token: "",
	});
	const [vehicles, setVehicles] = useState([]);

	const url = "https://papaya-dashboard-api.herokuapp.com";

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url + "/auth/login", {
				email: login,
				password: psw,
			});
			setUser({
				isLogged: true,
				token: data.token,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleLogout = () => setUser({ isLogged: false, token: "" });

	const handleChange = (e, param) => {
		if (param === "login") setLogin(e.target.value);
		if (param === "psw") setPsw(e.target.value);
	};

	const getVehicles = async () => {
		try {
			let config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			await axios
				.get(url + "/vehicles", config)
				.then((response) => response.data)
				.then((data) => setVehicles(data.list));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{!user.isLogged ? (
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						label="login"
						onChange={(e) => handleChange(e, "login")}
					/>
					<input
						type="password"
						label="login"
						onChange={(e) => handleChange(e, "psw")}
					/>
					<button type="submit">login</button>
				</form>
			) : (
				<div>
					<button onClick={handleLogout}>logout</button>
					<button onClick={getVehicles}>fetch vehicles</button>
					{vehicles.length > 0 &&
						vehicles.map((v) => {
							return <p key={v.id}>{v.name}</p>;
						})}
				</div>
			)}
		</div>
	);
}
// POST https://papaya-dashboard-api.herokuapp.com/auth/login
/*
gasg@gasas.com password
*/
export default LoginForm;
