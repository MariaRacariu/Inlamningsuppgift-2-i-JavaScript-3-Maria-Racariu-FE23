import { useState } from "react";
import styles from "./Cell.module.css";

function Cell({ cell, onClick, isDisabled }) {

    const [tileMessage, setTileMessage] = useState();
    const [amountOfMines, setAmountOfMines] = useState();

    const cellInfo = (event, tile) => {
        console.log("Tile clicked info:", tile);

        // Run if the tile has not been pressed
        if (tileMessage === undefined) {
            if (!tile.visible) {
                // console.log("This Tile:", tile, "has been pressed");
                if (tile.hasMine) {
                    // Game over
                    onClick(tile.index, event);
                    setTileMessage("hasMine");
                } else {
                    // Send index to update tile visibility
                    onClick(tile.index, event);
                    setAmountOfMines(tile.numberOfNeighbouringMines);
                    setTileMessage("amountOfMines");
                }
            }
        }

    }

    const handleClick = (event, tile) => {
        event.preventDefault();

        // console.log("Right button clicked");
        console.log("This tile:", tile, "is flagged");

        // Remove marked bombs
        if (tileMessage === 'flagged') {
            setTileMessage(undefined);
            onClick(tile.index, event);
        } else {
            setTileMessage('flagged');
            onClick(tile.index, event);
        }
    };

    return (
        <>
            <li className={styles.cell}>
                <button onClick={(event) => cellInfo(event, cell)} onContextMenu={(event) => handleClick(event, cell)} disabled={isDisabled} className={tileMessage === undefined ? styles.default : ""}>
                    {tileMessage === "amountOfMines" ? (
                        <p className={styles.showAmountOfMines}>{amountOfMines}</p>
                    ) : tileMessage === "flagged" ? (
                        <img src="./images/flag.png" alt="" className={styles.default} />
                    ) : tileMessage === "hasMine" ? (
                        <img src="./images/mine.png" alt="" />
                    ) : (
                        <p></p>
                    )}
                </button>
            </li>
        </>
    );

}

export default Cell;