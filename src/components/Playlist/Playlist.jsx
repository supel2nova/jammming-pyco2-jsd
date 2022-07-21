import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

const Playlist = (props) => {
  const handleNameChange = (event) => {
    const name = event.target.value
    props.onNameChange(name)
  }

  return (
    <div className="Playlist">
      <input
        defaultValue={"New Playlist"}
        value={props.playlistName}
        onChange={handleNameChange}
      />
      <TrackList
        tracks={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className="Playlist-save" onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  )
}

export default Playlist;
