import axios from "axios";
import jwt from "jwt-decode";
// CONST -  API y Token
const ENDPOINT = "http://localhost:3009";
const AUTH_TOKEN_KEY = "authorization";
let ROLE = "role";
let USER = "user";

export function setAuthToken(token) {
  //Creamos el token
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  //Lo enviamos a localStorage
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

// FUNCIÓN PARA COGER EL TOKEN
export function getAuthToken() {
  return localStorage.getItem("token");
}

// FUNCIÓN PARA CONSEGUIR LA FECHA DE EXPIRACIÓN DEL TOKEN
export function getTokenExpirationDate(encodedToken) {
  let token = jwt(encodedToken);
  //Si no hay token, mandamos null
  if (!token.exp) {
    return null;
  } else {
    //Si hay token, sacamos la fecha en segundos
    let date = new Date(0);
    date.setUTCSeconds(token.exp);
    //Mandamos la fecha
    return date;
  }
}
// FUNCIÓN PARA COMPROBAR SI EL TOKEN ES VIGENTE O EXPIRÓ
export function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

// comprobar si el usuario esta logeado
export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken);
}


// FUNCIÓN PARA RECUPERAR EL TIPO DE USUARIO DESDE EL LOCALSTORAGE
export function getUserType() {
  return localStorage.getItem(ROLE);
}

// Funciones de limpiar del localStorage los datos
export function clearAuth_Token() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("token");
}
export function clearRole() {
  return localStorage.removeItem("role");
}
export function clearId() {
  return localStorage.removeItem("id");
}
export function clearUserName() {
  return localStorage.removeItem("nombres");
}

export function clearidName() {
  return localStorage.removeItem("nombre");
}

export function setIsName(isAdmin) {
  localStorage.setItem(nombre, nombre);
}

export function isLogged() {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    return true;
  }
  return false;
}
export function logOut() {
  clearId();
  clearRole();
  clearUserName();
  clearAuth_Token();
  clearidName();
  isLoggedIn();
}