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


// --------------Added Toggle for Mic-Button & Search-Button----------------------------------------------------------------------------------

function toggleEventMethod() {
    const searchInput = document.getElementById("searchInput").value;
    if (searchInput == "") {
        document.getElementById("searchButton").style.display = "none";
        document.getElementById("mic-button").style.display = "block";
    } else {
        document.getElementById("mic-button").style.display = "none";
        document.getElementById("searchButton").style.display = "block";
    }
}
setInterval(toggleEventMethod, 2000);

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
// Trigger button click when Enter key is pressed
document.getElementById("searchInput").addEventListener("keydown", (event) =>{
    if (event.key === "Enter") { // Check if Enter key is pressed
        event.preventDefault(); // Prevent default behavior (like new line in textarea)
        document.getElementById("searchButton").click(); // Trigger the button click
    }
});
//Normal Function Call when ckeck the button mannually
document.getElementById("searchButton").addEventListener("click", () => {
    searchSongs();
});





///Add mic-Button--------------------------------------------------------------------------------------------------------------
const button = document.getElementById("mic-button");
const textOutput = document.getElementById("searchInput");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition.");
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    // ✅ Ask for microphone permission when the page loads
    async function checkMicrophonePermission() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop stream after checking
            console.log("Microphone access granted!");
        } catch (error) {
            alert("Microphone access denied. Please allow it in browser settings.");
        }
    }


    button.addEventListener("click", () => {
        if (button.classList.contains("listening")) {
            recognition.stop();
            button.style.backgroundColor = "#10a37f"; // ✅ Reset color when stopped
            button.classList.remove("listening");
        } else {
            recognition.start();
            button.style.backgroundColor = "red"; // 🔴 Indicate listening mode
            button.classList.add("listening");
        }
    });

    // ✅ Ensure color resets when recognition stops automatically
    recognition.onresult = (event) => {
        button.style.backgroundColor = "#10a37f"; // ✅ Reset when stopped
        textOutput.value = event.results[0][0].transcript;
        searchSongs(); // ✅ Auto-search after voice input
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error || "Unknown error");
        if (event.error === "not-allowed") {
            alert("Microphone permission is required. Enable it in browser settings.");
        }
        button.classList.remove("listening");
    };

    recognition.onend = () => {
        button.classList.remove("listening");
    };
}

document.getElementById("button").addEventListener("click", () => {
    checkMicrophonePermission();
});
