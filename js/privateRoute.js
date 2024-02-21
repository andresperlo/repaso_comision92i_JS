const userLogin = JSON.parse(sessionStorage.getItem("userLog")) || "";

if (!userLogin) {
  location.href = "../index.html";
} else {
  if (
    userLogin.role === "admin" &&
    location.pathname === "/pages/user-page.html"
  ) {
    location.href = "../pages/admin-page.html";
  } else if (
    userLogin.role === "user" &&
    location.pathname === "/pages/admin-page.html"
  ) {
    location.href = "../pages/user-page.html";
  }
}
