

export function play(type: String, arg?:any): Action{
  return {
    type: type,
    payload: arg
  };
}

// export function pause() {
//   return {
//     type: "PAUSE",
//   };
// }

export function music(exp?:any):Action{

  return {
    type: "RANDOM_MUSIC",
    payload: exp,
  };
}

export function duration(dur?:number):Action {

  return {
    type: "NEW_DURATION",
    payload: dur,
  };
}

export function playing(dur?:number):Action {

  return {
    type: "TIME_CHANGE",
    payload: dur,
  };
}

export function mute(arg?:any):Action {

  return {
    type: "MUTE",
    payload: arg
  };
}

export function searchAction(arg?:any):Action {

  return {
    type: "SEARCH",
    payload: arg
  };
}

export function searchResultsAction(arg?:any):Action {

  return {
    type: "SEARCH_RESULT",
    payload: arg
  };
}

export function albumUrlAction(arg?:any):Action {

  return {
    type: "ALBUM_URL",
    payload: arg
  };
}

export function titleAction(arg?:any):Action {

  return {
    type: "TITLE",
    payload: arg
  };
}

export function songAction(arg?:any):Action {

  return {
    type: "SONG_CHANGE",
    payload: arg
  };
}

export function accessTokenAction(arg?:any):Action {

  return {
    type: "ACCESS_TOKEN",
    payload: arg
  };
}

export function refreshTokenAction(arg?:any):Action {

  return {
    type: "REFRESH_TOKEN",
    payload: arg
  };
}

export function expiresInAction(arg?:any):Action {

  return {
    type: "EXPIRES_IN",
    payload: arg
  };
}