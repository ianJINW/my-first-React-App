import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();

	const signIn = async () => {
		const result = await signInWithPopup(auth, provider);
		console.log(result);
		navigate("/");
	};
	return (
		<div className="login-container">
			<form className="login-form">
				<h2>Login</h2>

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" required />
				</div>

				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" required />
					<div className="error-message">Invalid credentials</div>
				</div>

				<button type="submit" className="login-button">
					Log In
				</button>

				<div className="login-links">
					<a href="/forgot-password">Forgot Password?</a>
				</div>
			</form>
			<div className="gAuth">
				<button onClick={signIn}>Login with Google</button>
			</div>
		</div>
	);
}
