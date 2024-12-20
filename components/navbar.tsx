import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function Navbar() {
	const [user] = useAuthState(auth);

	const signOutUser = async () => {
		await signOut(auth);
	};

	return (
		<nav>
			<div>
				<Link to="/">Home</Link>

				{user ? (
					<Link to="/createpost">Create Post</Link>
				) : (
					<Link to="/login">Login</Link>
				)}
			</div>
			<div className="user">
				{user && (
					<>
						<p>{user?.displayName}</p>
						<img
							src={user?.photoURL || ""}
							width="40"
							height="40"
							alt="Profile"
						/>
						<button onClick={signOutUser}>Log out</button>
					</>
				)}
			</div>
		</nav>
	);
}
