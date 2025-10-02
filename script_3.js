import { header, paragraph, hr, image, anchor, div } from './common.js';

async function fetchData() {
    let data = await fetch("https://api.openweathermap.org/data/2.5/weather?id=658225&appid=665ecd56dfc08dbb50feb8b8f5034e28&lang=fi&units=metric")
        .then(response => response.json())
        .then(json => {
            return json;
        }).catch(error => {
            document.getElementById("vastaus").appendChild(paragraph("Tapahtui virhe (consolessa lisätietoa)", "color: red;"));
            console.error("Virhe:", error);
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

    target.appendChild(header(1, "Sää Helsingissä", "margin-top: 1rem;"));

    // kellopnaika
    let now = new Date();
    target.appendChild(paragraph(`Sää kello ${now.getHours()}:${now.getMinutes()}`));

    target.appendChild(header(2, "Sää:"));

    // en ole varma onko data aina olemassa, joten ollaan varovaisia ja tarkistetaan jokainen
    let desc = data?.weather?.[0]?.description || "ei tietoa";
    target.appendChild(paragraph(desc));

    target.appendChild(header(2, "Lämpötila:"));
    // jotta 0 arvo näkyy oikein
    let temp = data?.main?.temp ?? null;
    target.appendChild(paragraph(temp ? `${temp} °C` : "ei tietoa"));

    target.appendChild(header(2, "Tuuli:"));
    // sama juttu
    let wind = data?.wind?.speed ?? null;
    target.appendChild(paragraph(wind ? `${wind} m/s` : "ei tietoa"));
}

main();