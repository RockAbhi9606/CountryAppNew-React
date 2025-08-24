import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CountryPage from "./pages/CountryPage";

import App from "./App";
import CountryDetailsPage from "./pages/CountryDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CountryPage />,
      },
      {
        path: "/countryDetails/:countryCode",
        element: <CountryDetailsPage />,
      },
    ],
  },
]);

const rootElement = document.querySelector("#root");
const root = createRoot(rootElement);
root.render(<RouterProvider router={router} />);
