function setupDistanceCalculation() {
  const distanceElements = document.querySelectorAll('[data-lat][data-lng]');
  
  distanceElements.forEach(distanceElement => {
    const attractionCoords = {
      latitude: parseFloat(distanceElement.getAttribute('data-lat')),
      longitude: parseFloat(distanceElement.getAttribute('data-lng'))
    };

    getUserLocation().then(userCoords => {
      const distance = calculateDistance(
        userCoords.latitude,
        userCoords.longitude,
        attractionCoords.latitude,
        attractionCoords.longitude
      );
      distanceElement.textContent = `${distance.toFixed(2)} km`;

      distanceElement.removeAttribute('data-lat');
      distanceElement.removeAttribute('data-lng');
    }).catch(error => {
      distanceElement.textContent = 'Erro ao obter a localização do usuário.';
    });
  });
}

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, reject);
    } else {
      reject(new Error('Geolocalização não é suportada pelo navegador.'));
    }
  });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(Value) {
  return Value * Math.PI / 180;
}

document.addEventListener('DOMContentLoaded', setupDistanceCalculation);
