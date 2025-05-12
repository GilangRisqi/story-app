import StoriesPresenter from "../../presenters/stories-presenter";
import { showFormattedDate } from "../../utils";
import MapHelper from "../../utils/map-helper";

class StoriesPage {
  #presenter = null;
  #map = null;
  #markers = [];

  constructor() {
    this.#presenter = new StoriesPresenter(this);
  }

  async render() {
    return `
      
      
      <section id="main-content" class="stories container">
        <h1 class="stories__title">Cerita Terbaru</h1>
        
        <div id="stories" class="stories__list"></div>
        
        <div class="stories__pagination">
          <button id="prevPage" class="pagination-button"><i class="fas fa-chevron-left"></i> Sebelumnya</button>
          <span id="pageInfo" class="pagination-info">Halaman 1</span>
          <button id="nextPage" class="pagination-button">Selanjutnya <i class="fas fa-chevron-right"></i></button>
        </div>
        
        <div id="map" class="stories__map"></div>
        
        <a href="#/stories/add" class="floating-button" aria-label="Tambah cerita baru">
          <i class="fas fa-plus"></i>
        </a>
      </section>
    `;
  }

  async afterRender() {
    const storiesContainer = document.querySelector("#stories");
    const mapContainer = document.querySelector("#map");
    const prevButton = document.querySelector("#prevPage");
    const nextButton = document.querySelector("#nextPage");
    const pageInfo = document.querySelector("#pageInfo");

    // Initialize map in non-interactive mode
    this.#map = MapHelper.initMap(mapContainer, false);

    const loadStories = async (page) => {
      try {
        const result = await this.#presenter.loadStories(page);
        if (!result) return;

        const { stories, hasMore, currentPage } = result;
        storiesContainer.innerHTML = "";

        this.#markers.forEach((marker) => marker.remove());
        this.#markers = [];

        stories.forEach((story) => {
          storiesContainer.innerHTML += this._createStoryCard(story);

          if (story.lat && story.lon) {
            const marker = MapHelper.addMarker(
              this.#map,
              story.lat,
              story.lon,
              this._createPopupContent(story)
            );
            this.#markers.push(marker);
          }
        });

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = !hasMore;
        pageInfo.textContent = `Halaman ${currentPage}`;
      } catch (error) {
        console.error(error);
        storiesContainer.innerHTML =
          '<div class="error-message">Gagal memuat cerita</div>';
      }
    };

    // Initialize first page
    await loadStories(1);

    // Handle pagination clicks
    prevButton.addEventListener("click", async () => {
      const currentPage = this.#presenter.getCurrentPage();
      if (currentPage > 1) {
        await loadStories(currentPage - 1);
      }
    });

    nextButton.addEventListener("click", async () => {
      const currentPage = this.#presenter.getCurrentPage();
      await loadStories(currentPage + 1);
    });
  }

  _createStoryCard(story) {
    return `
      <article class="story-item">
        <img src="${story.photoUrl}" alt="Foto dari ${
      story.name
    }" class="story-item__image">
        <div class="story-item__content">
          <h2 class="story-item__title">${story.name}</h2>
          <p class="story-item__description">${story.description}</p>
          <p class="story-item__date"><i class="far fa-calendar-alt"></i> ${showFormattedDate(
            story.createdAt
          )}</p>
          <a href="#/stories/${story.id}" class="read-more-button">
            Selengkapnya <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
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
    if (this.#map) {
      this.#map.remove();
      this.#map = null;
    }
  }
}

export default StoriesPage;
