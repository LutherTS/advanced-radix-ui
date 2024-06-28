"use client";

import { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

let options = [
  { value: "1tb", label: "1TB SSD Storage", price: 0 },
  { value: "2tb", label: "2TB SSD Storage", price: 400 },
  { value: "4tb", label: "4TB SSD Storage", price: 1000 },
  { value: "8tb", label: "8TB SSD Storage", price: 2200 },
];

const numberFormat = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "never",
  }).format(number);
};

export default function AppleSelectorGroupPage() {
  let [selectedValue, setSelectedValue] = useState(options[0].value);
  let selectedOption = options.find((option) => option.value === selectedValue);

  return (
    <main className="flex h-screen items-center justify-center bg-black text-white">
      <form
        action={(formData: FormData) => {
          alert(selectedValue);
          console.log(formData.get("storage"));
        }}
        className="w-full max-w-xs"
      >
        <p className="font-medium">Storage</p>
        <RadioGroup.Root
          className="mt-8 space-y-4"
          onValueChange={(value) => setSelectedValue(value)}
          name="storage"
          value={selectedValue}
        >
          {options.map((option) => (
            <RadioGroup.Item
              key={option.value}
              value={option.value}
              type="button"
              // onClick={() => setSelectedValue(option.value)}
              className={`flex w-full justify-between rounded-lg border p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                option.value === selectedValue
                  ? "border-sky-500 ring-1 ring-inset ring-sky-500"
                  : "border-gray-500"
              }`}
            >
              <span className="font-semibold text-white">{option.label}</span>
              {selectedOption && option.value !== selectedValue && (
                <span>
                  {option.price > selectedOption.price ? "+ " : "- "}
                  {numberFormat(option.price - selectedOption.price)}
                </span>
              )}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
        <div className="mt-5 text-right">
          <button
            type="submit"
            className="rounded bg-sky-500 px-3 py-1 text-sm font-semibold text-white"
          >
            Buy
          </button>
        </div>
      </form>
    </main>
  );
}
