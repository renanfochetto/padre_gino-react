import { useState, Suspense, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders.js";
import getPastOrder from "../api/getPastOrder.js";
import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary.jsx";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

function ErrorBoundaryWrappedPastOrderRoutes() {
  const [page, setPage] = useState(1);
  const { data: loadedData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  return (
    <ErrorBoundary>
      <Suspense
        fallback={<div className="past-orders">
          <h2>Loading Past Order ...</h2>
        </div>}
      >
        <PastOrdersRoute
          loadedData={loadedData}
          isLoadingOrders={isLoadingOrders}
          page={page}
          setPage={setPage}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

function PastOrdersRoute({ loadedData, isLoadingOrders, page, setPage }) {
  const [focusedOrder, setFocusedOrder] = useState();
  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000,
  });

  if (isLoadingOrders) {
    return (
      <div className="past-orders">
        <h2>LOADING...</h2>
      </div>
    );
  }
  return (
    <div className="past-orders">
      <table>
        <thead>
        <tr>
          <td>ID</td>
          <td>Date</td>
          <td>Time</td>
        </tr>
        </thead>
        <tbody>
        {loadedData.map((order) => (
          <tr key={order.order_id}>
            <td>
              <button onClick={() => setFocusedOrder(order.order_id)}>
                {order.order_id}
              </button>
            </td>
            <td>{order.date}</td>
            <td>{order.time}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={loadedData.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {
        focusedOrder ? (
          <Modal>
            <h2>Order #{focusedOrder}</h2>
            {!isLoadingPastOrder ? (
              <table>
                <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
                </thead>
                <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{intl.format(pizza.price)}</td>
                    <td>{intl.format(pizza.total)}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            ) : (
              <p>Loading ...</p>
            )}
            <button onClick={() => setFocusedOrder()}>Close</button>
          </Modal>
        ) : null}
    </div>
  );
}
