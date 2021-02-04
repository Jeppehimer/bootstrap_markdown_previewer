// bank of audio clips for drum
const audioClips = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

// Drumpad Main App, sent to .html file via render 
function App() {

  const [volume, setVolume] = React.useState(0.3);
  const [description, setDescription] = React.useState("");

    return (
    // drumpad display
    <div className="bg-info min-vh-100 container-fluid" id="display">
        <div>
            <h2 className="text-center">Drum Machine by JEppehimer</h2>
            <div className="row">
              <div className="col-4" /> 
              {/* display drumpad from Pad component below mapped to audio bank */}
              <div className="col-4">
                {audioClips.map((clip) => (                  
                  <Pad id={clip.id} key={clip.id} clip={clip} volume={volume} setDescription={setDescription} />
                ))}
              </div>              
            </div>
            
            <br/>
            {/* volume (state) display and controls*/}
            <h5 className="text-center">Volume: {Math.floor(volume*100)}%</h5>
            <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <input 
                  type="range" 
                  step="0.01"
                  min="0" 
                  max="1" 
                  value={volume}
                  onChange={(event) => setVolume(event.target.value)}
                  className="w-100"
                  />
              </div>    
            </div>

            <br/> 
            {/* Audio description pulling from audio bank id key */}
            <h5 className="text-center">Audio Description:</h5>
            <div className="row">
              <div className="col-4" />
              <div className="col-4 card">
                <h4 className="card-body text-center">
                  {description}
                </h4>
              </div>
            </div>
        </div>
    </div>
    );
}        


function Pad({clip, volume, setDescription}) {

  const [active, setActive] = React.useState(false);

  // add and remove event listener for keydown events
  React.useEffect( () => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  });

  // handle keydown events by calling playAudio function below only if the key pressed matches one in the bank (this is mapped to the keybank in App to check against each object in bank)
  const handleKeyPress = (event) => {
    if (event.keyCode === clip.keyCode){
      playAudio();
    }
  }

  // function to play audio, control active state, set volume, and set audio description for display
  const playAudio = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 100);
    audioTag.volume = volume;
    audioTag.play();
    setDescription(clip.id);
  };

  // return single drum pad element containing audio from bank
  return (
    <div id={clip.id} onClick={playAudio} className={`drum-pad btn btn-secondary bg-dark p-4 m-2 col-3 ${active && "btn-warning bg-white"}`}>
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}


// send App to html document
ReactDOM.render(<App />, document.getElementById("drum-machine"));