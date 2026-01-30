import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TvDashboard from "./pages/TvDashboard";
import CreateService from "./pages/CreateService";
import UpdateService from "./pages/UpdateService";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tv" replace />} />
        <Route path="/tv" element={<TvDashboard />} />
        <Route path="/create" element={<CreateService />} />
        <Route path="/update" element={<UpdateService />} />
      </Routes>
    </BrowserRouter>
  );
}