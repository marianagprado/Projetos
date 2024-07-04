function initializeMap(mapContainer, latitude, longitude) {
  const oldMap = mapContainer.querySelector("#map");

  if (oldMap) {
    oldMap.outerHTML = "";
  }

  const newMap = document.createElement("div");
  newMap.id = "map";
  mapContainer.appendChild(newMap);
  newMap.style.display = "block";

  let map = L.map(newMap).setView([latitude, longitude], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(`<b>Localização da Atração</b>`)
    .openPopup();
}

function showMapForAttraction(latitude, longitude) {
  let mapContainers = document.getElementsByClassName("mapa");
  Array.from(mapContainers).forEach(mapContainer => {
    mapContainer.addEventListener('click', function() {
      initializeMap(mapContainer, latitude, longitude);
    });
  });
}
