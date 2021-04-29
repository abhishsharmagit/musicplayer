type stateFormat = {
    playerState: boolean,
    musicState: Array,
    duration: number,
    playingTime: number,
    muted: boolean,
    search: string,
    searchResults: string|object[],
    albumurl: string,
    title: string,
    song: string
  }


type Action = {
    type?: String;
    payload?: any;
  }



  type musicProp = {
      song: string
  }

  type PlayerProps = {
    code: string|null
}

