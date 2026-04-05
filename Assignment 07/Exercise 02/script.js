"use strict";

async function getArtwork() {
    let keywords = document.getElementById("keywords").value;

    if (keywords.length <= 0)
        return;
    
    let artwork = await fetch(`https://api.artic.edu/api/v1/artworks/search?limit=100&q=${keywords}`)
        .then((response) => response.json())
        .then((json) => {
            let artworks = json.data;

            if (artworks.length <= 0)
                throw Error("No artworks founds");

            let randomArtwork = artworks[~~(Math.random() * artworks.length)];

            return fetch(randomArtwork["api_link"]);
        })
        .then((response) => response.json())
        .then((json) => json.data)
        .catch((error) => showImageNotFound());

    let imageBlob = await fetch(`https://www.artic.edu/iiif/2/${artwork["image_id"]}/full/843,/0/default.jpg`)
        .then((response) => response.blob())

    updatePage(artwork.title, artwork.artist_title, imageBlob);
}

function updatePage(title, author, imageBlob) {
    document.getElementById("artwork_title").textContent = title;
    document.getElementById("artwork_artist").textContent = author;

    let image = document.getElementById("artwork_image");

    image.src = URL.createObjectURL(imageBlob);
    image.style.display = "block";
}

function showImageNotFound() {
    let image = document.getElementById("artwork_image");

    image.style.display = "none";
    document.getElementById("artwork_title").textContent = "";
    document.getElementById("artwork_artist").textContent = "";
}
