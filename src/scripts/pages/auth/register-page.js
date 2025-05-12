import RegisterPresenter from "../../presenters/register-presenter";

class RegisterPage {
  #presenter = null;

  constructor() {
    this.#presenter = new RegisterPresenter(this);
  }

  async render() {
    return `
      <section id="main-content" class="auth">
        <h1 class="auth__title"><i class="fas fa-user-plus"></i> Register</h1>
        
        <form id="registerForm" class="auth__form">
          <div class="form-group">
            <label for="name"><i class="fas fa-user"></i> Nama</label>
            <input type="text" id="name" name="name" required>
          </div>

          <div class="form-group">
            <label for="email"><i class="fas fa-envelope"></i> Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="password"><i class="fas fa-lock"></i> Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              minlength="8"
              pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
              title="Password harus terdiri dari minimal 8 karakter dan mengandung huruf dan angka"
            >
            <small class="form-help"><i class="fas fa-info-circle"></i> Minimal 8 karakter, harus mengandung huruf dan angka</small>
          </div>
          
          <button type="submit" class="submit-button"><i class="fas fa-user-plus"></i> Daftar</button>
          
          <p class="auth__link">
            <i class="fas fa-sign-in-alt"></i> Sudah punya akun? <a href="#/login">Login di sini</a>
          </p>
        </form>
      </section>
    `;
  }

  async afterRender() {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(registerForm);
      await this.#presenter.register(formData);
    });
  }
}

export default RegisterPage;
