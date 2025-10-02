import { header, paragraph, hr, image, anchor } from './common.js';

async function fetchData() {
    let data = await fetch("json/data_1.1.json")
        .then(response => response.json())
        .then(json => {
            return json;
        });

    return data;
}

async function main() {
    let target = document.getElementById("vastaus");
    target.style.display = "grid";
    target.style.maxWidth = "90%";
    target.style.margin = "auto";

    let data = await fetchData();

    // otsikko
    target.appendChild(header(1, data.otsikko, "margin-top: 1rem;"));

    // alaotsikko
    target.appendChild(paragraph(data.kuvaus));

    // vaakaviiva
    target.appendChild(hr());

    // kuva
    target.appendChild(image(data.kuva, "Kuva toimistotilasta", "width: 100%; margin: auto;"));

    // opintojakson teidot
    target.appendChild(header(2, "Opintojakso", "margin: 1rem auto 0.5rem auto;"));
    for (let kv of Object.entries(data.opintojakso)) {
        target.appendChild(paragraph(`${kv[0]}: ${kv[1]}`, "margin: auto;"));
    }

    // aiheet
    target.appendChild(header(2, "Aiheet"));
    for (let tekniikka of Object.values(data.tekniikat)) {
        target.appendChild(paragraph(`Aihe: ${tekniikka.aihe}`, "margin-bottom: 0; font-weight: bold;"));
        target.appendChild(anchor(tekniikka.linkki, tekniikka.linkki, "margin-bottom: 0.25rem;"));
    }
}

main();