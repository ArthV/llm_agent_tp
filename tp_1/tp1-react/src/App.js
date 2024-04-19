import './App.css';
import { useState, useCallback } from 'react';
import axios from 'axios';


function App() {
  const [row, setRow] = useState(2);
  const [col, setCol] = useState(10);
  const [poulePos, setPoulePos] = useState([0, 0]);
  const [renardPos, setRenardPos] = useState([1, 9]);

  const nextAction = useCallback(() => {
    console.log("Poule position: ", poulePos);
    console.log("Renard position: ", renardPos);
    axios.get('http://localhost:8080/gpt/').then(res => {
    res.data.message.forEach((functCall)=> {
      const [i_poule, j_poule] = poulePos;
      switch (functCall.name) {
          case "en_avant":
            setPoulePos([i_poule, j_poule + 1])
            break;
          case "en_arriere":
            setPoulePos([i_poule, j_poule - 1 ])
            break
          default:
            console.log("wrong name")
      }
    })});
  }, [row, col, poulePos, renardPos, setPoulePos]) 

  return (
    <div className="App">
      <header className="App-header">
          <h1>La Poule et le Renard</h1>
      </header>
      <body>
        <table className="Container">
          {Array.from(Array(row).keys()).map((i) => {
            return <tr className="Row">
              {Array.from(Array(col).keys()).map((j) => {
                return <td className="Column">
                  {i},{j}
                  <p className='Animal'>
                    {poulePos[0] === i && poulePos[1] === j ? "Poule" : ""}
                    {renardPos[0] === i && renardPos[1] === j ? "Renard" : ""}
                  </p>
                 </td>
              })}
            </tr>
          })}
        </table>
      </body>
      <button onClick={nextAction}></button>
    </div>
  );
}

export default App;
