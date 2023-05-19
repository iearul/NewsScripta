import http from "./http";

const registration = async (data) => {
  const result = await http.post("/registration", data);
  if (result?.data?.status == 200) {
    localStorage.setItem("user", JSON.stringify(result?.data?.data));
  }
  return result?.data;
};

const login = async (data) => {
  const result = await http.post("/login", data);
  if (result?.data?.status == 200) {
    localStorage.setItem("user", JSON.stringify(result?.data?.data));
  }
  return result?.data;
};

const logout = async () => {
    localStorage.removeItem("user");
};

const AuthService = { registration, login, logout };
export default AuthService;
