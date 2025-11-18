import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import NewScrape from "./pages/NewScrape";
import ScrapeHistory from "./pages/ScrapeHistory";
import NotFound from "./pages/NotFound";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="new" element={<NewScrape />} />
        <Route path="history" element={<ScrapeHistory />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
