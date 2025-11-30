"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./authContext";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  const AuthenticatedComponent = (props: P) => {
    const auth = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!auth?.user) router.push("/login");
    }, [auth?.user, router]);

    if (!auth?.user) return null;

    return <Component {...props} />;
  };


  return AuthenticatedComponent;
}


// export default withAuth(Dashboard);