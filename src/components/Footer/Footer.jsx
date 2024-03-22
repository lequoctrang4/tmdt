import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { STRING } from "../../assets/String";

const Footer = () => {
  const { userLogin } = useSelector((state) => state.userReducer);

  return (
    <footer>
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__body">
            <div className="footer__item">
              <h6>{STRING.product.product}</h6>
              <ul>
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
              </ul>
            </div>
            <div className="footer__item">
              <h6>{STRING.support}</h6>
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://student1060632fpt.github.io/tiemGuongHuyenCanh/#about"
                    rel="noreferrer"
                  >
                    {STRING.about}
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://student1060632fpt.github.io/tiemGuongHuyenCanh/#contact"
                    rel="noreferrer"
                  >
                    {STRING.contact}
                  </a>
                </li>

                <li>
                  <Link to="/term">
                  {STRING.terms}
                  </Link>
                </li>
                <li>
                  <Link to="/rent">
                  {STRING.rental}
                   </Link>
                </li>
              </ul>
            </div>
            <div className="footer__item">
              <h6>{STRING.login.auth}</h6>
              <ul>
                {!userLogin ? (
                  <>
                    <li>
                      <NavLink to={"/users/register"}>{STRING.login.register}</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/users"}>{STRING.login.login}</NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink to={"/profile"}>{STRING.route.profile}</NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        <span>©2023 Bản quyền thuộc về Tiệm Gương Huyễn Cảnh</span>
      </div>
    </footer>
  );
};

export default Footer;
