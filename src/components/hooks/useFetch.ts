import axios from "axios";
import { useEffect, useState } from "react";
import getAxiosError from "../../app/api/axiosError";
import { useNavigate } from "react-router-dom";


export type TApiResponse = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
};

const useFetch = (url: string): TApiResponse => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>("");
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const parsed = JSON.parse(token!);
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${parsed}`,
        },
      });
      setStatusText(res.statusText);
      setStatus(res.status);
      setData(res.data.courses);
    } catch (error) {
      const appError = getAxiosError(error);
      setError(error);
      if (appError.isLoginExpired) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    setLoading(false);
  };

  return { status, statusText, data, error, loading };
};

export default useFetch;
