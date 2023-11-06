const pokemonSeleccionado = document.getElementById("pokemon-seleccionado");
const pokemonInfo = document.getElementById("pokemon-info");

// Función que carga la lista de pokémons
async function cargarPokemons() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        const data = await response.json();

        data.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.value = pokemon.name;
            option.text = pokemon.name;
            pokemonSeleccionado.appendChild(option);
        });

        pokemonSeleccionado.addEventListener("change", () => {
            const pokemonSeleccionado2 = pokemonSeleccionado.value;
            cargarInfo(pokemonSeleccionado2);
        });
    } catch (error) {
        console.error("Error al cargar");
    }
}

// Función que carga y muestra la información de pokemonSeleccionado
async function cargarInfo(nombre) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const data = await response.json();

        const pokemonHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Altura: ${data.height} dm</p>
            <p>Peso: ${data.weight} hg</p>
        `;

        pokemonInfo.innerHTML = pokemonHTML;
    } catch (error) {
        console.error("Error al cargar");
    }
}

cargarPokemons();

// Refresca la página al pulsar S O F O S
document.querySelector("#refrescar").addEventListener("click", () => window.location.reload());

// Dropdown oculto (menú para móvil)
const menu = document.querySelector("#menu");
const toggleMenu = (event) => {
    menu.classList.toggle("hidden");
    event.stopPropagation();
};
document.querySelector("#boton").addEventListener("click", toggleMenu);
document.addEventListener("click", () => menu.classList.add("hidden"));

// Botones de navegación entre fondos
const contenedorfondos = document.querySelector('.contenedorfondos');

const actions = {
    "#btnhome": document.querySelector('.fondo1').offsetTop,
    "#btnabout": document.querySelector('.fondo2').offsetTop
};

for (let [btn, top] of Object.entries(actions)) {
    if (document.querySelector(btn)) {
        document.querySelector(btn).addEventListener("click", e => {
            e.preventDefault();
            contenedorfondos.scrollTo({
                top: top,
                behavior: "smooth"
            });
        });
    }
}

// Mientras se hace scroll
contenedorfondos.addEventListener('scroll', function () {
    let scrollTimeout;
    clearTimeout(scrollTimeout);
    const buttonIDs = ['btnhome', 'btnabout'];
    buttonIDs.forEach(id => {
        const button = document.getElementById(id);
        if (button) button.setAttribute('disabled', 'disabled');
    });
    // Al acabar scroll
    scrollTimeout = setTimeout(function () {
        const margen = 50;
        const scrollPosition = contenedorfondos.scrollTop;
        const estaCerca = (fondo) => {
            const fondoPosition = fondo.offsetTop;
            return scrollPosition >= fondoPosition - margen && scrollPosition <= fondoPosition + margen;
        };
        // Si se está en fondo1
        if (estaCerca(document.querySelector('.fondo1'))) {
            // Deshabilita botones hasta completar scroll
            buttonIDs.forEach(id => {
                const button = document.getElementById(id);
                if (button) button.removeAttribute('disabled');
            });
            // Subraya Home
            document.getElementById("btnhome").classList.add("subrayado");
            document.getElementById("btnabout").classList.remove("subrayado");
        }
        // Si se está en fondo2
        else if (estaCerca(document.querySelector('.fondo2'))) {
            // Deshabilita botones hasta completar scroll
            buttonIDs.forEach(id => {
                const button = document.getElementById(id);
                if (button) button.removeAttribute('disabled');
            });
            // Subraya About
            document.getElementById("btnhome").classList.remove("subrayado");
            document.getElementById("btnabout").classList.add("subrayado");
        }
    }, 10);
});