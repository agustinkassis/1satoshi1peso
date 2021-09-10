import useSWR from "swr";
import fetcher from "../lib/fetcher";

function useTicker() {
  const url = "https://www.binance.com/api/v1/ticker/price?symbol=BTCUSDT";
  const { data, error } = useSWR(url, fetcher);

  return {
    symbol: data?.symbol,
    price: parseInt(data?.price),
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTicker;
