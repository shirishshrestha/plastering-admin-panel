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

export function setIdToLocalStorage(id) {
  return localStorage.setItem("Id", id);
}

export function getIdFromLocalStorage() {
  return localStorage.getItem("Id");
}

export function setNameToLocalStorage(name) {
  return localStorage.setItem("Name", name);
}

export function getNameFromLocalStorage() {
  return localStorage.getItem("Name");
}
