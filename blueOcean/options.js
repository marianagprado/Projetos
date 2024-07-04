async function getStates() {
  try {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      const states = response.data;
      const selectStates = document.getElementById('states');

      states.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(state => {
          const option = document.createElement('option');
          option.value = state.sigla.toLowerCase();
          option.textContent = state.nome;
          selectStates.appendChild(option);
      });
  } catch (error) {
      console.error('Erro ao buscar os states:', error);
  }
}

async function getCities() {
  const selectState = document.getElementById('states').value;
  const selectCities = document.getElementById('cities');
  selectCities.innerHTML = '<option value="">Carregando...</option>';

  try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectState}/municipios`);
      const cities = response.data;
      selectCities.innerHTML = '<option value="">Selecione...</option>';

      cities.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(city => {
          const option = document.createElement('option');
          option.value = city.nome.toLowerCase();
          option.textContent = city.nome;
          selectCities.appendChild(option);
      });
  } catch (error) {
      console.error('Erro ao buscar as cidades:', error);
  }
}