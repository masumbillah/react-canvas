//Components
import MediaPanel from './Components/Media.panel';
import Canvas from './Components/Canvas';


const App = ()=> {
  return ( 
    <div className="container flex-container">
      <MediaPanel /> 
      <Canvas />
    </div>
  );
}

export default App;