import { header, paragraph, hr, image, anchor, div, button } from './common.js';

async function fetchPokemon(pokemon_name) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`)
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(error => {
            document.getElementById("pokemonData").appendChild(paragraph("Tapahtui virhe (consolessa lisätietoa)", "color: red;"));
            console.error("Virhe:", error);
        });

    return data;
}

async function showPokemon() {
    let search_bar = document.getElementById("pokemonName");
    let search_name = search_bar.value.toLowerCase().trim();

    // tyhjennetään hakukenttä
    search_bar.value = "";
    if (search_name === "") return;


    let target_div = document.getElementById("pokemonData");
    // tyhjennetään edellinen sisältö
    target_div.innerHTML = "";

    let pokemon_data = await fetchPokemon(search_name);

    let pokemon_name = pokemon_data.name;
    let pokemon_image = pokemon_data.sprites.front_default;

    // nimi ja kuva
    target_div.appendChild(header(2, pokemon_name, "text-transform: capitalize;"));
    target_div.appendChild(image(pokemon_image, pokemon_name));

    // määrittää onko kuva käännetty
    let image_flipped = false;

    // käännä nappi
    let flip_btn = button("Käännä kuva", "margin-bottom: 1rem;");
    flip_btn.addEventListener("click", () => {
        image_flipped = !image_flipped;
        // valitaan kuva tilan mukaan
        let new_image = image_flipped ? pokemon_data.sprites.back_default : pokemon_data.sprites.front_default;
        // päivitetään kuvan src
        target_div.querySelector("img").src = new_image;
    });

    target_div.appendChild(flip_btn);

    // attribuutit
    target_div.appendChild(paragraph("Korkeus: " + pokemon_data.height, "margin-bottom: 0rem;"));
    target_div.appendChild(paragraph("Paino: " + pokemon_data.weight, "margin-bottom: 0rem;"));
    target_div.appendChild(paragraph("Kokemus: " + pokemon_data.base_experience));

}

async function main() {
    // kuunnellaan napin painallusta
    document.getElementById("searchBtn").addEventListener("click", showPokemon);

    let vastaus_div = document.getElementById("vastaus");
    vastaus_div.style.display = "grid";
    vastaus_div.style.maxWidth = "90%";
    vastaus_div.style.margin = "3rem auto";
    vastaus_div.style.fontSize = "1.5rem";
}

main();