import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/layout/DashboardLayout.jsx'
import NewScrape from './pages/NewScrape.jsx'
import Results from './pages/Results.jsx'
import NotFound from './pages/NotFound.jsx'



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="new" element={<NewScrape />} />
        <Route path="results" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}