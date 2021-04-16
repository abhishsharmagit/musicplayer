type stateFormat = {
    playerState: boolean,
    musicState: string,
    duration: number,
    playingTime: number,
    muted: boolean
  }


type Action = {
    type?: String;
    payload?: any;
  }



  type musicProp = {
      music: string
  }