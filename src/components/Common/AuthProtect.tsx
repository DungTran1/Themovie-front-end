import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface ProtectedProps {
  children: React.ReactNode;
}

const AuthProtect: React.FC<ProtectedProps> = ({ children }) => {
  const currentUser = useAppSelector((state) => state.auth.current);
  if (!currentUser) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default AuthProtect;
