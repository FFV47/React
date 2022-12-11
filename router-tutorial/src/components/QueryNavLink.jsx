import { useLocation, NavLink } from "react-router-dom";

// Like useSearchParams, useLocation returns a location that tells us information about the URL. A location looks something like this:
// {
//   pathname: "/invoices",
//   search: "?filter=sa",
//   hash: "",
//   state: null,
//   key: "ae4cz2j"
// }

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default QueryNavLink;
