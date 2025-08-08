import { Navigate, useLocation } from "react-router";
import useAuthProvider from "../Hooks/useAuthProvider";

const PrivateRouter = ({ children }) => {
  const { firebaseUser, loading } = useAuthProvider();
  const location = useLocation();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!firebaseUser) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRouter;
