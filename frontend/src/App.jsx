import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import PublicPortfolio from "./pages/PublicProtfolio";
import { getToken } from "./utils/Auth";

export default function App() {
  const path = window.location.pathname;

  // Public portfolio only when /username exists
  if (path.length > 1) {
    return <PublicPortfolio username={path.slice(1)} />;
  }

  const [page, setPage] = useState(
    getToken() ? "dashboard" : "login"
  );

  return (
    <>
      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
      {page === "preview" && <Preview setPage={setPage} />}
    </>
  );
}
