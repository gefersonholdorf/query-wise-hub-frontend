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
import { InitialPage } from "./pages/initial-page";
import { LoginPage } from "./pages/login";
import { AuthProvider } from "./context/auth/auth-context";
import { PrivateRoute } from "./context/auth/private-routes";

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/knowledge" element={<KnowledgePage />} />
                <Route path="/create-knowledge" element={<CreateKnowledgePage />} />
                <Route path="/knowledge/:id" element={<KnowledgeDetailPage />} />
                <Route path="/analysis" element={<RequestAnalysisPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/initial-page" element={<InitialPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/analysis/:id" element={<AnalysisDetailPage />} />
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider >
  )
}
