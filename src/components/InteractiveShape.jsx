import { useState, useRef, useEffect } from "react";

export const InteractiveShape = () => {
  const [grid, setGrid] = useState(
    new Array(3).fill().map(() => new Array(3).fill(false))
  );

  const queue = useRef([]);
  const timerId = useRef([]);

  const handleOnClick = (rowIdx, colIdx, flag) => {
    if (timerId.current.length > 0 && flag) {
      return;
    }
    if (grid[rowIdx][colIdx] && flag) {
      return;
    }
    if (flag) {
      queue.current.push([rowIdx, colIdx]);
    }
    setGrid((prevGrid) => {
      const gridDeepCopy = prevGrid.map((row) => [...row]);
      gridDeepCopy[rowIdx][colIdx] = flag;
      return gridDeepCopy;
    });
  };

  useEffect(() => {
    if (queue.current.length === 9) {
      queue.current.forEach(([rowIdx, colIdx], idx) => {
        timerId.current[idx] = setTimeout(() => {
          handleOnClick(rowIdx, colIdx, false);
          if (idx === timerId.current.length - 1) {
            timerId.current = [];
          }
        }, 1000 * (idx + 1));
      });
      queue.current = [];
    }
  }, [grid]);

  useEffect(() => {
    return () => {
      timerId.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <div className="container">
      {grid.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <div
            className={`cell ${cell ? "active" : ""}`}
            key={`${rowIdx}-${colIdx}`}
            onClick={() => handleOnClick(rowIdx, colIdx, true)}
          ></div>
        ))
      )}
    </div>
  );
};
