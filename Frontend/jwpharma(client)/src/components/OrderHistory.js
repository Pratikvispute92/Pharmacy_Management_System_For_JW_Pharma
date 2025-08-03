import React from "react";
import "../css/OrderHistory.css";

const dummyOrders = [
  {
    orderId: "ORD12345",
    date: "2024-12-20",
    items: [
      { name: "Medicine A", quantity: 2, price: 50 },
      { name: "Medicine B", quantity: 1, price: 30 },
    ],
    total: 130,
    status: "Delivered",
  },
  {
    orderId: "ORD12346",
    date: "2024-12-18",
    items: [
      { name: "Medicine C", quantity: 3, price: 20 },
      { name: "Medicine D", quantity: 1, price: 15 },
    ],
    total: 95,
    status: "Shipped",
  },
  {
    orderId: "ORD12347",
    date: "2024-12-15",
    items: [{ name: "Medicine E", quantity: 1, price: 100 }],
    total: 100,
    status: "Pending",
  },
];

export default function OrderHistory() {
  return (
    <div className="order-history">
      <h1 className="order-history-title">Order History</h1>
      <div className="orders-container">
        {dummyOrders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <h3>Order ID: {order.orderId}</h3>
              <p className="order-date">Date: {order.date}</p>
            </div>
            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index} className="item-row">
                    <span className="item-name">{item.name}</span>
                    <span className="item-details">
                      {item.quantity} x ${item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-footer">
              <p className="order-total">Total: ${order.total}</p>
              <p className="order-status">
                Status:{" "}
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
