import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }
  // console.log(squares);
  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);

  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const onClickCallback = (id) => {
    const updatedSquares = [ [...squares[0]], [...squares[1]], [...squares[2]] ];

    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        if (updatedSquares[row][col].id === id && updatedSquares[row][col].value === '' && !winner) {
          updatedSquares[row][col] = { ...updatedSquares[row][col], value: currentPlayer };
        } 
      }
    }

    checkForWinner(updatedSquares);
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    setSquares(updatedSquares);
  }


  const checkForWinner = (squares) => {
    const squaresArray = [].concat(...squares);
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if 
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if 
    //    all three squares have the same value.
    const strikes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < strikes.length; i++) {
      const [a, b, c] = strikes[i];
      if (squaresArray[a].value && squaresArray[a].value === squaresArray[b].value && squaresArray[a].value === squaresArray[c].value) {
        setWinner(squaresArray[a].value);
        return true;
      }    
    }
    return false;
  }

  const resetGame = () => {
    setCurrentPlayer(PLAYER_1);
    setSquares(generateSquares());
    setWinner(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{ winner ? `Winner is ${winner}` : `Current Player ${currentPlayer}` }</h2>
        <button onClick={ resetGame }>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={ onClickCallback } />
      </main>
    </div>
  );
}

export default App;
