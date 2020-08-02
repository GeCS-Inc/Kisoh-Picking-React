import axios from "axios";
import { useState } from "react";

const HOST = "http://localhost:8000";

export function useGetApi(endpoint) {
  const [data, setData] = useState("");
  const loadFn = () => axios.get(`${HOST}${endpoint}`).then((d) => setData(d.data));

  return [data, loadFn];
}
