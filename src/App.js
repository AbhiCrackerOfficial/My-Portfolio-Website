import Canvas from './components/Canvas/canvas';
import Navbar from './components/Navbar/navbar';
import AnimatedCursor from './components/AnimatedCursor/animatedcursor';

function App() {
  return (
    <>
      <Canvas />
      <AnimatedCursor
        innerSize={80}
        innerAlpha={1}
        innerColor='255, 255, 255'
      />
      <Navbar />
    </>
  );
}

export default App;
