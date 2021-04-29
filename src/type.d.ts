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
    song: string,
    accessToken: string,
    refreshToken: string,
    expiresIn: string|number
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

type TrackProps = {
  track:{
    artist: string,
    title: string,
    uri: string,
    albumUrl: string
  },
  chooseTrack:Function
}

type useAuthProp = (code:string) => string