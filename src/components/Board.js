import React, { Component } from 'react';
import createBoard from "../utils";

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardSize: 25,
            numberOfMines: 7,
            board: "",
        };

        this.createNewBoard = this.createNewBoard.bind(this);
    }

    createNewBoard() {
        createBoard(this.state.boardSize, this.state.numberOfMines);
        this.setState(() => ({
            board: createBoard
        }));
        // console.log(this.state.boardSize);
    }

    render() {

        // Save the board in a state otherwise the board will generate every time
        // Use the state to generate a board?? or use the state to generate cells??


        return (
            <>
                <h1>Baby Minesweeper</h1>
                {/* <ul className='board'>
                    {createBoard.map(tile => (
                        <li key={tile.index}><button onClick={() => this.cellInfo(tile)}>?</button></li>
                    ))}
                </ul > */}
            </>
        );
    }
}

export default Board;