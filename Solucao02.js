function initAnimaNumeros() {
  function animaNumeros() {
    const numeros = document.querySelectorAll('[data-numero]');

    numeros.forEach((numero) => {
      const total = +numero.innerText;
      // Incremento equivalente
      const incremento = total / 100;
      let start = 0;
      const timer = setInterval(() => {
        start = Math.floor(start + incremento);
        numero.innerText = start;
        if (start > total) {
          numero.innerText = total;
          clearInterval(timer);
        }
        // Velocidade dos números
      }, 15 * Math.random());
    });
  }

  // O observador vai olhar para os elementos na sua tela e suas mutações
  // nesse caso a gente quer ver sempre que um elemento tenha a classe "ativo"
  // pois ele adquire essa classe quando passa na tela do usuário

  // Função para mutação
  function handleMutation(mutation) {
    if (mutation[0].target.classList.contains('ativo')) {
      // Para de observar
      observer.disconnect();

      animaNumeros();
    }
  }

  // Elemento DOM para ser observado
  const observeTarget = document.querySelector('.numeros');
  // Inicia o observador
  const observer = new MutationObserver(handleMutation);
  // "Locka" o elemento que será observado e observa os atributos dele
  observer.observe(observeTarget, { attributes: true });

  // Ativando imediatemente (apenas para teste)
  observeTarget.classList.add('ativo');
}

async function fetchAnimais(url) {
  const animaisResponse = await fetch(url);
  const animaisJson = await animaisResponse.json();
  const numerosGrid = document.querySelector('.numeros-grid');

  animaisJson.forEach((animal) => {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  });

  // Inicia a função depois do DOM ser carregado
  initAnimaNumeros();
}

function createAnimal(animal) {
  const div = document.createElement('div');
  div.classList.add('numero-animal');
  div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
  return div;
}

fetchAnimais('./animaisapi.json');
