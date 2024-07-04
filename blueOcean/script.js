function Year() {
  const currentYear = new Date().getFullYear();
  const year = document.getElementById("currentYear");
  year.innerText = currentYear;
}
Year();

const collapseExample = document.getElementById("collapseExample");
const collapseExample2 = document.getElementById("collapseExample2");
const buttonFast = document.getElementById("button-fast");
const buttonDetail = document.getElementById("button-detail");

function selectFastSearch() {
  collapseExample.classList.remove("hidden");
  collapseExample2.classList.add("hidden");
  buttonFast.classList.add("active-button");
  buttonDetail.classList.remove("active-button");
}

function selectDetailSearch() {
  collapseExample2.classList.remove("hidden");
  collapseExample.classList.add("hidden");
  buttonDetail.classList.add("active-button");
  buttonFast.classList.remove("active-button");
}

const attractions = [
  {
    titulo: "Cânion do Guartelá",
    descricao:
      "Quedas d'água, corredeiras, mirantes e trilhas tornam o passeio no cânion do Parque do Guartelá imperdível. Localizado na parte centro-oeste do Paraná, próximo à cidade de Ponta Grossa, o cânion do Guartelá é o sexto maior do mundo, de acordo com o Instituto Água e Terra (IAT).Na atração paranaense, é possível contemplar a linda paisagem, conhecer espécies da fauna e flora local, banhar-se em águas naturais e ver até mesmo pinturas rupestres feitas há cerca de 7 mil anos.",
    tipo_de_atracao: "Cânion",
    localizacao: "Tibagi - PR",
    horario_de_funcionamento:
      "De quarta-feira a segunda-feira, das 08h às 16h.",
    imagem: "assets/canyon-guartela.jpg",
    latitude: -24.54944,
    longitude: -50.26944,
  },
  {
    titulo: "Fernando de Noronha",
    descricao:
      "Fernando de Noronha pertence ao estado de Pernambuco. O arquipélago é formado por 21 ilhas ou ilhotas, com área total de 26 km². A ilha principal, a única habitada, possui 17 km² e a segunda menor BR do Brasil, com apenas 7 km de extensão. Patrimônio Mundial Natural, Noronha é um santuário ecológico que abriga centenas de espécies de fauna e flora protegidas sob o Parque Nacional Marinho, que regula sua visitação, projetos de educação ambiental e pesquisas científicas. São 16 praias paradisíacas, onde golfinhos, tartarugas marinhas, tubarões, raias e cardumes de peixes coloridos são encontrados com frequência.",
    tipo_de_atracao: "Ilha",
    localizacao: "Fernando de Noronha - PE",
    horario_de_funcionamento: "Dependendo da atração, em geral das 8h às 18h.",
    imagem: "assets/Fernando-de-Noronha.jpg",
    latitude: -3.8431,
    longitude: -32.4377,
  },
  {
    titulo: "Lençóis Maranhenses",
    descricao:
      "O Parque Nacional dos Lençóis Maranhenses é uma área protegida na costa atlântica norte do Brasil. É conhecido pela sua vasta paisagem desértica de grandes dunas de areia branca e pelas lagoas sazonais de água da chuva. A Lagoa Azul e a Lagoa Bonita são duas das maiores lagoas. O ecossistema diversificado do parque inclui pântanos de mangais. As cidades vizinhas de Barreirinhas e Santo Amaro do Maranhão servem de porta de entrada para o parque.",
    tipo_de_atracao: "Duna/Lagoa",
    localizacao: "Barreirinhas - MA",
    horario_de_funcionamento: "De segunda a segunda, das 08:00 às 18:00.",
    imagem: "assets/lencois-maranhenses-lagoas.jpg",
    latitude: -2.5384,
    longitude: -43.1186,
  },
  {
    titulo: "Gruta da Lagoa Azul",
    descricao:
      "A Gruta da Lagoa Azul é um destaque pois a coloração no fundo do seu lago é muito intensa e transparente, devido a ação de minerais somado a incidência do sol que bate no interior da gruta. Em razão disso, as melhores épocas para visitar a gruta são entre entre setembro e fevereiro, nas quais a iluminação solar é maior.",
    tipo_de_atracao: "Gruta",
    localizacao: "Bonito - MS",
    horario_de_funcionamento: "De segunda a segunda, das 07:00 às 14:00.",
    imagem: "assets/gruta_do_lago_azul.png",
    latitude: -14.588,
    longitude: -55.96675,
  },
  {
    titulo: "Ilha de Boipeba",
    descricao:
      "A Ilha de Boipeba é o típico destino de praia para quem busca dias de sossego e descanso de frente para o mar. Na ilha não há grandes obrigações turísticas a cumprir e a pedida será mesmo ir à praia. Quem está em Boipeba poderá chegar às lindas porções de areia – muitas delas desertas – fazendo caminhadas à beira-mar, por dentro de fazendas de coqueiros, percorrendo manguezais ou em passeios de lancha e barco pela ilha.",
    tipo_de_atracao: "Ilha",
    localizacao: "Cairu - BA",
    horario_de_funcionamento:
      "Acesso via lancha, a primeira sai às 10:00 e a última entre 16:00 e 18:00",
    imagem: "assets/ilha_Boipeba.jpg",
    latitude: -13.6239,
    longitude: -38.9448,
  },
  {
    titulo: "Caverna do Diabo",
    descricao:
      "Quem nunca esteve dentro de uma caverna vai se surpreender com as as colunas e espeleotemas (nome dado a determinadas formações rochosas encontradas nesse ambiente). A Caverna do Diabo está localizada no Parque Estadual do Diabo, na cidade de Eldorado, no interior de São Paulo. Outras atrações do local incluem também mirantes, cachoeiras e até um circuito por comunidades quilombolas, como informa o site oficial do parque.",
    tipo_de_atracao: "Caverna",
    localizacao: "Eldorado - SP",
    horario_de_funcionamento: "De terça a domingo das 08:00 as 17:00",
    imagem: "assets/caverna-do-diabo.jpg",
    latitude: -24.635695,
    longitude: -48.403618,
  },
  {
    titulo: "Cânion do Itaibezinho",
    descricao:
      "É o mais famoso canyon do Parque Nacional dos Aparados da Serra, com 5,8 km de extensão, 720 metros de profundidade e 200 metros de largura.  Caracteriza-se pelos paredões rochosos verticais, acompanhados de pouca vegetação em suas escarpas. O canyon é cortado pelos rios Perdizes e Preá, que formam o Rio do Boi. Fica a apenas 80 metros do Centro de Visitantes do parque e pode ser avistado durante as trilhas do Vértice e do Mirante do Cotovelo – considerada a vista clássica desse canyon, de onde é possível ter noção da grandiosidade da paisagem local. Lá de cima pode-se contemplar uma imensidão que parece não ter fim. Um passeio inesquecível.",
    tipo_de_atracao: "Cânion",
    localizacao: "Praia Grande - SC",
    horario_de_funcionamento: "Diariamente das 8h às 17h",
    imagem: "assets/canion_itaimbezinho.jpg",
    latitude: -29.18104,
    longitude: -50.085307,
  },
];
