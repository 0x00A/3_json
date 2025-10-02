import { header, paragraph, hr, image, anchor, div } from './common.js';

async function fetchData() {
    let data = await fetch("json/data_1.2.json")
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
    target.style.fontSize = "1.5rem";

    let data = await fetchData();
    console.log(data);
    let target_div = div("margin-bottom: 0.5rem; margin-top: 1rem; padding: 1rem;");

    // otsikko
    let title = header(1, data.nimi);
    target_div.appendChild(title);

    // osallistujamäärä
    target_div.appendChild(paragraph(`${data.osallistujat.length} kpl`));

    // osallistujat
    let out = "";
    for (let osallistuja of data.osallistujat) {
        out += `${osallistuja.nimi} `;
    }
    target_div.appendChild(paragraph(out));

    // pvm ja kesto
    target_div.appendChild(paragraph(`${data.alkupvm} - ${data.loppupvm}`));
    target_div.appendChild(paragraph(`${data.kesto_vk} viikkoa`));

    // kuva
    target_div.appendChild(image(data.kuva, "kuva", "max-width: 100%; height: auto;"));

    // tyyli
    target_div.style.backgroundColor = "#c0c0c0d7";
    target_div.style.width = "fit-content";

    target.appendChild(target_div);
}

main();