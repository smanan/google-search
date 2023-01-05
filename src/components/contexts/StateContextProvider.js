import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();
const baseUrl = "https://google-search72.p.rapidapi.com/";

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = async (url) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "X-rapidapi-Key": "5b29231b48mshc3632f1ce802d08p1ba727jsn11796a8e49db",
        "X-rapidapi-Host": "google-search72.p.rapidapi.com",
      },
    });

    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, loading }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
