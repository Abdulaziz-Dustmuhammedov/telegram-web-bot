//
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";

import { getData } from "./constants/db";

const courses = getData();

const telegram = window.Telegram.WebApp;

function App() {
  const [cardItems, setCardItems] = useState([]);

  useEffect(() => {
    telegram.ready();
    //telegram bizani web dasturimizani ishlatishga tayyotrmi yo'qmi so'rov yuborvommiza
  });

  const onAddItems = (item) => {
    const exisItem = cardItems.find((c) => c.id == item.id);

    if (exisItem) {
      const newData = cardItems.map((c) =>
        c.id == item.id ? { ...exisItem, quantity: exisItem.quantity + 1 } : c
      );
      setCardItems(newData);
    } else {
      const newData = [...cardItems, { ...item, quantity: 1 }];
      setCardItems(newData);
    }
  };

  const onRemoveItems = (item) => {
    const exisItem = cardItems.find((c) => c.id == item.id);

    if (exisItem.quantity === 1) {
      const newData = cardItems.filter((c) => c.id !== exisItem.id);
      setCardItems(newData);
    } else {
      const newData = cardItems.map((c) =>
        c.id === exisItem.id
          ? { ...exisItem, quantity: exisItem.quantity - 1 }
          : c
      );

      setCardItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();
  };

  const onSendData = useCallback(() => {
    telegram.sendData(JSON.stringify(cardItems));
  }, [cardItems]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    return telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <>
      <h1 className="heading">Sammi kurslari</h1>
      <Cart cardItems={cardItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {courses.map((course) => (
          <>
            <Card
              key={course.id}
              course={course}
              onAddItems={onAddItems}
              onRemoveItems={onRemoveItems}
            />
          </>
        ))}
      </div>
    </>
  );
}

export default App;
