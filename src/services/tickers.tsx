import useBinance from "./binance";
import useBluelytics from "./bluelytics";

function useTickers() {
  const binance = useBinance();
  const bluelytics = useBluelytics();
  const errors = [];
  const isLoading = binance.isLoading || bluelytics.isLoading;

  binance.isError && errors.push(binance.isError);

  return {
    binance,
    bluelytics,
    isLoading,
    errors,
  };
}

export default useTickers;
