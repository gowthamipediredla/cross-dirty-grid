import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const size = 5;
  const gridLenth = size * size;
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [clickedCells, setClickedCells] = useState([]);
  const [clickedDirtyData, setClickedDirtyData] = useState(null);
  const [count, setCount] = useState(null);
  const [disableUndo, setDisableUndo] = useState(false);

  const generateRandomNums = () => {
    let data = [];
    for (let i = 0; i < size; i++) {
      const random = Math.floor(Math.random() * size);
      data.push(random + i * size);
    }
    setRandomNumbers(data);
  };
  useEffect(() => {
    generateRandomNums();
  }, []);

  const getStyle = () => ({
    display: "grid",
    gridTemplateColumns: `repeat(5,50px)`,
    gridTemplateRows: `repeat(5,50px)`,
    gap: "5px",
    marginTop: "10px",
  });
  const clickHandler = (index) => {
    if (clickedDirtyData) return;
    const rowNumber = Math.floor(index / size);
    const isDuplicate = clickedCells.some(
      (data) => Math.floor(data / size) === rowNumber
    );
    if (isDuplicate) return;
    const isDirtyData = randomNumbers.includes(index);
    if (isDirtyData) setClickedDirtyData(index);
    else setCount((prev) => prev + 1);
    setClickedCells([...clickedCells, index]);
  };
  const getCellSTyle = (index) => {
    return {
      backgroundColor:
        clickedDirtyData === index && clickedCells.includes(index)
          ? "red"
          : clickedCells.includes(index) && "lightgreen",
    };
  };
  const undoHandler = () => {
    const data = [...clickedCells].filter((data) => data !== clickedDirtyData);
    setClickedCells(data);
    setClickedDirtyData(null);
    setDisableUndo(true);
  };
  const resetHandler = () => {
    generateRandomNums();
    setCount(0);
    setClickedCells([]);
    setClickedDirtyData(null);
  };
  return (
    <div className="App">
      <h1>Cross Dirty Grid</h1>
      <div>
        <button onClick={resetHandler}>Reset</button>
        <button onClick={undoHandler} disabled={disableUndo}>
          Undo
        </button>
      </div>
      {/* <div>{randomNumbers.map((data) => data + ",")}</div> */}
      <div style={getStyle()}>
        {[...Array(gridLenth)].map((_, index) => (
          <div
            className="cell"
            onClick={() => clickHandler(index)}
            style={getCellSTyle(index)}
          >
            {index}
          </div>
        ))}
      </div>
      <div className="win-message">{count === 5 && "User won"}</div>
      <div className="dirty-data-message">
        {clickedDirtyData ? "Oops!! clicked dirty data" : null}
      </div>
    </div>
  );
}
