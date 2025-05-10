import { useState, useRef, useEffect } from "react";
export const InteractiveShape = () => {
  const [grid, setGrid] = useState(
    new Array(3).fill().map(() => new Array(3).fill(false))
  );

  const queue = useRef([]);

  const handleOnClick = (rowIdx, colIdx) => {
    const gridDeepCopy = grid.map((row) => [...row]);
    gridDeepCopy[rowIdx][colIdx] = true;
    queue.current.push([rowIdx, colIdx]);
    setGrid(gridDeepCopy);
  };

  useEffect(() => {
    if (queue.current.length === 9) {
      queue.current.forEach(([rowIdx, colIdx], idx) => 
        
    );
    }
  }, [grid]);

  return (
    <div className="container">
      {grid.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <div
            className={`cell ${cell ? "active" : ""}`}
            key={`${rowIdx}-${colIdx}`}
            onClick={() => handleOnClick(rowIdx, colIdx)}
          ></div>
        ))
      )}
    </div>
  );
};
