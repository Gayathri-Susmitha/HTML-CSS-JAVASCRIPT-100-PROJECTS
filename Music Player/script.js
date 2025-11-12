document.addEventListener("DOMContentLoaded", () => {
  const songs = [
    {
      id: 1,
      name: "Sugar",
      artist: "Maroon 5",
      img: "images/sugar.jpeg",
      genre: "Pop",
      source: "audio/abnormal-for-you-255737.mp3",
    },
    {
      id: 2,
      name: "Locked Away",
      artist: "R. City",
      img: "images/locked away.jpeg",
      genre: "Pop",
      source: "audio/shades-of-freedom-2025-by-smith-333808.mp3",
    },
    {
      id: 3,
      name: "All of Me",
      artist: "John Legend",
      img: "images/all of me.jpeg",
      genre: "Pop",
      source: "audio/song-english-edm-296526.mp3",
    },
    {
      id: 4,
      name: "Lose Yourself",
      artist: "Eminem",
      img: "images/loose yourself.jpeg",
      genre: "Hip Hop",
      source: "audio/the-adventures-of-mr-hardy_30sec-175535.mp3",
    },
    {
      id: 5,
      name: "Stairway to Heaven",
      artist: "Led Zeppelin",
      img: "images/stairway to heaven.jpeg",
      genre: "Rock",
      source:
        "audio/we-wish-you-a-merry-christmas-english-carol-sheppard-flute-8848.mp3",
    },
  ];

  let playlists = [];
  let currentSongIndex = 0;
  let currentPlaylist = null;

  // --- DOM Elements ---
  const themeToggle = document.getElementById("toggle-theme");
  const themeLabel = document.getElementById("theme-label");
  const allSongsList = document.getElementById("all-songs-list");
  const genreFilter = document.getElementById("genre-filter");
  const songSearch = document.getElementById("song-search");
  const songImg = document.getElementById("song-img");
  const songName = document.getElementById("song-name");
  const artistName = document.getElementById("artist-name");
  const audio = document.getElementById("audio");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const createPlaylistBtn = document.getElementById("create-playlist-btn");
  const newPlaylistNameInput = document.getElementById("new-playlist-name");
  const playlistList = document.getElementById("playlist-list");
  const playlistSearch = document.getElementById("playlist-search");
  const addToPlaylistBtn = document.getElementById("add-to-playlist-btn");
  const currentPlaylistSongList = document.getElementById(
    "current-playlist-song-list"
  );
  const currentPlaylistTitle = document.querySelector(
    "#current-playlist-songs h3"
  );

  // --- Functions ---
  function toggleTheme() {
    const isChecked = themeToggle.checked;
    //document.querySelector('html').setAttribute("data-theme",isChecked ? "dark" : "light")
    document.documentElement.setAttribute(
      "data-theme",
      isChecked ? "dark" : "light"
    );
    themeLabel.textContent = isChecked ? "Dark" : "Light";
  }

  function showSongs(filteredSongs = songs) {
    allSongsList.innerHTML = "";
    filteredSongs.forEach(song => {
      const songEl = document.createElement("div");
      songEl.className = "song";
      songEl.textContent = `${song.name} - ${song.artist}`;
      //songEl.setAttribute('data-song-id', song.id);
      songEl.dataset.songId = song.id;
      songEl.addEventListener("click", () => renderCurrentSong(song));
      allSongsList.appendChild(songEl);
    });
    updateSongSelection();
  }

  function updateSongSelection() {
    const currentSong = songs[currentSongIndex];
    document.querySelectorAll("#all-songs-list .song").forEach(el => {
      el.classList.toggle("selected", el.dataset.songId == currentSong.id);
    });
  }

  function renderCurrentSong(song) {
    currentSongIndex = songs.findIndex(s => s.id === song.id);
    songImg.src = song.img;
    songName.textContent = song.name;
    artistName.textContent = song.artist;
    audio.src = song.source;
    audio.play();
    updateSongSelection();
  }

  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong(songs[currentSongIndex]);
  }

  function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong(songs[currentSongIndex]);
  }

  function createPlaylist() {
    const newPlaylistName = newPlaylistNameInput.value.trim();
    if (newPlaylistName) {
      playlists.push({ name: newPlaylistName, songs: [] });
      newPlaylistNameInput.value = "";
      renderPlaylists();
    }
  }

  function updatePlaylistSelection() {
    document.querySelectorAll("#playlist-list li").forEach(el => {
      const isSelected =
        currentPlaylist && el.dataset.playlistName === currentPlaylist.name;
      el.classList.toggle("selected", isSelected);
    });
  }

  function renderPlaylists(filteredPlaylists = playlists) {
    playlistList.innerHTML = "";
    filteredPlaylists.forEach(playlist => {
      const playlistEl = document.createElement("li");
      playlistEl.textContent = playlist.name;
      playlistEl.dataset.playlistName = playlist.name;
      playlistEl.addEventListener("click", () => {
        currentPlaylist = playlist;
        renderCurrentPlaylistSongs();
      });
      playlistList.appendChild(playlistEl);
    });
    updatePlaylistSelection();
  }

  function addToPlaylist() {
    if (!currentPlaylist) {
      alert("Please select a playlist first.");
      return;
    }
    const currentSong = songs[currentSongIndex];
    if (!currentPlaylist.songs.some(song => song.id === currentSong.id)) {
      currentPlaylist.songs.push(currentSong);
      renderCurrentPlaylistSongs();
    } else {
      alert("Song is already in the playlist.");
    }
  }

  function renderCurrentPlaylistSongs() {
    currentPlaylistSongList.innerHTML = "";
    if (currentPlaylist) {
      currentPlaylistTitle.textContent = currentPlaylist.name;
      currentPlaylist.songs.forEach(song => {
        const songEl = document.createElement("li");
        songEl.className = "song";

        const songTitle = document.createElement("span");
        songTitle.textContent = `${song.name} - ${song.artist}`;
        songTitle.addEventListener("click", () => renderCurrentSong(song));

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", e => {
          e.stopPropagation();
          removeFromPlaylist(song.id);
        });

        songEl.append(songTitle, removeBtn);
        currentPlaylistSongList.appendChild(songEl);
      });
    } else {
      currentPlaylistTitle.textContent = "Current Playlist";
    }
    updatePlaylistSelection();
  }

  function removeFromPlaylist(songId) {
    if (currentPlaylist) {
      currentPlaylist.songs = currentPlaylist.songs.filter(
        song => song.id !== songId
      );
      renderCurrentPlaylistSongs();
    }
  }

  // --- Event Listeners ---
  themeToggle.addEventListener("change", toggleTheme);

  function filterAndShowSongs() {
    const selectedGenre = genreFilter.value;
    const searchTerm = songSearch.value.toLowerCase();
    let filtered = songs;
    if (selectedGenre !== "all") {
      filtered = filtered.filter(song => song.genre === selectedGenre);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        song =>
          song.name.toLowerCase().includes(searchTerm) ||
          song.artist.toLowerCase().includes(searchTerm)
      );
    }
    showSongs(filtered);
  }

  genreFilter.addEventListener("change", filterAndShowSongs);
  songSearch.addEventListener("input", filterAndShowSongs);

  // --- MODIFIED PLAYLIST SEARCH LOGIC ---
  playlistSearch.addEventListener("input", () => {
    const searchTerm = playlistSearch.value.toLowerCase().trim();
    const filteredPlaylists = playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchTerm)
    );
    renderPlaylists(filteredPlaylists);

    // If the search results in exactly one playlist, auto-select it.
    if (filteredPlaylists.length === 1 && searchTerm) {
      currentPlaylist = filteredPlaylists[0];
    } else {
      // Otherwise, no playlist is actively selected via search.
      currentPlaylist = null;
    }
    // Render the songs based on the auto-selection (or clear if no unique match).
    renderCurrentPlaylistSongs();
  });

  nextBtn.addEventListener("click", playNextSong);
  prevBtn.addEventListener("click", playPrevSong);
  createPlaylistBtn.addEventListener("click", createPlaylist);
  addToPlaylistBtn.addEventListener("click", addToPlaylist);

  // --- Initial Load ---
  themeToggle.checked = true;
  toggleTheme();
  showSongs();
  if (songs.length > 0) {
    renderCurrentSong(songs[0]);
  }
  renderPlaylists();
});
