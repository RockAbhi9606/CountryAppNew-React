import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CountryPage from "./pages/CountryPage";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CountryPage />
    </QueryClientProvider>
  );
};

export default App;
