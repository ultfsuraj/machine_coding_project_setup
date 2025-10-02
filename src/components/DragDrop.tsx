'use client';

import { useRef, useState } from 'react';

const tableData = [
  ['task 1', 'task 2', 'task-3'],
  ['task 4', 'task 5', 'task-6'],
  ['task 7', 'task 8', 'task-9'],
];

const DragDrop = () => {
  const [data, setData] = useState<string[][]>(tableData);
  const from = useRef<{ tableIndex: number; itemIndex: number }>(null);

  return (
    <div className="flex max-w-[400px] flex-col">
      <div className="flex gap-4 bg-neutral-800 p-4">
        {data.map((tasks, tableIndex) => (
          <table
            key={tableIndex}
            className="gap-2 text-center"
            onDrop={(e) => {
              setData((prev) => {
                const newData = [...prev];
                const newTable = tableIndex;
                if (from.current) {
                  const { tableIndex: oldTable, itemIndex } = from.current;
                  newData[newTable] = [...newData[newTable]];
                  newData[oldTable] = [...newData[oldTable]];
                  newData[newTable].push(newData[oldTable][itemIndex]);
                  newData[oldTable].splice(itemIndex, 1);
                }
                return newData;
              });
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            <thead>
              <tr className="bg-amber-50">
                <th>
                  <h2>Heading {tableIndex}</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((data, index) => (
                <tr
                  key={index}
                  className="bg-amber-600"
                  draggable
                  onDragStart={(e) => {
                    from.current = { tableIndex, itemIndex: index };
                  }}
                >
                  <td>{data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>

      {/* file upload */}
    </div>
  );
};

export default DragDrop;
