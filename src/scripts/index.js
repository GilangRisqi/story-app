// CSS imports
import "../styles/styles.css";

import App from "./pages/app";
import Navbar from "./components/navbar";

document.addEventListener("DOMContentLoaded", async () => {
  const skipLinkContainer = document.createElement("div");
  skipLinkContainer.className = "skip-link";

  const skipLink = document.createElement("a");
  skipLink.className = "skip-to-content";
  skipLink.textContent = "Lewati ke konten utama";
  skipLink.href = "#";

  skipLink.addEventListener("click", (e) => {
    e.preventDefault();
    const mainContent = document.querySelector("#main-content");
    if (mainContent) {
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
    }
  });

  skipLinkContainer.appendChild(skipLink);
  document.body.insertBefore(skipLinkContainer, document.body.firstChild);

  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  // Initialize navigation
  Navbar.init();

  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
