import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.id} : ${pizzaOfTheDay.name}` : "Loading...");

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      try {
        // URL completa para o backend remoto na Railway
        const response = await fetch("https://backend-padreginos-production.up.railway.app/api/pizza-of-the-day");

        if (!response.ok) {
          throw new Error("Erro ao buscar a pizza do dia");
        }

        const data = await response.json();
        setPizzaOfTheDay(data);
      } catch (error) {
        console.error("Erro ao buscar a pizza do dia:", error);
      }
    }

    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
