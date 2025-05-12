import StoryAPI from "../data/api";
import Swal from "sweetalert2";

class AddStoryPresenter {
  #view = null;
  #stream = null;
  #selectedLocation = null;

  constructor(view) {
    this.#view = view;
  }

  async addStory(description, photo) {
    try {
      // Validate all required fields
      if (!this._validateAllFields(description, photo)) {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      // Ensure photo is a valid File object
      if (!(photo instanceof File)) {
        throw new Error(
          "Foto tidak valid. Silakan ambil ulang foto atau pilih file lain."
        );
      }

      const data = {
        description,
        photo,
      };

      if (this.#selectedLocation) {
        data.lat = this.#selectedLocation.lat;
        data.lon = this.#selectedLocation.lng;
      }

      // Add loading indicator
      const loadingIndicator = Swal.fire({
        title: "Sedang mengunggah...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await StoryAPI.addStory(data, token);

      // Close loading indicator
      loadingIndicator.close();

      if (response.error) {
        throw new Error(response.message);
      }

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Cerita berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });

      window.location.hash = "#/stories";
    } catch (error) {
      console.error("Error adding story:", error);

      await Swal.fire({
        icon: "error",
        title: "Gagal Menambahkan Cerita",
        text: error.message,
      });

      if (error.message === "Token not found") {
        window.location.hash = "#/login";
      }
    }
  }

  _validateAllFields(description, photo) {
    const missingFields = [];

    if (!description || description.trim().length === 0) {
      missingFields.push("cerita");
    }

    if (!photo) {
      missingFields.push("foto");
    }

    if (!this.#selectedLocation) {
      missingFields.push("lokasi");
    }

    if (missingFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: `Mohon lengkapi ${missingFields.join(", ")} Anda`,
      });
      return false;
    }

    return true;
  }

  async startCamera() {
    try {
      // Stop any existing stream first
      await this.stopCamera();

      this.#stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });
      return this.#stream;
    } catch (error) {
      console.error("Camera access error:", error);
      throw new Error("Tidak dapat mengakses kamera");
    }
  }

  async stopCamera() {
    if (this.#stream) {
      // Stop all tracks in the stream
      const tracks = this.#stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.#stream = null;
      return true;
    }
    return false;
  }

  validateImage(file) {
    // Check if file exists
    if (!file) {
      throw new Error("File tidak ditemukan");
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File harus berupa gambar");
    }

    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      throw new Error("Ukuran file tidak boleh lebih dari 1MB");
    }

    return true;
  }

  setSelectedLocation(location) {
    this.#selectedLocation = location;
  }

  getSelectedLocation() {
    return this.#selectedLocation;
  }
}

export default AddStoryPresenter;
