import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
