import cookies from "next-cookies";

// untuk halaman login/public route
export function unauthPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (allCookies.token) {
      return context.res
        .writeHead(302, {
          Location: "/",
        })
        .end();
    }
    return resolve("unauthorized");
  });
}

// untuk halaman setelah login/private route
export function authPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (!allCookies.token) {
      return context.res
        .writeHead(302, {
          Location: "/login",
        })
        .end();
    }
    return resolve({
      token: allCookies.token,
      user: allCookies.user,
    });
  });
}
