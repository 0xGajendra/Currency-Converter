import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (!currency) return; // ✅ Prevents unnecessary API calls

        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => setData(res[currency] || {})) // ✅ Handles undefined currency data
            .catch((error) => console.error("Error fetching data:", error)); // ✅ Handles API errors

    }, [currency]); // Runs when currency changes

    useEffect(() => {
        console.log("Updated Data:", data); // Logs only when data updates
    }, [data]);

    return data;
}

export default useCurrencyInfo;
