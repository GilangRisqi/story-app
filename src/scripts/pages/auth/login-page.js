import LoginPresenter from "../../presenters/login-presenter";

class LoginPage {
  #presenter = null;

  constructor() {
    this.#presenter = new LoginPresenter(this);
  }

  async render() {
    return `
      <section id="main-content" class="auth">
        <h1 class="auth__title">Login</h1>
        
        <form class="auth__form" id="loginForm">
          <div class="form-group">
            <label for="email">
              <i class="fas fa-envelope"></i> Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              autocomplete="email"
            >
          </div>

          <div class="form-group">
            <label for="password">
              <i class="fas fa-lock"></i> Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required
              autocomplete="current-password"
            >
          </div>

          <div class="spinner"></div>
          
          <button type="submit" class="submit-button">
            <i class="fas fa-sign-in-alt"></i> Login
          </button>
        </form>

        <p class="auth__link">
          Belum punya akun? <a href="#/register">Register</a>
        </p>
      </section>
    `;
  }

  async afterRender() {
    const form = document.querySelector("#loginForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      form.classList.add("loading");

      const formData = new FormData(form);
      await this.#presenter.login(formData);

      form.classList.remove("loading");
    });
  }
}

export default LoginPage;
