import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layout";
import { KnowledgePage } from "./pages/knowledge";
import { CreateKnowledgePage } from "./pages/create-knowledge";

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/create-knowledge" element={<CreateKnowledgePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
