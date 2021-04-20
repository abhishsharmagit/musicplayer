
const initialState: stateFormat = {
  playerState: false,
  musicState: "",
  duration: 0,
  playingTime: 0,
  muted: false,
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
    case "CHANGE_MUSIC":
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
    default:
      return state;
  }
};

export default reducer;
