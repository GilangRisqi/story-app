export default class HomePage {
  async render() {
    return `

      <section id="main-content" class="container">
        <div class="home-content">
          <h1 class="home-title">Selamat Datang di Story App</h1>
          
          <div class="home-description">
            <p>Story App adalah platform untuk berbagi cerita dan momen spesial Anda dengan pengguna lainnya.</p>
            <div class="feature-list">
              <h2>Fitur Utama:</h2>
              <ul>
                <li><i class="fas fa-camera"></i> Ambil foto langsung dari kamera atau upload dari galeri</li>
                <li><i class="fas fa-map-marker-alt"></i> Tandai lokasi cerita Anda di peta</li>
                <li><i class="fas fa-book"></i> Lihat cerita dari pengguna lain</li>
                <li><i class="fas fa-share-alt"></i> Bagikan momen spesial Anda</li>
              </ul>
            </div>

            <div class="cta-container">
              <a href="#/stories" class="cta-button">
                <i class="fas fa-book"></i> Lihat Cerita
              </a>
              <a href="#/stories/add" class="cta-button cta-button--primary">
                <i class="fas fa-plus"></i> Tambah Cerita
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Implementasi tambahan jika diperlukan
  }
}
