import { createContext, useContext, useState, useEffect } from "react";

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
  const [basketLength, setBasketLength] = useState(() => {
    const saved = sessionStorage.getItem("basket_length");
    return saved ? Number(saved) : 0;
  });
  useEffect(() => {
    sessionStorage.setItem("basket_length", basketLength);
  }, [basketLength]);
  return (
    <BasketContext.Provider value={{ basketLength, setBasketLength }}>
      {children}
    </BasketContext.Provider>
  );
};
