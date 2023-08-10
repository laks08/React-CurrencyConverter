import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import { Button, Card, CardBody, ChakraProvider } from "@chakra-ui/react";

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

  function handleSwap() {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
  }

  return (
    <ChakraProvider>
      <div className="flex h-screen justify-center items-center bg-[#bfdce3]">
        <Card>
          <CardBody className="bg-[#fbbba8] rounded" boxShadow="2xl">
            <h1 className="flex justify-center title-font text-4xl font-sans font-light text-black mb-3">
              Currency Converter
            </h1>
            <div className="flex jusitify-start text-lg font-mono mt-5 mb-1">
              From
            </div>
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
            <div className="flex justify-center mb-[-10px] mt-6">
              <button
                type="button"
                className="bg-black text-white rounded px-2 py-1 shadow-lg"
                onClick={handleSwap}
              >
                Switch
              </button>
            </div>
            <div className="flex justify-start text-lg font-mono mt-5 mb-1">
              To
            </div>
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
            />
          </CardBody>
        </Card>
      </div>
    </ChakraProvider>
  );
}

export default App;
