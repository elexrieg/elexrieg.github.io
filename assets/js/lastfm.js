let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    let panel = this.parentNode.querySelector(".panel");
    if (panel.style.maxHeight !== "0px") {
      panel.style.maxHeight = "0px";
      panel.classList.remove("show");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.classList.add("show");
    }
  });
}

const apiKey = process.env.LASTFM_APIKEY;
const username = "BSOD2528";
const limit = 10;

// top tracks
fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${apiKey}&format=json&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
        let topTracks = data.toptracks.track;
        let container = document.getElementById("tracksContainer");

        topTracks.forEach((track, index) => {
            let trackDiv = document.createElement("div");
            trackDiv.className = "top-tracks";

            let trackImageDiv = document.createElement("div");
            trackImageDiv.className = "track-image";
            let img = document.createElement("img");
            let imageUrl = track.image[3]["#text"];
            if (imageUrl) {
                img.src = imageUrl;
            } else {
                img.alt = "No image available";
            }
            trackImageDiv.appendChild(img);

            let trackInfoDiv = document.createElement("div");
            trackInfoDiv.className = "track-info";

            let artistNameDiv = document.createElement("div");
            artistNameDiv.className = "artist-name";
            artistNameDiv.textContent = `By: ${track.artist.name}`;

            let trackNameDiv = document.createElement("div");
            trackNameDiv.className = "track-name";
            trackNameDiv.textContent = track.name;

            let trackPlaysDiv = document.createElement("div");
            trackPlaysDiv.className = "track-plays";
            trackPlaysDiv.textContent = `Playcount: ${track.playcount}`;

            trackInfoDiv.appendChild(artistNameDiv);
            trackInfoDiv.appendChild(trackNameDiv);
            trackInfoDiv.appendChild(trackPlaysDiv);

            trackDiv.appendChild(trackImageDiv);
            trackDiv.appendChild(trackInfoDiv);

            container.appendChild(trackDiv);

            let trackURL = document.createElement("a");
            trackURL.href = track.name.url;

            let artistURL = document.createElement("a");
            artistURL.href = track.artist.url;
        });
    })

    .catch(error => console.error("Error:", error));


// top artists
fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
        let topArtists = data.topartists.artist;
        let container = document.getElementById("artistsContainer");

        topArtists.forEach((artist, index) => {
            let artistDiv = document.createElement("div");
            artistDiv.className = "top-artists";

            let artistImageDiv = document.createElement("div");
            artistImageDiv.className = "artist-image";
            let img = document.createElement("img");
            let imageUrl = artist.image[artist.image.length - 1]["#text"];
            if (imageUrl) {
                img.src = imageUrl;
            } else {
                img.alt = "No image available";
            }
            artistImageDiv.appendChild(img);

            let artistInfoDiv = document.createElement("div");
            artistInfoDiv.className = "artist-info";

            let artistNameDiv = document.createElement("div");
            artistNameDiv.className = "artist-name";
            artistNameDiv.textContent = artist.name;

            let artistPlaysDiv = document.createElement("div");
            artistPlaysDiv.className = "artist-plays";
            artistPlaysDiv.textContent = `Playcount: ${artist.playcount}`;

            artistInfoDiv.appendChild(artistNameDiv);
            artistInfoDiv.appendChild(artistPlaysDiv);

            artistDiv.appendChild(artistImageDiv);
            artistDiv.appendChild(artistInfoDiv);

            container.appendChild(artistDiv);

            let artistURL = document.createElement("a");
            artistURL.href = artist.url;
        });
    })
    .catch(error => console.error("Error:", error));

// recent tracks
fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
        let recentTracks = data.recenttracks.track;
        let container = document.getElementById("recentTracksContainer");

        recentTracks.forEach((track, index) => {
            let trackDiv = document.createElement("div");
            trackDiv.className = "recent-tracks";

            let trackImageDiv = document.createElement("div");
            trackImageDiv.className = "track-image";
            let img = document.createElement("img");
            let imageUrl = track.image[track.image.length - 1]["#text"];
            if (imageUrl) {
                img.src = imageUrl;
            } else {
                img.alt = "No image available";
            }
            trackImageDiv.appendChild(img);

            let trackInfoDiv = document.createElement("div");
            trackInfoDiv.className = "track-info";

            let artistNameDiv = document.createElement("div");
            artistNameDiv.className = "artist-name";
            artistNameDiv.textContent = `By: ${track.artist['#text']}`;

            let trackNameDiv = document.createElement("div");
            trackNameDiv.className = "track-name";
            trackNameDiv.textContent = track.name;

            trackInfoDiv.appendChild(artistNameDiv);
            trackInfoDiv.appendChild(trackNameDiv);

            trackDiv.appendChild(trackImageDiv);
            trackDiv.appendChild(trackInfoDiv);

            container.appendChild(trackDiv);

            let trackURL = document.createElement("a");
            trackURL.href = track.url;
        });
    })
    .catch(error => console.error("Error:", error));
