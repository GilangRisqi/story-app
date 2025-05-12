import StoryAPI from "../data/api";
import Swal from "sweetalert2";
import L from "leaflet";
import MapHelper from "../utils/map-helper";

class DetailStoryPresenter {
  #view = null;
  #map = null;

  constructor(view) {
    this.#view = view;
  }

  async getStoryDetail(id) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await StoryAPI.getStoryById(id, token);
      if (response.error) {
        throw new Error(response.message);
      }

      return response.story;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Memuat Cerita",
        text: error.message,
      });

      if (error.message === "Token not found") {
        window.location.hash = "#/login";
      }
      throw error;
    }
  }

  initMap(container) {
    this.#map = MapHelper.initMap(container, false);
  }

  setMapView(lat, lon) {
    if (this.#map) {
      this.#map.setView([lat, lon], 13);
    }
  }

  addMarker(lat, lon, popupContent) {
    if (this.#map) {
      MapHelper.addMarker(this.#map, lat, lon, popupContent);
    }
  }

  destroyMap() {
    if (this.#map) {
      this.#map.remove();
      this.#map = null;
    }
  }
}

export default DetailStoryPresenter;
