import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import BarnSizeCalculator from "./pages/BarnSizeCalculator";
import XpCalculator from "./pages/XpCalculator";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ":productId",
            element: <ProductDetail />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: "barnsizecalculator",
        element: <BarnSizeCalculator />,
      },
      {
        path: "xpcalculator",
        element: <XpCalculator />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;