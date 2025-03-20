"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
