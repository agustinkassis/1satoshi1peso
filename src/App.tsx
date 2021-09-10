// eslint-disable-next-line no-use-before-define
import React from "react";
import "./App.scss";
import QuoteAnimation from "./QuoteAnimation";
import useTickers from "./services/tickers";

function App() {
  const tickers = useTickers();
  const btcUsd = tickers.binance.price;
  const usdArs = tickers.bluelytics.blue?.value_avg;

  if (tickers.isLoading) return <div>Loading...</div>;
  if (tickers.errors.length > 0)
    return <div>{JSON.stringify(tickers.errors)}</div>;
  return (
    <>
      <QuoteAnimation btcUsd={btcUsd} usdArs={usdArs} />
    </>
  );
}

export default App;
