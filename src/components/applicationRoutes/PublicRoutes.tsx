import { Navigate, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const PublicRoutes = () => {
  return (
    <>
      {/* <Route path="/" element={<Layout />}> */}
      {/* <Route path="/home" element={<Home />} /> */}
      {/* </Route> */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<>No route available</>} />
    </>
  );
};


export default PublicRoutes;
