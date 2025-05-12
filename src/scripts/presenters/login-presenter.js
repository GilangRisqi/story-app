import StoryAPI from "../data/api";
import Swal from "sweetalert2";

class LoginPresenter {
  #view = null;

  constructor(view) {
    this.#view = view;
  }

  async login(formData) {
    try {
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response = await StoryAPI.login(data);

      if (response.error) {
        throw new Error(response.message);
      }

      // Save token to localStorage
      localStorage.setItem("token", response.loginResult.token);

      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Anda akan diarahkan ke halaman utama",
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect to home page
      window.location.hash = "#/";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.message,
      });
    }
  }
}

export default LoginPresenter;
