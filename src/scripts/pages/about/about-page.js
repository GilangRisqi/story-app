export default class AboutPage {
  async render() {
    return `

      <section id="main-content" class="about">
        <div class="about-content" role="main">
          <h1 class="about-title">
            <i class="fas fa-info-circle" aria-hidden="true"></i> 
            Tentang Story App
          </h1>

          <div class="about-description">
            <p>Story App adalah platform berbagi cerita yang dikembangkan sebagai bagian dari pembelajaran di kelas Belajar Pengembangan Web Intermediate. Aplikasi ini memungkinkan pengguna untuk berbagi momen spesial mereka dalam bentuk cerita dan foto.</p>
            
            <div class="about-features">
              <h2>Fitur Utama:</h2>
              <ul>
                <li>
                  <i class="fas fa-user" aria-hidden="true"></i>
                  <div>
                    <h3>Manajemen Akun</h3>
                    <p>Daftar dan login untuk mengakses fitur lengkap aplikasi</p>
                  </div>
                </li>
                <li>
                  <i class="fas fa-camera" aria-hidden="true"></i>
                  <div>
                    <h3>Unggah Foto</h3>
                    <p>Ambil foto langsung dari kamera atau pilih dari galeri</p>
                  </div>
                </li>
                <li>
                  <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                  <div>
                    <h3>Tandai Lokasi</h3>
                    <p>Tambahkan lokasi pada setiap cerita yang dibagikan</p>
                  </div>
                </li>
                <li>
                  <i class="fas fa-globe" aria-hidden="true"></i>
                  <div>
                    <h3>Jelajahi Cerita</h3>
                    <p>Lihat dan baca cerita dari pengguna lain</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="about-tech">
              <h2>Teknologi yang Digunakan:</h2>
              <ul>
                <li><i class="fab fa-js" aria-hidden="true"></i> JavaScript</li>
                <li><i class="fa-solid fa-globe"></i> Webpack</li>
                <li><i class="fas fa-map" aria-hidden="true"></i> Leaflet Maps</li>
              </ul>
            </div>
            
            <div class="about-credits">
              <h2>Dikembangkan Oleh:</h2>
              <p>
                <i class="fas fa-user-circle" aria-hidden="true"></i>
                Gilang Risqi Pratama
              </p>
              <p class="credits-note">
                Sebagai bagian dari submission kelas Belajar Pengembangan Web Intermediate Dicoding Indonesia
              </p>
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
