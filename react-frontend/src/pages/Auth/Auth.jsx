import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);
};

export default Auth;
