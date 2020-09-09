import axios from "axios";
import { useState, useEffect, useCallback } from "react";

// const HOST = "http://localhost:8000";
const HOST = "http://127.0.0.1:8000";

export function useGetApi(endpoint, lazy = true) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(!lazy);
  const loadFn = useCallback(() => {
    setLoading(true);
    axios
      .get(`${HOST}${endpoint}`)
      .then((d) => setData(d.data))
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    if (!lazy) loadFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return [data, loading, loadFn];
}

export function useFormPostApi(endpoint, onSuccess) {
  const [data, setData] = useState("");
  const loadFn = useCallback(
    (params) => {
      axios.post(`${HOST}${endpoint}`, params).then((d) => {
        setData(d.data);
        onSuccess();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint]
  );
  return [data, loadFn];
}

export function usePostApi(endpoint, params) {
  const [data, setData] = useState("");
  const loadFn = () => {
    const urlParams = new URLSearchParams(params);
    axios.post(`${HOST}${endpoint}`, urlParams).then((d) => setData(d.data));
  };
  return [data, loadFn];
}
