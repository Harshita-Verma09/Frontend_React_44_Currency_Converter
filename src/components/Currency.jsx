import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "../../constant";
import axios from "axios";

const fetchRates = async (fromCurrency) => {
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;
    const { data } = await axios.get(API_URL);
    return data.conversion_rates;
};

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");

    const { data: rates, isLoading, error } = useQuery({ 

//Agar hum data: rates na likhein aur sirf data use karein => Data ka naam "data" hi rahega
//{ data: rates }: data ka naam rates ho gaya, data exist nahi karega agar rates nehi leakha to data mai hi sun  data rhega..

        queryKey: ["exchangeRates", fromCurrency], // Unique key for caching
        queryFn: () => fetchRates(fromCurrency),  // Function jo API call karega
        staleTime: 1000 * 60 * 10, // Cache results for 10 minutes
    });

    if (isLoading) return <p className="text-white text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">Error fetching data</p>;

    const convertedAmount = rates ? (amount * rates[toCurrency]).toFixed(2) : "N/A";

    return (
        <div className="p-6 max-w-md mx-auto bg-gray-900 text-white shadow-xl rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-5">💰 Currency Converter</h2>

            <div className="mb-4">
                <input
                    type="number"
                    className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className="flex gap-4 mb-4">
                <select
                    className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {Object.keys(rates).map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>

                <select
                    className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {Object.keys(rates).map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>

            <p className="mt-4 text-lg font-semibold text-center">
                {amount} {fromCurrency} = <span className="text-green-400">{convertedAmount} {toCurrency}</span>
            </p>
        </div>
    );
};

export default CurrencyConverter;
