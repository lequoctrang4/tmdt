import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileAPI } from "../../redux/reducers/userReducer/userReducer";
import avatar from "../../assets/img/hinh-harry-potter-anime_1.jpg";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";
import ModalChangePassword from "../../components/ModalChangePassword/ModalChangePassword";
import { getProductFavoriteAPI } from "../../redux/reducers/ProductReducer/productReducer";
import { toast } from "react-toastify";
import OrderHistory from "../../components/Order/OrdersHistory";
import { money } from "../../util/config";
import { history } from "../../App";
import { Link } from "react-router-dom";
import { STRING } from "../../assets/String";
const Order = () => {
  const { profile } = useSelector((state) => state.userReducer);
  const [openModal, setOpenModal] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const dispatch = useDispatch();
  const [typeAddress, setTypeAddress] = useState(false);
  const [paymentMedthod, setPaymentMedthod] = useState(1);
  const [delivery, setDelivery] = useState(true);
  const [orderTotal, setOrderTotal] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const { arrProductCart } = useSelector((state) => state.productReducer); // TODO: uncomment
  // const arrProductCart = dummyArrOrder;
  console.log(arrProductCart);
  useEffect(() => {
    const actionProfile = profileAPI();
    dispatch(actionProfile);

    const actionFavorite = getProductFavoriteAPI();
    dispatch(actionFavorite);
  }, []);

  const handleOpenModal = () => {
    document.querySelector("body").classList.toggle("open-modal");
    setOpenModal(true);
  };

  const handleCloseModal = (value) => {
    document.querySelector("body").classList.remove("open-modal");
    setOpenModal(value);
    setChangePassword(value);
  };

  const modalChangePassword = () => {
    document.querySelector("body").classList.toggle("open-modal");
    setChangePassword(true);
  };
  const formSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    arrProductCart.map((item) => {
      setItemQuantity((prev) => prev + item.quantity);
      setOrderTotal((prev) => prev + item.price * item.quantity);
    });
  }, []);
  const handlePlaceOrder = () => {
    toast.success("Order Success.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      history.push("/home");
    }, 3000);
  };
  console.log(typeAddress);
  const changeTypeAddress = (type) => setTypeAddress(type);
  return (
    <div className="profile">
      <div className="title">
        <h1>{STRING.odDetail}</h1>
      </div>
      {openModal && (
        <div className="updateProfile">
          <UpdateProfile closeModal={handleCloseModal} />
        </div>
      )}
      {changePassword && (
        <div className="changePassword">
          <ModalChangePassword closeModal={handleCloseModal} />
        </div>
      )}
      <div className="profile__wrapper">
        <div className="profile__container">
          <div className="profile__content">
            <div className="profile__wrap">
              <div className="profile__avt">
                <img src={avatar} alt="avatar" />
              </div>
              <form onSubmit={formSubmit} className="profile__info row">
                <div className="profile__tabs col-12">{STRING.address}</div>
                <div className="form__input col-12 col-md-6">
                  <input type="number" value={profile?.phone} disabled />
                  <span className="disable">{STRING.phone}</span>
                </div>
                <div className="form__input col-12 col-md-6">
                  <input type="text" value={profile?.name} disabled />
                  <span className="disable">{STRING.name}</span>
                </div>

                <div className="form__gender col-12 ">
                  <span>{STRING.deliOption}:</span>
                  <label htmlFor="ship">
                    <input
                      type="radio"
                      id="ship"
                      name="ship"
                      value={delivery}
                      onChange={() => setDelivery(true)}
                      checked={delivery}
                    />
                    <span className="radio" />
                    <span>{STRING.ship}</span>
                  </label>
                  <label htmlFor="takeaway">
                    <input
                      type="radio"
                      id="takeaway"
                      name="takeaway"
                      onChange={() => setDelivery(false)}
                      value={!delivery}
                      checked={!delivery}
                    />
                    <span className="radio" />
                    <span>{STRING.takeAway}</span>
                  </label>
                </div>
                {delivery ? (
                  <>
                    <div className="form__input col-12 col-md-6">
                      <input type="text" />
                      <span>{STRING.address}</span>
                    </div>
                    <div className="form__input col-12 col-md-6">
                      <input type="text" />
                      <span>{STRING.addressNote}</span>
                    </div>
                    <div className="form__input col-12 col-md-6">
                      <input type="text" />
                      <span>{STRING.ward}</span>
                    </div>
                    <div className="form__input col-12 col-md-6">
                      <input type="text" />
                      <span>{STRING.district}</span>
                    </div>
                    <div className="form__input col-12 col-md-6">
                      <input type="text" />
                      <span>{STRING.city}</span>
                    </div>

                    <div className="form__gender col-12 ">
                      <span>{STRING.labelAs}:</span>
                      <label htmlFor="home">
                        <input
                          type="radio"
                          id="home"
                          name="gender"
                          value={typeAddress}
                          onChange={() => changeTypeAddress(true)}
                          checked={typeAddress}
                        />
                        <span className="radio" />
                        <span>{STRING.home}</span>
                      </label>
                      <label htmlFor="company">
                        <input
                          type="radio"
                          id="company"
                          onChange={() => changeTypeAddress(false)}
                          name="gender"
                          value={!typeAddress}
                          checked={!typeAddress}
                        />
                        <span className="radio" />
                        <span>{STRING.company}</span>
                      </label>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="form__gender col-12 ">
                  <span>{STRING.paymentMth}</span>
                  <label htmlFor="momo">
                    <input
                      type="radio"
                      id="momo"
                      name="momo"
                      value={paymentMedthod === 1}
                      onChange={() => setPaymentMedthod(1)}
                      checked={paymentMedthod === 1}
                    />
                    <span className="radio" />
                    <span>Momo</span>
                  </label>
                  <label htmlFor="banking">
                    <input
                      type="radio"
                      id="banking"
                      onChange={() => setPaymentMedthod(2)}
                      name="banking"
                      value={paymentMedthod === 2}
                      checked={paymentMedthod === 2}
                    />
                    <span className="radio" />
                    <span>{STRING.bank}</span>
                  </label>
                  <label htmlFor="cod">
                    <input
                      type="radio"
                      id="cod"
                      name="cod"
                      onChange={() => setPaymentMedthod(3)}
                      value={paymentMedthod === 3}
                      checked={paymentMedthod === 3}
                    />
                    <span className="radio" />
                    <span>{STRING.Cash}</span>
                  </label>
                </div>
              </form>
            </div>
            <div className="profile__tabs">
              <div className="profile__tab">
                {STRING.myOd}
              </div>
            </div>
            <div className="profile__tabs-container">
              <div className="profile__tabs-content">
                <div className="profile__tabs-info">
                  <OrderHistory />
                </div>
              </div>
            </div>
            <p>
              Nhấn đặt hàng đồng nghĩ với bạn đồng ý với <Link to={"/rent"}> Quy định về cho thuê và mua sản phẩm</Link> của Tiem Guong Huyen
              Canh's {" "}
            </p>
            <div className=" d-flex justify-content-end">
              <div className="w-50 ">
                <div className="row ">
                  <div className="title col-6">Tổng giá sản phẩm:</div>
                  <div className="title col-6 text-right">
                    {money(orderTotal)}
                  </div>
                  <div className="title col-6">Tiền cọc:</div>
                  <div className="title col-6 text-right">
                    {money(orderTotal)}
                  </div>
                  <div className="title col-6">Chi phí vận chuyển:</div>
                  <div className="title col-6 text-right">{money(30000)}</div>
                  <div className="title col-6">Tổng:</div>
                  <div className="title col-6 text-right">
                    {money(orderTotal * 2 + 30000)}
                  </div>
                  <div className="profile__update col-12 pt-3">
                    <button onClick={handlePlaceOrder}>Đặt hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
export const dummyArrOrder = [
  {
    id: 11,
    name: "Caravat nhà Ravenclaw",
    price: 20000,
    size: ["Freesize"],
    quantity: 1,
    relatedProducts: ["10", "12", "14"],
    image:
      "https://lzd-img-global.slatic.net/g/p/ece0d3daf6f6254871c6c9e335ebe6b6.jpg_720x720q80.jpg_.webp",
  },
  {
    id: 13,
    name: "Đũa phép của Harry Potter",
    price: 20000,
    size: "Freesize",
    quantity: 5,
    relatedProducts: "12,14,11",
    image:
      "https://lzd-img-global.slatic.net/g/p/638a3539d9cf95aa081ae3cb8c7ff645.jpg_720x720q80.jpg_.webp",
  },
];
