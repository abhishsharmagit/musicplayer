const initialState = {
  playerState: false,
  musicState: "",
  duration: 0,
  playingTime: 0,
  muted: false,
};

const reducer = (state = initialState, action) => {
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
    case "CHANGE":
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
