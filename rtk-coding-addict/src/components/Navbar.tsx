import { CartIcon } from "../icons";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Navbar = () => {
  const amount = useSelector((state: RootState) => state.cart.amount);
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <div className="total-amount">{amount}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
