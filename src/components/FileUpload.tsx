'use client';

import { cn } from '@/utils/util';
import { useEffect, useState } from 'react';

const FileUpload = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<object[]>([]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div className="flex w-full justify-center">
      <div
        className={cn('border border-cyan-800 p-20', dragging ? 'bg-emerald-100' : '')}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={() => {
          setDragging(true);
        }}
        onDragLeave={() => {
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          console.log(e.target.files);
          console.log(URL.createObjectURL(e.target.files[0]));
          setFiles([e.target.files]);
        }}
      >
        <label>
          Browse Files
          <input
            className="hidden"
            type="file"
            multiple
            onChange={(e) => {
              console.log(e.target.files);
            }}
          />
        </label>
      </div>
      <div className="flex flex-col gap-2">
        {files.map((item, index) => (
          <div key={index} className="p-2">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
