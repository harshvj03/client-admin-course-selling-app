import axios, { AxiosError } from "axios";

enum AxiosErrorEnum {
  ERR_NETWORK = "ERR_NETWORK",
  ERR_BAD_REQUEST = "ERR_BAD_REQUEST",
}

export type AppError = {
  errorMessage: string;
  isLoginExpired: boolean;
};

function getAxiosError(error: unknown): AppError {
  const axiosError = error as AxiosError;
  let errorMessage = "";
  let isLoginExpired = false;
  if (axiosError.code === AxiosErrorEnum.ERR_NETWORK) {
    errorMessage = "No server response";
  } else if (axiosError.code === AxiosErrorEnum.ERR_BAD_REQUEST) {
    errorMessage = "Login Expired. Please login again";
    isLoginExpired = true;
  } else if (axios.isAxiosError(axiosError)) {
    errorMessage = axiosError.message;
  } else {
    errorMessage = "Some error occured";
  }
  return { errorMessage, isLoginExpired };
}

export default getAxiosError;
