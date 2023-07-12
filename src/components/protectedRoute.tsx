import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const protectedRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { user } = useAuth();

    const isAuthenticated = user ? true : false;
    const isAuthorized = user ? true : false;

    useEffect(() => {
      if (!isAuthenticated || !isAuthorized) {
        router.push("/");
      }
    }, [isAuthenticated, isAuthorized, router, user]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWrapper;
};

export default protectedRoute;
