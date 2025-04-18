import "./cart.css";
import Button from "../button/button";
import { totalPrice } from "../../units/total-price";

const Cart = ({ cardItems, onCheckout }) => {
  return (
    <div className="cart__continer">
      <p>
        Umumiy narx:{" "}
        {totalPrice(cardItems).toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        })}
      </p>
      <Button
        title={`${cardItems.length === 0 ? "Buyurtma berish " : "To'lov"}`}
        disable={cardItems.length === 0 ? true : false}
        type={"checkout"}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
