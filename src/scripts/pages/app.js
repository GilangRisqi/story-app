import { matchRoute } from "../routes/routes";
import { getActivePathname } from "../routes/url-parser";
import auth from "../utils/middleware";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #currentPage = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  async renderPage() {
    // Clean up previous page if it exists
    if (this.#currentPage && this.#currentPage.destroy) {
      await this.#currentPage.destroy();
    }

    const path = getActivePathname();

    // Check authentication
    if (!auth.requireAuth(path)) {
      return;
    }

    this.#currentPage = matchRoute(path);

    if (!this.#currentPage) {
      this.#content.innerHTML =
        '<div class="error-message">Halaman tidak ditemukan</div>';
      return;
    }

    // Use View Transition API if supported
    if (document.startViewTransition) {
      const transition = document.startViewTransition(async () => {
        this.#content.innerHTML = await this.#currentPage.render();
        await this.#currentPage.afterRender();
      });

      try {
        await transition.finished;
      } catch (error) {
        console.error("View transition failed:", error);
      }
    } else {
      // Fallback for browsers that don't support View Transition API
      this.#content.innerHTML = await this.#currentPage.render();
      await this.#currentPage.afterRender();
    }
  }
}

export default App;
