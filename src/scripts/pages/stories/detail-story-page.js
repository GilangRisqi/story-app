import DetailStoryPresenter from "../../presenters/detail-story-presenter";
import { showFormattedDate } from "../../utils";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

class DetailStoryPage {
  #presenter = null;
  #defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  constructor() {
    this.#presenter = new DetailStoryPresenter(this);
  }

  async render() {
    return `
      <section id="main-content" class="detail-story">
        <a href="#/stories" class="back-button">&laquo; Kembali ke Daftar Cerita</a>
        <div id="storyContent" class="detail-story__content">
          <div class="loading">Memuat...</div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const url = window.location.hash.slice(1);
    const storyId = url.split("/")[2];
    const contentContainer = document.getElementById("storyContent");

    try {
      const story = await this.#presenter.getStoryDetail(storyId);

      contentContainer.innerHTML = `
        <h1 class="detail-story__title">${story.name}</h1>
        <p class="detail-story__date">${showFormattedDate(story.createdAt)}</p>
        
        <img 
          src="${story.photoUrl}" 
          alt="Foto dari ${story.name}" 
          class="detail-story__image"
        >
        
        <p class="detail-story__description">${story.description}</p>
        
        ${
          story.lat && story.lon
            ? `
          <div class="detail-story__map-container">
            <h2>Lokasi</h2>
            <div id="map" class="detail-story__map"></div>
          </div>
        `
            : ""
        }
      `;

      if (story.lat && story.lon) {
        const mapContainer = document.getElementById("map");
        this.#presenter.initMap(mapContainer);
        this.#presenter.setMapView(story.lat, story.lon);
        this.#presenter.addMarker(
          story.lat,
          story.lon,
          this._createPopupContent(story),
          this.#defaultIcon
        );
      }
    } catch (error) {
      contentContainer.innerHTML = `
        <div class="error-message">
          Gagal memuat cerita. ${error.message}
        </div>
      `;
    }
  }

  _createPopupContent(story) {
    return `
      <div class="popup-content">
        <h3>${story.name}</h3>
        <img src="${story.photoUrl}" alt="Foto dari ${story.name}" style="max-width: 200px;">
        <p>${story.description}</p>
      </div>
    `;
  }

  async destroy() {
    this.#presenter.destroyMap();
  }
}

export default DetailStoryPage;
