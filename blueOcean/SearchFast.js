function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function insertError(searchInput, invalid) {
  invalid.innerHTML = "O campo deve ter ao menos 3 caracteres";
  invalid.classList.remove("hidden");
  searchInput.classList.add("input-error");
}

function SearchFast(isFastSearch) {
  let searchInput = document.getElementById("search-fast");
  let query = searchInput.value.toLowerCase();
  let invalid = document.getElementById("invalid-fast");
  if (isFastSearch) {
    if (query.length < 3) {
      return insertError(searchInput, invalid);
    }
    invalid.classList.add("hidden");
  } else {
    searchInput = document.getElementById("search-detail");
    query = searchInput.value.toLowerCase();
    invalid = document.getElementById("invalid-detail");
    if (query.length !== 0 && query.length < 3) {
      return insertError(searchInput, invalid);
    }
    invalid.classList.add("hidden");
  }
  searchInput.classList.remove("input-error");
  const queryNormalized = removeAccents(query);
  const results = attractions.filter((attraction) =>
    removeAccents(attraction.titulo.toLowerCase()).includes(queryNormalized)
  );

  if (isFastSearch) {
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
    } else {
      results.forEach((attraction) => {
        const attractionDiv = document.createElement("div");
        attractionDiv.className = "attractions";

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

        resultsDiv.appendChild(attractionDiv);
      });
      setupDistanceCalculation();
    }
  }

  return results; // Retornando os resultados
}
