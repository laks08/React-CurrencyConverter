import { Input, Select } from "@chakra-ui/react";
import React from "react";

const currencyFlags = {
  EUR: "🇪🇺",
  USD: "🇺🇸",
  JPY: "🇯🇵",
  BGN: "🇧🇬",
  CZK: "🇨🇿",
  DKK: "🇩🇰",
  GBP: "🇬🇧",
  HUF: "🇭🇺",
  PLN: "🇵🇱",
  RON: "🇷🇴",
  SEK: "🇸🇪",
  CHF: "🇨🇭",
  ISK: "🇮🇸",
  NOK: "🇳🇴",
  HRK: "🇭🇷",
  RUB: "🇷🇺",
  TRY: "🇹🇷",
  AUD: "🇦🇺",
  BRL: "🇧🇷",
  CAD: "🇨🇦",
  CNY: "🇨🇳",
  HKD: "🇭🇰",
  IDR: "🇮🇩",
  ILS: "🇮🇱",
  INR: "🇮🇳",
  KRW: "🇰🇷",
  MXN: "🇲🇽",
  MYR: "🇲🇾",
  NZD: "🇳🇿",
  PHP: "🇵🇭",
  SGD: "🇸🇬",
  THB: "🇹🇭",
  ZAR: "🇿🇦",
};

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div className="flex flex-col space-y-4">
      <Select
        variant="filled"
        size="md"
        value={selectedCurrency}
        onChange={onChangeCurrency}
        style={{ border: "1px solid black" }}
      >
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {currencyFlags[option]}
            {option}
          </option>
        ))}
      </Select>
      <Input
        type="number"
        value={amount}
        onChange={onChangeAmount}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}

export default CurrencyRow;
