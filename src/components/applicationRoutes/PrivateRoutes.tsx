import { Navigate, Route } from "react-router-dom";
import Layout from "../ui/Layout";
import AddCourse from "../pages/AddCourse";
import { Suspense } from "react";
import { lazy } from "react";
import EditCourse from "../pages/EditCourse";
import EditCourseNew from "../pages/EditCourseNew";

const Home = lazy(() => import("../pages/Home"));
const PrivateRoutes = () => {
  return (
    <>
      {/* <Route path="/" element={<Layout />}> */}
      {/* <Route path="/home" element={<Home />} /> */}
      {/* </Route> */}
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<>Loading Home</>}>
              <Home />
            </Suspense>
          }
        />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/home/:id" element={<EditCourseNew/>} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/addCourse" element={<AddCourse />} />

        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="*" element={<>No route available</>} />
      </Route>
    </>
  );
};

export default PrivateRoutes;
