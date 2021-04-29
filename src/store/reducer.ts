
const initialState: stateFormat = {
  playerState: false,
  musicState: [],
  duration: 0,
  playingTime: 0,
  muted: false,
  search: "",
  searchResults: [],
  albumurl: "",
  title: "",
  song: "",
  accessToken: "",
  refreshToken: "",
  expiresIn: 0
};

const reducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        playerState: action.payload
      };
    case "PAUSE":
      return {
        ...state,
        playerState: action.payload
      };
    case "RANDOM_MUSIC":
      return {
        ...state,
        musicState: action.payload,
      };

    case "NEW_DURATION":
      return {
        ...state,
        duration: action.payload,
      };
    case "TIME_CHANGE":
      return {
        ...state,
        playingTime: action.payload,
      };
    case "MUTE":
      return {
        ...state,
        muted: action.payload,
      };
      case "SEARCH":
        return {
          ...state,
          search: action.payload,
        };
        case "SEARCH_RESULT":
          return {
            ...state,
            searchResults: action.payload,
          };
          case "ALBUM_URL":
          return {
            ...state,
            albumurl: action.payload,
          };
          case "TITLE":
          return {
            ...state,
            title: action.payload,
          };
          case "SONG_CHANGE":
          return {
            ...state,
            song: action.payload,
          };
          case "ACCESS_TOKEN":
          return {
            ...state,
            accessToken: action.payload,
          };
          case "REFRESH_TOKEN":
          return {
            ...state,
            refreshToken: action.payload,
          };
          case "EXPIRES_IN":
          return {
            ...state,
            expiresIn: action.payload,
          };
    default:
      return state;
  }
};

export default reducer;
