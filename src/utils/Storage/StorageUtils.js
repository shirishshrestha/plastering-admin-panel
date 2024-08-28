export function setTokenToLocalStorage(token) {
  return localStorage.setItem("Token", token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem("Token");
}

export function setRoleToLocalStorage(role) {
  return localStorage.setItem("Role", role);
}

export function getRoleFromLocalStorage() {
  return localStorage.getItem("Role");
}
