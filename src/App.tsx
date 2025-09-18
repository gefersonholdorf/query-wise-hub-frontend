import { BrowserRouter, Routes, Route } from "react-router";
import { KnowledgePage } from "./pages/knowledge";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/knowledge" element={<KnowledgePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
