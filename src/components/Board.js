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
        const newBoard = createBoard(this.state.boardSize, this.state.numberOfMines);

        this.setState ({board: newBoard});
    }

    componentDidMount(){
       this.createNewBoard();
    }

    updateBoard = (cellIndex, event) => {
        const updateCell = this.state.board.map(tile =>{
            if(tile.index === cellIndex){
                if(tile.hasMine){
                    if(event.button === 0){
                        // Game Over
                        this.setState({...tile, visible: true, gameLostStatus: true});
                    }else if(event.button === 2){
                        // Flagged tile
                        return {...tile, visible: true};
                    }
                }else{
                    return {...tile, visible: true};
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

    resetGame = () =>{
        window.location.reload();
    }

    render() {
        return (
            <>
                <h1>Baby Minesweeper</h1>
                <div className={styles.container}>
                    <ul className={styles.board}>
                        {this.state.board && this.state.board.map(tile => (
                            <Cell key={tile.index} cell={tile} onClick={this.updateBoard} isDisabled={this.state.gameLostStatus}/>
                        ))}
                    </ul>
                </div>
                
                {this.state.gameLostStatus && (
                    <>
                        <h2>Game over</h2>
                        <button onClick={this.resetGame} className={styles.button}>Restart</button>
                    </> 
                )}

                {
                    this.state.gameWonStatus &&(
                        <>  
                            <h2>Game won</h2>
                            <button onClick={this.resetGame} className={styles.button}>Restart</button>
                        </>
                    )
                }
               
            </>
        );
    }
}

export default Board;