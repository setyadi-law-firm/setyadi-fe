import axios from "axios";

export const setyadiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api2`,
  headers: {
    "Content-Type": "application/json",
  },
});
