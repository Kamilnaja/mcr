import React from 'react';
import './App.css';
import { MainForm } from './MainForm';

function App() {
  return (
    <div className="App">
      <h1>Welcome in game</h1>
      <section>
        <h2>Login</h2>
         <MainForm></MainForm>
      </section>
    </div>
  );
}

export default App;
