import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  },[])
  


  return (
    <div className="App">
      works
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
