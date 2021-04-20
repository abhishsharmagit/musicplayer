
// type Action = {
//   type: String,
//   arg?: any 
// }


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
    type: "CHANGE_MUSIC",
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