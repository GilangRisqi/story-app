import StoryAPI from "../data/api";
import Swal from "sweetalert2";

class StoriesPresenter {
  #view = null;
  #currentPage = 1;
  #pageSize = 10;

  constructor(view) {
    this.#view = view;
  }

  getCurrentPage() {
    return this.#currentPage;
  }

  async loadStories(page = 1) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      this.#currentPage = page;
      const response = await StoryAPI.getStories(token, {
        page: this.#currentPage,
        size: this.#pageSize,
      });

      if (response.error) {
        throw new Error(response.message);
      }

      return {
        stories: response.listStory,
        hasMore: response.listStory.length >= this.#pageSize,
        currentPage: this.#currentPage,
      };
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Memuat Cerita",
        text: error.message,
      });

      if (error.message === "Token not found") {
        window.location.hash = "#/login";
      }
      return null;
    }
  }
}

export default StoriesPresenter;
