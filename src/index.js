import React from "react";
import Jeu from "./Jeu";
import { createRoot } from 'react-dom/client';
import "./index.css";

function App() {


  return (
    <div className="App">
      <section>
        <Jeu />
      </section>
    </div>
  );
}


//ReactDOM.render(<App />,document.getElementById("root"));
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);