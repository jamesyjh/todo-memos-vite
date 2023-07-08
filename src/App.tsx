import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Dashboard from "./pages/dashboard";
import Board from "./pages/board";
import Memo from "./pages/memo";
import NotFound from "./pages/not-found";

// layout
import Layout from "./layout";

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/boards/:id" element={<Board />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};
