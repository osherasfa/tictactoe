import React from 'react';

export default function TicTacToe(props) {
    const { players, gameBoard, isPlayerOne, playTurn } = props
    const currentPlayer = isPlayerOne ? players[0] : players[1]

    return (  
            <div className='grid-container'>
                {gameBoard.map((rows, rowIndex) => 
                    rows.map((item, itemIndex) => (
                        <span 
                            key={itemIndex}
                            className='grid-item'
                            onClick={() => playTurn(rowIndex, itemIndex, currentPlayer.identifier)}
                            >{item === 0 ? null 
                                : <img src={players[item - 1].img} alt={players[item - 1].identifier}/>}
                        </span>
                    )))}
            </div>
    );
}