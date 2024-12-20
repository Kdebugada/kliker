import React from 'react';

interface ClickableImageProps {
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export const ClickableImage: React.FC<ClickableImageProps> = ({ onClick }) => (
  <img
    src="https://i.ibb.co/L1S7LRT/LS20241215204559.png"
    alt="Кликабельная модель"
    className="w-64 h-64 object-contain cursor-pointer active:scale-95 transition-transform"
    onClick={onClick}
  />
);