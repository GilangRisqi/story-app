const auth = {
  checkLoggedIn() {
    return !!localStorage.getItem("token");
  },

  requireAuth(path) {
    const publicPaths = ["/login", "/register", "/about"];
    const isPublicPath = publicPaths.some((publicPath) => path === publicPath);

    if (!this.checkLoggedIn() && !isPublicPath) {
      window.location.hash = "#/login";
      return false;
    }

    if (this.checkLoggedIn() && (path === "/login" || path === "/register")) {
      window.location.hash = "#/stories";
      return false;
    }

    return true;
  },
};

export default auth;
