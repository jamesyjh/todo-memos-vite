import "./global.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Boards from "./components/dashboard/Boards";
import Board from "./pages/Board";
import Memos from "./components/dashboard/Memos";
import Memo from "./pages/Memo";
import NotFound from "./pages/NotFound";

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
