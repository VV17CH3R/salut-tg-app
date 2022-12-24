import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { useTelegram } from "./Hooks/useTelegram";


function App() {
  const {onToggleButton, tg} = useTelegram();
  
  useEffect(() => {
    tg.ready();
  },[])
  


  return (
    <div className="App">
      <Header/>
      <button onClick={onToggleButton}>Показать</button>
    </div>
  );
}

export default App;
