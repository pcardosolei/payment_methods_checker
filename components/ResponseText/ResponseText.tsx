import React, { useState } from "react";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";

interface ResponseTextProps {
  isOpen: boolean;
  text: any;
  title: string;
}

const ResponseText: React.FC<ResponseTextProps> = ({ isOpen, text, title }) => {
  const [sectionOpen, setSectionOpen] = useState<boolean>(isOpen);

  return (
    <div>
      <div
        className="flex flex-row gap-3"
        onClick={() => setSectionOpen(!sectionOpen)}
      >
        <div className="my-auto">
          {sectionOpen ? <FiArrowDown size={32} /> : <FiArrowRight size={32} />}
        </div>
        <h2>{title}</h2>
      </div>
      {sectionOpen && (
        <pre className="bg-gray-400 text-white mx-5 lg:mx-auto lg:w-2/3">
          {JSON.stringify(text, undefined, 2)}
        </pre>
      )}
    </div>
  );
};

export default ResponseText;
