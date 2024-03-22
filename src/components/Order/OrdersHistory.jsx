import React, { useState } from "react";
import { money } from "../../util/config";
import { useEffect } from "react";
import { dummyArrOrder } from "../../pages/Order/Order";
import { useSelector } from "react-redux";
import { STRING } from "../../assets/String";

const OrderHistory = () => {
  const [orderTotal, setOrderTotal] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const { arrProductCart } = useSelector((state) => state.productReducer); // TODO: uncomment
  useEffect(() => {
    arrProductCart.map((item) => {
      setItemQuantity((prev) => prev + item.quantity);
      setOrderTotal((prev) => prev + item.price * item.quantity);
    });
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>{STRING.product.ID}</th>
            <th>{STRING.product.Image}</th>
            <th>{STRING.product.Name}</th>
            <th>{STRING.product.Price}</th>
            <th>{STRING.product.Quantity}</th>
            <th>Thời gian thuê</th>
            <th>{STRING.product.Total}</th>
            <th>{STRING.product.Actions}</th>
          </tr>
        </thead>
        <tbody>
          {arrProductCart?.map((prod, i) => {
            return (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>
                  <img src={prod.image} alt="product" />
                </td>
                <td>
                  {prod.name.length > 15
                    ? prod.name.substring(0, 15) + "..."
                    : prod.name}
                </td>
                <td>{money(prod.price)}</td>
                <td>{prod.quantity}</td>
                <td>{"Từ ngày: " + prod.from + ' Đến ngày: ' + prod.to}</td>
                <td>{money(prod.price * prod.quantity)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h6>
        Tổng đơn hàng ({itemQuantity} sản phẩm): <span>{money(orderTotal)}</span>
      </h6>
    </div>
  );
};

export default OrderHistory;
