// APIs

// 1. Global search​ [Search Artist, Songs, Album, etc...]***
// async function searchAll() {
//     const response = await fetch(`https://saavn.dev/api/search?query=Arijit Singh`); 
//     const data = await response.json();
//     console.log(data);
// }
// searchAll();

// 2. Search for songs
// async function getSong(){
//     const response = await fetch('https://saavn.dev/api/search/songs?query=Tum Hi Ho');
//     const data = await response.json();
//     console.log(data);
// }
// getSong();



// -------------------------------------------------------------------------------------------------------------------------------
const songsContainer = document.getElementById("songsContainer");
async function searchSongs() {
    const searchInput = document.getElementById("searchInput").value || "Tum Hi Ho";
    const url = `https://saavn.dev/api/search/songs?query=${searchInput}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    songsContainer.innerHTML = ""; // Clear previous results
    data.data.results.forEach((element) => {
        const songDiv = document.createElement("div");
        songDiv.classList.add("song-card");
        
        const img = document.createElement("img");
        const p = document.createElement("p");
        const audio = document.createElement("audio");

        
        let imgUrl = element.image[2].url;
        let nameOrTitle = element.name;
        let audioUrl = element.downloadUrl ? element.downloadUrl[0].url : "";

        img.src = imgUrl;
        img.alt = "Song Image";
        p.textContent = nameOrTitle;
        audio.src = audioUrl;
        audio.controls = true;
   
        songDiv.append(img, p, audio);
        songsContainer.appendChild(songDiv);
    });
}

document.getElementById("searchButton").addEventListener("click", () => {
    searchSongs();
});
