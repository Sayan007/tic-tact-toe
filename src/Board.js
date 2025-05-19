import * as React from 'react';
import { CurrentUser } from './CurrentUser';
import { Row } from './Row';
import { useState } from 'react';
import { useImmer } from 'use-immer';
import model from './model.json';

export default function Board() {
  const [currentUser, setCurrentUser] = useState('X');
  const [clickedStatus, updateClickedStatus] = useImmer(model.clickedStatus);
  const [userSelection, updateUserSelection] = useImmer({'X': [], 'O': []});
  const [winnerFound, setWinnerFound] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState([]);
  const winningCombinations = model.winningCombinations;

  /**
   * Handling button click event
   * @param {number} clickedIndex - It's the index of the button starting from 1
   */
  const userClicked = function(clickedIndex) {
    updateClickedStatus((draft) => {draft[clickedIndex] = {'isClicked': true, 'clickedBy': currentUser}})
    updateUserSelection((draft) => {draft[currentUser].push(clickedIndex)})
    setCurrentUser((currentUser) => currentUser == 'X' ? 'O' : 'X')
  }

  /**
   * Verifying the winner. It gets executed on every render. 
   * Because the change in state variable is available in the next render.
   */
  const verifyWinner = function() {
    if(!winnerFound) {
      let lastUser = currentUser == 'X' ? 'O' : 'X';
      for(let i = 0; i < winningCombinations.length; i++){
        let eachCombination = winningCombinations[i];
        let isContinuous = 0;
        for(let j = 0; j < eachCombination.length; j++){
          if(userSelection[lastUser].indexOf(eachCombination[j]) != -1){
            isContinuous++;
          }
        }
        if(isContinuous == 3){
          setWinnerFound((status) => status = true )
          setCurrentUser(lastUser);
          setWinnerIndex(eachCombination)
          break;
        }
      }
    }
  }()

  return (
    <React.Fragment>
      {(userSelection['X'].length + userSelection['O'].length) == 9 ? <h1 style={{color: 'red'}}>It's a Draw 😒</h1> : ''}
      {winnerFound ? <h1 style={{color: 'red'}}>The Winner is {currentUser} 🔥</h1> : ''}
      <CurrentUser currentUser={currentUser}></CurrentUser>
      {model.boxes.map((value, i) => 
        <Row 
          value={value} 
          key={i}
          userClicked={(clickedIndex) => userClicked(clickedIndex)} 
          clickedStatus={clickedStatus} 
          winnerFound={winnerFound} 
          winnerIndex={winnerIndex}>
        </Row>
      )}
    </React.Fragment>
  )
}