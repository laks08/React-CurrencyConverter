import { Input, Select } from "@chakra-ui/react";
import React from "react";

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
      >
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
    </div>
  );
}

export default CurrencyRow;
