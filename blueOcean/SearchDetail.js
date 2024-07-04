function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function SearchDetail() {
  const search = document
    .getElementById("search-detail")
    .value.toLowerCase()
    .trim();
  const preference = document
    .getElementById("preference")
    .value.toLowerCase()
    .trim();
  const selectState = document.getElementById("states").value.toLowerCase();
  const selectCities = document.getElementById("cities").value.toLowerCase();
  const invalidDetail = document.getElementById("invalid-detail");

  if (
    search.length === 0 &&
    preference.length === 0 &&
    selectCities.length === 0 &&
    selectState.length === 0
  ) {
    invalidDetail.innerHTML = "Ao menos um campo deve ser preenchido";
    invalidDetail.classList.remove("hidden");
    return;
  }

  invalidDetail.classList.add("hidden");

  let results;
  const searchInput = document.getElementById("search-detail");
  results = SearchFast(false);

  results = results
    ? results.filter((attraction) => {
        const stateCity = attraction.localizacao.toLowerCase().split(" - ");
        const cityNormalized = removeAccents(stateCity[0]);
        const stateNormalized = removeAccents(stateCity[1]);
        const attractionNormalized = removeAccents(
          attraction.tipo_de_atracao.toLowerCase()
        );

        const matchState =
          selectState === "" || stateNormalized === selectState;
        const matchCity =
          selectCities === "" || cityNormalized === selectCities;
        const matchPreference =
          preference === "" ||
          preference === "preferência" ||
          attractionNormalized.includes(removeAccents(preference));

        return matchState && matchCity && matchPreference;
      })
    : null;

  if (!results) return;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML =
    '<h2 class="title-result"><strong>Resultados</strong></h2>';

  if (results.length === 0) {
    resultsDiv.innerHTML = `
          <div class="return-notfound"> 
              <img src="assets/folder_off.svg" alt="folder-off" width="45" class="img-notfound">
              <h5>Não foram encontrados resultados para essa pesquisa</h5>
              <p>Tente outra localização.</p>
          </div>`;
    return;
  }

  results.forEach((attraction) => {
    const attractionDiv = document.createElement("div");
    attractionDiv.className = "attractions";

    // attractionDiv.innerHTML = `
    //   <div class="context">
    //     <div col-12 col-sm-6>
    //       <h4>${attraction.titulo}</h4>
    //       <img src="${attraction.imagem}" alt="${attraction.titulo}" class="img-return">
    //     </div>
    //     <div col-12 col-sm-6 class="p">
    //       <p class="descricao">${attraction.descricao}</p>
    //       <p><strong>Tipo de Atração:</strong> ${attraction.tipo_de_atracao}</p>
    //       <p><strong>Localização:</strong> ${attraction.localizacao}</p>
    //       <p><strong>Horário de Funcionamento:</strong> ${attraction.horario_de_funcionamento}</p>
    //     </div>
    //   </div>
    //   <hr>
    // `;

    // attractionDiv.innerHTML = `
    //   <div class="option2">
    //     <h4>${attraction.titulo}</h4>
    //     <p class="descricao">${attraction.descricao}</p>
    //     <p><strong>Tipo de Atração:</strong> ${attraction.tipo_de_atracao}</p>
    //     <p><strong>Localização:</strong> ${attraction.localizacao}</p>
    //     <p><strong>Horário de Funcionamento:</strong> ${attraction.horario_de_funcionamento}</p>
    //     <hr />
    //   </div>
    // `;

    attractionDiv.innerHTML = `
          <div class="option3">
            <div col-12 col-sm-6 class="p">
            <h4>${attraction.titulo}</h4>
            <p class="descricao">
              ${attraction.descricao}
            </p>
            <p><strong>Tipo de Atração:</strong> ${attraction.tipo_de_atracao}</p>
            <p><strong>Localização:</strong> ${attraction.localizacao}</p>
            <p>
              <strong>Horário de Funcionamento:</strong> ${attraction.horario_de_funcionamento}
            </p>
            <div class="mapa">
              <div class="location">
                <button onclick="showMapForAttraction(${attraction.latitude}, ${attraction.longitude})" class="showMapButton button-map">
                <img src="assets/location.svg" /> Mapa
                </button>
                <p class="distance">Distância até a atração: <span id="distance" data-lat="${attraction.latitude}" data-lng="${attraction.longitude}">Calculando...</span></p>
              </div>  
            </div>
          </div>
          <div col-12 col-sm-6>
            <img src="${attraction.imagem}" alt="${attraction.titulo}" class="img-return">
          </div>
        </div>
        <hr>
        `;

    resultsDiv.appendChild(attractionDiv);
  });
  setupDistanceCalculation();
}

document.addEventListener("DOMContentLoaded", function () {
  getStates();
});
