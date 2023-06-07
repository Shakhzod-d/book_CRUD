import "./App.css";
import { Login } from "./pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { CreateBook } from "./pages/createBook/createBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/createBook",
    element: <CreateBook />,
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<h2>fallback</h2>} />;
}

export default App;
