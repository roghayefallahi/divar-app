import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Loader from "components/modules/Loader";
import DashboardPage from "pages/DashboardPage";
import { getProfile } from "services/user";
import AdminPage from "pages/AdminPage";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import PageNotFound from "pages/404";
import DetailsPage from "pages/DetailsPage";

function Router({ query, setQuery, search, setSearch }) {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route index element={<HomePage query={query} setQuery={setQuery} setSearch={setSearch} search={search} />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "admin" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    
      <Route path="post/:id" element={<DetailsPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
