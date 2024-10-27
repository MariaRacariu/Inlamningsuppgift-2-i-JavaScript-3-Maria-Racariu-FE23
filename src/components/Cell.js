import { useState } from "react";

function Cell({ cell, onClick, isDisabled}) {

    const [tileMessage, setTileMessage] = useState("?");

    const cellInfo = (event, tile) => {
        console.log("Tile clicked info:", tile);
        
        // Run if the tile has not been pressed
        if(!tile.visible){
            // console.log("This Tile:", tile, "has been pressed");
            if(tile.hasMine){
                // Game over
                onClick(tile.index, event);
                setTileMessage("!");
            }else{
                 // Send index to update tile visibility
                onClick(tile.index, event);
                setTileMessage(tile.numberOfNeighbouringMines);
            }
        }
    }

    const handleClick = (event, tile) => {
        event.preventDefault();

        // console.log("Right button clicked");
        console.log("This tile:", tile, "has a mine");
        
        // You can remove marked bombs
        if(tileMessage === "X"){
            setTileMessage("?")
        }else{
            setTileMessage("X");

            if(tile.hasMine === true){
                onClick(tile.index, event);
            }
        }
    };

    return(
        <>
            <li>
                <button onClick={(event) => cellInfo(event, cell)} onContextMenu={(event) => handleClick(event, cell)} disabled={isDisabled}>{tileMessage}</button>
            </li>
        </>
    );

}

export default Cell;