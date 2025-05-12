import auth from "../utils/middleware";

class Navbar {
  static init() {
    this._updateNavigation();
    window.addEventListener("hashchange", () => {
      this._updateNavigation();
    });
  }

  static _updateNavigation() {
    const navList = document.getElementById("nav-list");
    const isLoggedIn = auth.checkLoggedIn();

    navList.innerHTML = `
      <ul class="nav-list">
      ${
        isLoggedIn
          ? `
        <li><a href="#/stories"><i class="fas fa-book"></i> Cerita</a></li>
        <li><a href="#/stories/add"><i class="fas fa-plus"></i> Tambah Cerita</a></li>
        <li><a href="#/about"><i class="fas fa-info-circle"></i> Tentang</a></li>
        <li><a href="#" id="logoutButton"><i class="fas fa-sign-out-alt"></i> Keluar</a></li>
      `
          : `
        <li><a href="#/login"><i class="fas fa-sign-in-alt"></i> Login</a></li>
        <li><a href="#/register"><i class="fas fa-user-plus"></i> Register</a></li>
        <li><a href="#/about"><i class="fas fa-info-circle"></i> Tentang</a></li>
      `
      }
      </ul>
    `;

    if (isLoggedIn) {
      const logoutButton = document.getElementById("logoutButton");
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.hash = "#/login";
      });
    }
  }
}

export default Navbar;
