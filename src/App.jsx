import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrencyConverter from "./components/Currency";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <CurrencyConverter />
      </div>
    </QueryClientProvider>
  );
}

export default App;
