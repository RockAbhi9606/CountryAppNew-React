import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import CountryPage from "./pages/CountryPage";
import CountryDetailsPage from "./pages/CountryDetailsPage";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<CountryPage />} />
          <Route
            path="/countryDetails/:countryCode"
            element={<CountryDetailsPage />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
