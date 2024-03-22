import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductByIdAPI,
  productCartAction,
} from "../../redux/reducers/ProductReducer/productReducer";
import { useEffect } from "react";
import ShoeCard from "../../components/ShoeCard/ShoeCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { money } from "../../util/config";
import { history } from "../../App";
import { STRING } from "../../assets/String";
import { DatePicker, Space } from 'antd';

const Detail = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetail, arrProduct } = useSelector(
    (state) => state.productReducer
  );
  const [number, setNumber] = useState(1);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const getProductById = () => {
    const action = getProductByIdAPI(param.id);
    dispatch(action);
  };

  const handleSize = (index) => {
    let size = document.querySelectorAll(".size");
    for (let t of size) {
      t.className = "size";
    }
    size[index].classList.toggle("active");
  };

  useEffect(() => {
    getProductById();
  }, [param.id]);

  const handleCart = (buynow = false) => {
    if (!userLogin) {
      toast.info(STRING.popup.loginToContinue, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (buynow == false) {
      toast.success(STRING.popup.success, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const itemCart = { ...productDetail, quantity: number, from: from, to: to };
      const action = productCartAction(itemCart);
      dispatch(action);
    } else {

      const itemCart = { ...productDetail, quantity: number, from: from, to: to };
      const action = productCartAction(itemCart);
      dispatch(action);
      history.push("/carts");
    }
  };
  const onChange = (date, dateString) => {
    console.log(dateString);
  };
  return (
    <div className="detail">
      <ToastContainer />
      <div className="detail__infoProduct">
        <div className="infoProduct__content row">
          <div className="infoProduct__left col-4">
            <img src={productDetail?.image} alt="product" />
          </div>
          <div className="infoProduct__right col-8">
            <div className="infoProDuct__info">
              <h4 id="name">{productDetail?.name}</h4>
              <p id="info">{productDetail?.description}</p>
            </div>
            <div className="infoProDuct__size">
              <h5>
                <i className="fa-solid fa-check mr-2"></i>
                {STRING.size}
              </h5>
              <ul id="arrSize">
                {productDetail?.size.map((item, i) => {
                  return (
                    <li
                      className="size"
                      key={i}
                      onClick={() => {
                        handleSize(i);
                      }}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="infoProDuct__size">
              <h5>
                <i className="fa-solid fa-check mr-2"></i>
                Thời gian thuê
              </h5>
              <ul id="arrSize">
                <Space direction="vertical">
                  <DatePicker placeholder="Từ ngày" onChange={(date,dateString) => {
                    setFrom(dateString)
                  }
                  } />
                  <DatePicker placeholder="Đến ngày" onChange={(date,dateString) => {
                    setTo(dateString)
                  }} />
                </Space>
              </ul>
            </div>


            <div className="infoProDuct__buy">
              <h5 id="price">
                <i className="fa-solid fa-tags mr-2"></i>
                {money(productDetail?.price)}
              </h5>
              <span
                className="btn"
                onClick={() => {
                  if (number <= 1) {
                    return;
                  }
                  setNumber(number - 1);
                }}
              >
                -
              </span>
              <span className="num">{number}</span>

              <span className="btn" onClick={() => setNumber(number + 1)}>
                +
              </span>

              <div className="infoProDuct__button">
                <button onClick={() => handleCart(false)}>{STRING.btn.addToCart}</button>
              </div>
              <div className="infoProDuct__button">
                <button onClick={() => handleCart(true)}>{STRING.btn.buyNow}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail__relateProduct">
        <h1>{STRING.product.relaProduct}</h1>
        <div className="relateProduct__container">
          <div className="relateProduct__content row">
            {productDetail?.relatedProducts?.map((id) => {
              const index = parseInt(id) - 1;
              const product = arrProduct[index];
              return (
                <div
                  className="product__item col-12 col-sm-6 col-lg-4"
                  key={id}
                >
                  <div className="product__card">
                    <ShoeCard prod={product} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
