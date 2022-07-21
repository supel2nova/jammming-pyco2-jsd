import { useState, useEffect } from "react";

import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../utils/Spotify";

import "./App.css";

const App = () => {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState("New Playlist")
  const [playlistTracks, setPlaylistTracks] = useState([])

  useEffect(() => {
    Spotify.getAccessToken()
  }, [])

  const addTrack = (track) => {
    if (playlistTracks.find((t) => t.id === track.id)) return

    setPlaylistTracks((prevPlaylistTracks) => [...prevPlaylistTracks, track]);
  }

  const removeTrack = (track) => {
    setPlaylistTracks((prevPlaylistTracks) =>
      prevPlaylistTracks.filter((t) => t.id !== track.id)
    )
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    Spotify.savePlaylist(
      playlistName,
      playlistTracks.map((track) => track.id)
    ).then(() => {
      setPlaylistName("New Playlist")
      setPlaylistTracks([])
    })
  }

  const search = (term) => {
    Spotify.search(term).then((results) => setSearchResults(results))
  }

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  )
}

export default App;
