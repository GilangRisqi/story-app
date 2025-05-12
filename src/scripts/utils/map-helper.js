import L from "leaflet";
import "leaflet/dist/leaflet.css";

class MapHelper {
  static #defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  static initMap(container, isInteractive = false) {
    const map = L.map(container, {
      dragging: true,
      touchZoom: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      tap: true,
    }).setView([-2.548926, 118.014863], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (isInteractive) {
      // Add click handler for location selection only if map is interactive
      map.on("click", (e) => {
        // Clear existing markers
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        // Add new marker
        const lat = e.latlng.lat.toFixed(6);
        const lng = e.latlng.lng.toFixed(6);
        const marker = L.marker(e.latlng, { icon: this.#defaultIcon })
          .addTo(map)
          .bindPopup(`Selected Location: ${lat}, ${lng}`)
          .openPopup();

        // Dispatch custom event for location selection
        const event = new CustomEvent("locationselected", {
          detail: { lat: e.latlng.lat, lng: e.latlng.lng },
        });
        container.dispatchEvent(event);
      });
    }

    return map;
  }

  static addMarker(map, lat, lon, popupContent) {
    return L.marker([lat, lon], { icon: this.#defaultIcon })
      .bindPopup(popupContent)
      .addTo(map);
  }
}

export default MapHelper;
