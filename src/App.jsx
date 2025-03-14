import { createRoot } from "react-dom";
import Pizza from "./Pizza";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Pizza
        name="Pepperoni"
        description="A classic pizza with pepperoni"
        image={"public/pizzas/pepperoni.webp"}
      />
      <Pizza
        name="Hawaiian"
        description="A classic pizza with ham and pineapple"
        image={"public/pizzas/hawaiian.webp"}
      />
      <Pizza
        name="Vegetarian"
        description="A classic pizza with vegetables"
        image={"public/pizzas/veggie_veg.webp"}
      />
      <Pizza
        name="Meat Feast"
        description="A classic pizza with all the meats"
        image={"public/pizzas/big_meat.webp"}
      />
    </div>
  )
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
