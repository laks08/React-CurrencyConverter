import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL =
  "http://api.freecurrencyapi.com/v1/latest?apikey=fca_live_go1wA1gFAsTAg9m6GhrAT6yTGAHFOEKa3wnCdOs4";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.data)[0];
        const secCurrency = Object.keys(data.data)[1];
        setCurrencyOptions([...Object.keys(data.data)]);
        setFromCurrency(firstCurrency);
        setToCurrency(secCurrency);
        setExchangeRate(data.data[firstCurrency]);
      });
  }, []);

  // http://api.freecurrencyapi.com/v1/latest?apikey=fca_live_go1wA1gFAsTAg9m6GhrAT6yTGAHFOEKa3wnCdOs4&currencies=EUR%2CUSD%2CCAD&base_currency=SGD

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      console.log(fromCurrency);
      console.log(toCurrency);
      fetch(
        `${BASE_URL}&currencies=${toCurrency}&base_currency=${fromCurrency}`
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.data[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;
