import { useEffect, useState } from "react";
import axios from "axios";
// limit, if 429 wait for 15 min and try again

const url = "https://course-api.com/react-store-products";

interface Data {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  company: string;
  description: string;
  category: string;
  shipping: boolean;
}

const FirstRequest = () => {
  const fetchData = async () => {
    try {
      const response = await axios<Data>(url);
      const data = response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <h2 className="text-center">first request</h2>;
};
export default FirstRequest;
