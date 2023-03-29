import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function CalculationTable() {
  const [rows, setRows] = useState([]);
  const [numRows, setNumRows] = useState(5);
  const [header, setHeader] = useState([
    { label: 'PARTICIPATION IN SAFETY', colspan: 1 },
    { label: 'GRADE', colspan: 4 },
  ]);

  const handleNumRowsChange = (e) => {
    const num = parseInt(e.target.value);
    const newRows = [];
    for (let i = 1; i <= num; i++) {
      newRows.push({ name: '', scores: [0, 0, 0, 0, 0], total: 0 });
    }
    setNumRows(num);
    setRows(newRows);
  };

  const handleNameChange = (e, rowIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].name = e.target.value;
    setRows(newRows);
  };

  const handleScoreChange = (e, rowIndex, colIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].scores[colIndex] = parseInt(e.target.value);
    newRows[rowIndex].total = newRows[rowIndex].scores.reduce((acc, cur) => acc + cur, 0);
    setRows(newRows);
  };

  return (
    <div>
      <label>
        Number of Rows:
        <input type="number" value={numRows} onChange={handleNumRowsChange} />
      </label>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((h, index) => (
              <TableCell key={index} colSpan={h.colspan}>
                {h.label}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>1 (Poor)</TableCell>
            <TableCell>2 (Below Average)</TableCell>
            <TableCell>3 (Average)</TableCell>
            <TableCell>4 (Above Average)</TableCell>
            <TableCell>5 (Good)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <input type="text" value={row.name} onChange={(e) => handleNameChange(e, rowIndex)} />
              </TableCell>
              {row.scores.map((score, colIndex) => (
                <TableCell key={colIndex}>
                  <input type="number" value={score} onChange={(e) => handleScoreChange(e, rowIndex, colIndex)} />
                </TableCell>
              ))}
              <TableCell>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CalculationTable;