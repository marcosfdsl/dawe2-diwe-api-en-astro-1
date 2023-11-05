const pokemonSeleccionado = document.getElementById("pokemon-seleccionado");
const pokemonInfo = document.getElementById("pokemon-info");

// Función para cargar los nombres de los Pokémon disponibles en el menú desplegable.
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

        // Escuchar el evento de cambio en el menú desplegable para mostrar la información del Pokémon seleccionado.
        pokemonSeleccionado.addEventListener("change", () => {
            const selectedPokemon = pokemonSeleccionado.value;
            cargarInfo(selectedPokemon);
        });
    } catch (error) {
        console.error("Error al cargar los nombres de los Pokémon: " + error);
    }
}

// Función para cargar y mostrar la información de un Pokémon específico.
async function cargarInfo(nombre) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const data = await response.json();

        // Crear una representación de la información del Pokémon a mostrar.
        const pokemonHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Altura: ${data.height} dm</p>
            <p>Peso: ${data.weight} hg</p>
        `;

        pokemonInfo.innerHTML = pokemonHTML;
    } catch (error) {
        console.error("Error al cargar la información del Pokémon: " + error);
    }
}

// Cargar los nombres de los Pokémon disponibles al cargar la página.
cargarPokemons();


// ----------------------------------------------------------------------------


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

// VISIBILIDAD FONDO2 SEGÚN ORIGEN Y DESTINO
const fondo1 = document.querySelector('.fondo2');
const fondo2 = document.querySelector('.fondo2');
const fondo3 = document.querySelector('.fondo3');
const contenedorfondos = document.querySelector('.contenedorfondos');

// A Home
document.getElementById('btnhome').addEventListener('click', function () {
    let scrollPosition = document.querySelector('.contenedorfondos').scrollTop;
    let scrollHeight = contenedorfondos.scrollHeight;
    // Cuando se quiere ir a fondo1 desde fondo2, si el scrollPosition es aprox un tercio del scrollHeight de contenedorfondos, fondo2 se hace visible
    if (scrollPosition >= scrollHeight / 3.5 && scrollPosition <= scrollHeight / 2.5) {
        fondo2.style.display = 'flex';
    }
    // En caso contrario fondo2 se hace invisible y vuelve a ser visible a los 500ms
    else {
        fondo2.style.display = 'none';
        setTimeout(function () {
            fondo2.style.display = 'flex';
        }, 500);
    }
});

// A About
document.getElementById('btnabout').addEventListener('click', function () {
    // fondo2 se hace visible
    fondo2.style.display = 'flex';
});

// A Help
document.getElementById('btnhelp').addEventListener('click', function () {
    let scrollPosition = document.querySelector('.contenedorfondos').scrollTop;
    let scrollHeight = contenedorfondos.scrollHeight;
    // Cuando se quiere ir a fondo3 desde fondo1 (scrollPosition 0), fondo2 se hace invisible y vuelve a ser visible a los 500ms
    if (scrollPosition == 0) {
        fondo2.style.display = 'none';
        setTimeout(function () {
            fondo2.style.display = 'flex';
        }, 500);
    }
    // En caso contrario fondo2 se hace visible
    else {
        fondo2.style.display = 'flex';
    }

});

// Botones de navegación entre fondos
const actions = {
    "#btnhome": document.querySelector('.fondo1').offsetTop,
    "#btnabout": document.querySelector('.fondo2').offsetTop,
    "#btnhelp": document.querySelector('.fondo3').offsetTop
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
    const buttonIDs = ['btnhome', 'btnabout', 'btnhelp'];
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
            document.getElementById("btnhelp").classList.remove("subrayado");
            // Reinicia scrolls
            infocv.scrollTo(0, 0);
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
            document.getElementById("btnhelp").classList.remove("subrayado");
        }
        // Si se está en fondo3
        else if (estaCerca(document.querySelector('.fondo3'))) {
            // Deshabilita botones hasta completar scroll
            buttonIDs.forEach(id => {
                const button = document.getElementById(id);
                if (button) button.removeAttribute('disabled');
            });
            // Subraya Help
            document.getElementById("btnhome").classList.remove("subrayado");
            document.getElementById("btnabout").classList.remove("subrayado");
            document.getElementById("btnhelp").classList.add("subrayado");
            // Reinicia scrolls
            infocv.scrollTo(0, 0);
        }
    }, 10);
});