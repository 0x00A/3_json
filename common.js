
export function header(level, text, style) {
    // Varmistetaan, että level on välillä 1-6
    level = Math.min(Math.max(level, 1), 6);

    let h = document.createElement("h" + level);
    h.textContent = text;

    if (style) h.style = style;

    return h;
}

export function paragraph(text, style) {
    let p = document.createElement("p");
    p.textContent = text;

    if (style) p.style = style;

    return p;
}

export function hr(style) {
    let hr = document.createElement("hr");
    if (style) hr.style = style;

    return hr;
}

export function image(src, alt, style) {
    let img = document.createElement("img");
    img.src = src;
    img.alt = alt;

    if (style) img.style = style;

    return img;
}

export function anchor(href, text, style) {
    let a = document.createElement("a");
    a.href = href;
    a.textContent = text || href;
    if (style) {
        a.style = style;
        console.log(a.style);
    }

    console.log(a);
    return a;
}

export function div(style) {
    let div = document.createElement("div");
    if (style) div.style = style;
    return div;
}