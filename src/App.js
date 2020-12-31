//Components
import MediaPanel from './Components/Media-panel';
import Canvas from './Components/Canvas';

//App container
const App = ()=> {
  return ( 
    <div className="container flex-container" id="js-not-empty-dom">
      <MediaPanel /> 
      <Canvas />
    </div>
  );
}

export default App;
