import './App.css';
import Canvas from './components/Canvas/canvas';
import Navbar from './components/Navbar/navbar';
import AnimatedCursor from './components/AnimatedCursor/animatedcursor';

function App() {
  return (<>
    <Canvas></Canvas>
    <AnimatedCursor 
      innerSize={80}
      innerAlpha={1}
      innerColor='255, 255 , 255'
      // anotherCursor={true}
      outerSize={90}
      outerAlpha={0.5}
      outerColor='255, 0, 0'
    />
    <Navbar></Navbar>
  </>
  );
}

export default App;
