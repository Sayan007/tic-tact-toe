import * as React from 'react';

export function Button({index, buttonClicked, clicked, disabled, winnerIndex, children}) {
  let className = winnerIndex.indexOf(index) != -1 ? 'button winner' : 'button';
  return (
    <button 
      role='button' 
      key={index}
      className={className} 
      onClick={() => buttonClicked(index)} 
      disabled={disabled}>
        {clicked ? children : <span>&nbsp;&nbsp;&nbsp;</span>}
      </button>
  )
}