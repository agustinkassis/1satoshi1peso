import useSWR from "swr";
import fetcher from "../lib/fetcher";

function useTicker() {
  const url = "https://api.bluelytics.com.ar/v2/latest";
  const { data, error } = useSWR(url, fetcher);

  return {
    blue: data?.blue,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTicker;
