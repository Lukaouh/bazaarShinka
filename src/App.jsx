import "./App.css";
import { BasketProvider } from "./context/basketLengthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./pages/aboutUs/AboutUs";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import "./font.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AboutUs />,
    },
    {
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);
  return (
    <BasketProvider>
      <RouterProvider router={router} />
    </BasketProvider>
  );
}

export default App;
