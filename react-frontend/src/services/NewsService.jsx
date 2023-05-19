import http from "./http";

const setPreference = async (data) => {
  const result = await http.post("/setpreference", data);
  return result.data;
};

const getPreference = async () => {
  const result = await http.get("/getpreference");
  return result.data;
};

const getAllPreference = async () => {
  const result = await http.get("/getallpreference");
  return result.data;
};

const getAllNews = async (data) => {
  const result = await http.get("/getallnews", { params: data });
  return result.data;
};

const getPreferenceNews = async (data) => {
  const result = await http.get("/getpreferencenews", { params: data });
  return result.data;
};

const NewsService = { setPreference, getPreference, getAllPreference, getAllNews, getPreferenceNews };
export default NewsService;
