import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityAction,
  deleteProductCartAction,
  orderProductAPI,
  orderProductAction,
} from "../../redux/reducers/ProductReducer/productReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { money } from "../../util/config";
import { history } from "../../App";
import { STRING } from "../../assets/String";
const Carts = () => {
  const { arrProductCart } = useSelector((state) => state.productReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleChangeQuantity = (id, quantity) => {
    const itemCart = {
      id: id,
      quantity: quantity,
    };
    const action = changeQuantityAction(itemCart);
    dispatch(action);
  };

  const handleOrder = () => {
    const itemCart = {
      orderDetail: [],
      email: `${userLogin.email}`,
    };

    for (let prod of arrProductCart) {
      let item = {};
      item = {
        productId: prod.id,
        quantity: prod.quantity,
      };
      itemCart.orderDetail.push(item);
    }
    const action = orderProductAPI(itemCart);
    dispatch(action);

    history.push("/order");
  };

  return (
    <div className="cart">
      <ToastContainer />
      <div className="title">
        <h1>{STRING.cart}</h1>
      </div>
      <div className="cart__container">
        <div className="cart__content">
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
                  <tr key={i}>
                    <td>{prod.id}</td>
                    <td>
                      <img src={prod.image} alt="product" />
                    </td>
                    <td>{prod.name}</td>
                    <td>{money(prod.price)}</td>
                    <td>
                      <span
                        className="btn"
                        onClick={() => {
                          handleChangeQuantity(prod.id, 1);
                        }}
                      >
                        +
                      </span>
                      <span className="quantity">{prod.quantity}</span>
                      <span
                        className="btn"
                        onClick={() => {
                          handleChangeQuantity(prod.id, -1);
                        }}
                      >
                        -
                      </span>
                    </td>
                    <td>{"Từ ngày: "+prod.from +' Đến ngày: '+ prod.to}</td>
                    <td>{money(prod.price * prod.quantity)}</td>
                    <td
                      onClick={() => {
                        const action = deleteProductCartAction(prod.id);
                        dispatch(action);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {arrProductCart === "" ? (
            <div className="empty">{STRING.empty}</div>
          ) : (
            <div className="btnSubmit">
              <button onClick={handleOrder}>{STRING.btn.checkout}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carts;
