import React, { Component } from 'react';
import createBoard from "../utils";
import Cell from './Cell';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardSize: 25,
            numberOfMines: 7,
            board: null,
            gameLostStatus: false,
            gameWonStatus: false,
        };
    }

    createNewBoard = () => {
        // console.log("Updating Board state");

        const newBoard = createBoard(this.state.boardSize, this.state.numberOfMines);

        // console.log("State board:",this.state.board);
        // console.log("Variable info:", newBoard);

        this.setState ({board: newBoard}, () =>{
            // console.log("Update state of board:", this.state.board);
        });
    }

    componentDidMount(){
       this.createNewBoard();
    }

    updateBoard = (cellIndex, event) => {
        // console.log("Board has received index of tile:", cellIndex);

        // Update visibility of tile clicked
        const updateCell = this.state.board.map(tile =>{

            if(tile.index === cellIndex){
                if(tile.hasMine){
                    if(event.button === 0){
                        // console.log("Game over");
                        this.setState({gameLostStatus: true});
                    }else if(event.button === 2){
                        return {...tile, visible: true};
                    }
                  
                }else{
                    return {...tile, visible: true};
                }
            }

            return tile;
        })

        // Update board with clicked tile
        this.setState({board: updateCell});

        this.state.board.every((tile) =>{
            if(tile.visible){
                this.setState({gameWonStatus: true});
            }
            return this.gameWonStatus;
        })
    }

    resetGame = () =>{
        window.location.reload();
    }

    render() {
        return (
            <>
                <h1>Baby Minesweeper</h1>
                <ul className='board'>
                    {this.state.board && this.state.board.map(tile => (
                        <Cell key={tile.index} cell={tile} onClick={this.updateBoard} isDisabled={this.state.gameLostStatus}/>
                    ))}
                </ul>

                {this.state.gameLostStatus && (
                    <>
                        <h2>Game over</h2>
                        <button onClick={this.resetGame}>Restart</button>
                    </> 
                )}

                {
                    this.state.gameWonStatus &&(
                        <>  
                            <h2>Game won</h2>
                            <button onClick={this.resetGame}>Restart</button>
                        </>
                    )
                }
            </>
        );
    }
}

export default Board;