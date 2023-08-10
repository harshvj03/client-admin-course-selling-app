import "./App.css";
import { darkTheme, lightTheme } from "./theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState, modeState } from "./feature/atom";
import PublicRoutes from "./components/applicationRoutes/PublicRoutes";
import PrivateRoutes from "./components/applicationRoutes/PrivateRoutes";

function App() {
  const [mode, setMode] = useRecoilState(modeState);
  const themeMode = mode ? "light" : "dark";
  let th = themeMode === "light" ? lightTheme : darkTheme;
  const token = localStorage.getItem("token")!;

  const publicRoutes = createBrowserRouter(
    createRoutesFromElements(PublicRoutes())
  );
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  if (token) {
    setIsLoggedIn(true);
  }
  console.log(isLoggedIn);

  const privateRoutes = createBrowserRouter(
    createRoutesFromElements(PrivateRoutes())
  );
  return (
    <>
      <ThemeProvider theme={th}>
        <CssBaseline />
        {isLoggedIn ? (
          <RouterProvider router={privateRoutes} />
        ) : (
          <>
            <RouterProvider router={publicRoutes} />
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
