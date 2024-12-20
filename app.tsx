import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Main from "./pages/main/main";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import { CreatePost } from "./pages/create-post";

export default function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/createpost" element={<CreatePost />} />
				</Routes>
			</Router>
		</div>
	);
}
