import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

export default Card;
