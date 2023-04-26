import { Routes, Route, Navigate } from "react-router-dom";
import "./global.css";

// pages
import Dashboard from "./pages/dashboard";
import Board from "./pages/board";
import Memo from "./pages/Memo";
import NotFound from "./pages/NotFound";

// components
import Boards from "./components/dashboard/Boards";
import Memos from "./components/dashboard/Memos";

export const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/boards" element={<Boards />} />
				<Route path="/boards/:id" element={<Board />} />
				<Route path="/memos" element={<Memos />} />
				<Route path="/memos/:id" element={<Memo />} />
				<Route path="/not-found" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/not-found" />} />
			</Routes>
		</>
	);
};
