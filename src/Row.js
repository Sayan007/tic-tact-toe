import { Button } from './Button';
export function Row({value, userClicked, clickedStatus, winnerFound, winnerIndex}) {
  return (
    <div className='row'>
      {value.map((index) => 
        <Button 
          index={index} 
          key={index} 
          buttonClicked={(clickedIndex) => userClicked(clickedIndex)} 
          clicked={clickedStatus[index].isClicked} 
          disabled={clickedStatus[index].isClicked || winnerFound} 
          winnerFound={winnerFound} 
          winnerIndex={winnerIndex}>
            {clickedStatus[index].clickedBy}
          </Button>
      )}
    </div>
  )
}