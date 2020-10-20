export const initialState = {
  playlist: [{}],
  currentSongId: 0,
  isPlaying: false,
  searchQuery: "",
  showSearchBox: false,
  albumColor: "#121212",
  currentPlayingAlbumId: "",
  tempAlbumId: "",
  user: {},
  showPopupPlaylistForm: false,
  songOptionnsData: {},
  temPlaylist: [{}],
  userPlaylists: [{}],
  showAddToPlaylistModel: false,
  addToPlaylistData: {},
  isLogin: false,
};

const reducer = (state, action) => {
  //
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.item,
      };
    case "SET_PLAYLIST":
      // Logic for adding item to basket
      return {
        ...state,
        playlist: action.item,
      };

    case "SET_CURRENT_SONG_ID":
      return {
        ...state,
        currentSongId: action.item,
      };
    case "UPDATE_SONG_STATUS":
      return {
        ...state,
        isPlaying: action.item,
      };

    case "UPDATE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.item,
      };

    case "SHOW_HIDE_SEARCH_BOX":
      return {
        ...state,
        showSearchBox: action.item,
      };

    case "SET_ALBUM_COLOR":
      return {
        ...state,
        albumColor: action.item,
      };
    case "SET_CURRENT_ALBUM_ID":
      return {
        ...state,
        currentPlayingAlbumId: action.item,
      };
    case "SET_TEMP_ALBUM_ID":
      return {
        ...state,
        tempAlbumId: action.item,
      };
    case "SHOW_HIDE_PLAYLIST_POPUP_FORM":
      return {
        ...state,
        showPopupPlaylistForm: action.item,
      };

    case "SONGS_OPTION_DATA":
      return {
        ...state,
        songOptionnsData: action.item,
      };
    case "SET_TEMP_PALYLIST":
      return {
        ...state,
        temPlaylist: action.item,
      };

    case "SET_USER_PLAYLISTS":
      return {
        ...state,
        userPlaylists: action.item,
      };
    case "SHOW_HIDE_ADD_TO_PLAYLIST_MODEL":
      return {
        ...state,
        showAddToPlaylistModel: action.item,
      };

    case "ADD_TO_PLAYLIST_DATA":
      return {
        ...state,
        addToPlaylistData: action.item,
      };

    case "LOGIN_STATUS":
      return {
        ...state,
        isLogin: action.item,
      };
    default:
      return state;
  }
};

export default reducer;
