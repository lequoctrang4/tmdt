export const USER = "userLogin";
export const TOKEN = "accessToken";
export const {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setCookie,
  getCookie,
  eraseCookie,
} = {
  setLocalStorage: (name, dataJson) => {
    const data = JSON.stringify(dataJson);
    localStorage.setItem(name, data);
  },
  getLocalStorage: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
  },
  removeLocalStorage: (name) => {
    localStorage.removeItem(name);
  },
  setCookie: (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
};

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
export const money = (num) =>  VND.format(num);
