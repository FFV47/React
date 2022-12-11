import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        {/* Expenses and Invoices routes are nested in the App route */}
        <Link to="/invoices">Invoices</Link>
        <br />
        <Link to="/expenses">Expenses</Link>
      </nav>
      {/* Outlet renders the components related to the paths */}
      <Outlet />
    </div>
  );
}
