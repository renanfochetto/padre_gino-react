const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h2", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
}

const App = () => {
  debugger;
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Padre Gino's"),
    React.createElement(Pizza, {
      name: "Pepperoni",
      description: "A classic pizza with pepperoni slices",
    }),
    React.createElement(Pizza, {
      name: "Margherita",
      description: "A classic pizza with tomato sauce and mozzarella cheese",
    }),
    React.createElement(Pizza, {
      name: "Vegetarian",
      description: "A classic pizza with assorted vegetables",
    }),
    React.createElement(Pizza, {
      name: "Hawaiian",
      description: "A classic pizza with ham and pineapple",
    }),
    React.createElement(Pizza, {
      name: "Meat Lovers",
      description: "A classic pizza with all the meats",
    }),
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
