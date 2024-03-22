import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/img/LOGO.png";
import {
  eraseCookie,
  removeLocalStorage,
  TOKEN,
  USER,
} from "../../util/config";
import { profileAPI } from "../../redux/reducers/userReducer/userReducer";
import { STRING } from "../../assets/String";

const Header = () => {
  const { userLogin, profile } = useSelector((state) => state.userReducer);
  const { arrProductCart } = useSelector((state) => state.productReducer);
  const [profileClick, setProfileClick] = useState(false);
  const [barsClick, setBarsClick] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    navigate("/home");
    removeLocalStorage(USER);
    eraseCookie(TOKEN);
    window.location.reload();
  };

  useEffect(() => {
    if (userLogin) {
      const actionProfile = profileAPI();
      dispatch(actionProfile);
    }
  }, []);

  const handleBars = () => {
    setProfileClick(false);
    setBarsClick(!barsClick);
  };

  return (
    <header>
      <div className="header__container">
        <input type="checkbox" id="check" />
        <label htmlFor="check" onClick={handleBars}>
          {barsClick ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </label>
        <ul className="nav__list">
          <li className="active">
            <NavLink to="/home">{STRING.route.home}</NavLink>
          </li>
          <li>
            <NavLink to={"/"}>{STRING.route.home}</NavLink>
          </li>
          <li>
            <Link to="/list">{STRING.route.combo}</Link>
          </li>
          <li>
            <Link to="/list">{STRING.product.costume}</Link>
          </li>
          <li>
            <Link to="/list">{STRING.product.accessory}</Link>
          </li>
          <li>
            <NavLink to={"/search"} className="nav__search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <span>Search</span>
            </NavLink>
          </li>
          {profile.email ? (
            ""
          ) : (
            <li>
              <NavLink to={"/users/login"} className="nav__login">
                <button className="btn-login button-login">{STRING.login.login}</button>
              </NavLink>
            </li>
          )}
        </ul>
        <div className="header__content">
          <NavLink to={""} className="header__logo d-flex align-items-center">
            <img src={logo} alt="logo" />
            <span>Tiệm Gương Huyễn Cảnh</span>
          </NavLink>

          <div className="header__right">
            {/* <NavLink to={'/search'} className="header__search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <span>Search</span>
            </NavLink> */}
            <NavLink to={"/carts"} className="header__cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>{arrProductCart ? arrProductCart.length : "0"}</span>
            </NavLink>
            {userLogin ? (
              <div className="header__profile">
                <img
                  src={profile?.avatar}
                  alt="profile"
                  onClick={() => {
                    setProfileClick(!profileClick);
                  }}
                />
                {profileClick && (
                  <div className="header__profile-option">
                    <ul>
                      <li>
                        <NavLink
                          to={"/profile"}
                          onClick={() => {
                            setProfileClick(!profileClick);
                          }}
                        >
                          <i className="fa-solid fa-user"></i>
                          <span>Account information</span>
                        </NavLink>
                      </li>
                      <li onClick={logout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Log out</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to={"/users/login"} className="header__login">
                <button className="btn-login button-login">{STRING.login.login}</button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
