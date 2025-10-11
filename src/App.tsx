/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layout";
import { CreateKnowledgePage } from "./pages/create-knowledge";
import { KnowledgePage } from "./pages/knowledge";
import { KnowledgeDetailPage } from "./pages/knowledge-detail";
import { RequestAnalysisPage } from "./pages/request-analysis";
import { ChatPage } from "./pages/chat";
import { DashboardPage } from "./pages/dashboard";
import { AnalysisDetailPage } from "./pages/analysis-detail";

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/create-knowledge" element={<CreateKnowledgePage />} />
            <Route path="/knowledge/:id" element={<KnowledgeDetailPage />} />
            <Route path="/request-analysis" element={<RequestAnalysisPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analysis/:id" element={<AnalysisDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
