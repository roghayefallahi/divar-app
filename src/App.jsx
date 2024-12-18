import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import defaultOptions from "configs/reactQuery";
import Layout from "layouts/Layout";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout search={search} setSearch={setSearch}  setQuery={setQuery}>
          <Router query={query} setQuery={setQuery} setSearch={setSearch} search={search}/>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            closeOnClick={true}
            rtl={true}
          />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
