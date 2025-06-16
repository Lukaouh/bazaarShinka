import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./pages/aboutUs/AboutUs";
import Menu from "./pages/menu/Menu";
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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
