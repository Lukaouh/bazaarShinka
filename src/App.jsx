import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./pages/aboutUs/AboutUs";
import Menu from "./pages/menu/Menu";
import "./font.css";
import { useState, useEffect } from "react";
function App() {
  const [basketLength, setBasketLength] = useState(0);
  useEffect(() => {
    console.log("App.jsx -> basketLength changed:", basketLength);
  }, [basketLength]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AboutUs />,
    },
    {
      path: "/menu",
      element: (
        <Menu basketLength={basketLength} setBasketLength={setBasketLength} />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
