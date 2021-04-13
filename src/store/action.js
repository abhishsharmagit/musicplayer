export function play() {
  return {
    type: "PLAY",
  };
}

export function pause() {
  return {
    type: "PAUSE",
  };
}

export function music(exp) {

  return {
    type: "CHANGE",
    payload: exp,
  };
}

export function duration(dur) {

  return {
    type: "NEW_DURATION",
    payload: dur,
  };
}

export function playing(dur) {

  return {
    type: "TIME_CHANGE",
    payload: dur,
  };
}

export function mute(arg) {

  return {
    type: "MUTE",
    payload: arg,
  };
}