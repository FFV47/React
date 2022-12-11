import type { AppDispatch } from "../store";

import { ChevronDown, ChevronUp } from "../icons";
import { CartItemType, toggle, removeItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { PayloadAction } from "@reduxjs/toolkit";

const CartItem = ({ id, title, price, img, amount }: CartItemType) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        {/* remove button */}
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button
          className="amount-btn"
          onClick={() => dispatch(toggle({ id, type: "increase" }))}
        >
          <ChevronUp />
        </button>
        {/* amount */}
        <p className="amount">{amount}</p>
        {/* decrease amount */}
        <button
          className="amount-btn"
          onClick={() => dispatch(toggle({ id, type: "decrease" }))}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};
export default CartItem;
