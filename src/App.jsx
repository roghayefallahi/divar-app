import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import defaultOptions from "configs/reactQuery";
import Layout from "layouts/Layout";
import { createContext, useState } from "react";

export const CityContext = createContext();

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [selectedCities, setSelectedCities] = useState([]);
  
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CityContext.Provider value={{selectedCities, setSelectedCities}}>
          <Layout search={search} setSearch={setSearch} setQuery={setQuery}>
            <Router
              query={query}
              setQuery={setQuery}
              setSearch={setSearch}
              search={search}
            />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              closeOnClick={true}
              rtl={true}
            />
          </Layout>
        </CityContext.Provider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
