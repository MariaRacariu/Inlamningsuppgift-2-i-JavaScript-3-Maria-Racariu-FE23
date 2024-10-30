import React, { Component } from 'react';
import createBoard from "../utils";
import Cell from './Cell';
import styles from "./Board.module.css";

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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
        // console.log("State board:",this.state.board);
=======
>>>>>>> Stashed changes
        // console.log("Variable info:", newBoard);

        this.setState({ board: newBoard }, () => {
            // console.log("Update state of board:", this.state.board);
        });
=======
        this.setState({ board: newBoard });
>>>>>>> Stashed changes
    }

    componentDidMount() {
        this.createNewBoard();
    }

    updateBoard = (cellIndex, event) => {
<<<<<<< Updated upstream
        // console.log("Board has received index of tile:", cellIndex);
        const updateCell = this.state.board.map(tile => {
            if (tile.index === cellIndex) {
                if (tile.hasMine) {
                    if (event.button === 0) {
                        // Game Over
                        // console.log("Game over");
<<<<<<< Updated upstream
                        this.setState({...tile, visible: true, gameLostStatus: true});
                    }else if(event.button === 2){
=======
        const updateCell = this.state.board.map(tile => {
            if (tile.index === cellIndex) {
                if (tile.hasMine) {
                    if (event.button === 0) {
                        // Game Over
                        this.setState({ ...tile, visible: true, gameLostStatus: true });
                    } else if (event.button === 2) {
>>>>>>> Stashed changes
                        // Flagged tile
                        if (tile.visible === true) {
                            return { ...tile, visible: false };
                        } else {
                            return { ...tile, visible: true };
                        }
                    }
<<<<<<< Updated upstream
                  
                }else{
                    return {...tile, visible: true};
=======
                } else {
                    return { ...tile, visible: true };
>>>>>>> Stashed changes
=======
                        this.setState({ ...tile, visible: true, gameLostStatus: true });
                    } else if (event.button === 2) {
                        // Flagged tile
                        return { ...tile, visible: true };
                    }

                } else {
                    return { ...tile, visible: true };
>>>>>>> Stashed changes
                }
            }

            return tile;
        })

        const allTilesVisible = updateCell.every(tile => tile.visible || tile.hasMine);

        this.setState({
            gameWonStatus: allTilesVisible,
            board: updateCell,
        });

    }

    resetGame = () => {
        window.location.reload();
    }

    render() {
        return (
            <>
                <h1>Baby Minesweeper</h1>
                <div className={styles.container}>
                    <ul className={styles.board}>
                        {this.state.board && this.state.board.map(tile => (
                            <Cell key={tile.index} cell={tile} onClick={this.updateBoard} isDisabled={this.state.gameLostStatus} />
                        ))}
                    </ul>
                </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
                {this.state.gameLostStatus && (
                    <>
                        <h2>Game over</h2>
                        <button onClick={this.resetGame} className={styles.button}>Restart</button>
                    </>
                )}

                {
                    this.state.gameWonStatus && (
                        <>
                            <h2>Game won</h2>
                            <button onClick={this.resetGame} className={styles.button}>Restart</button>
                        </>
                    )
                }

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
            </>
        );
    }
}

export default Board;