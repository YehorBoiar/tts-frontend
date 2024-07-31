import React from 'react';

const ContextMenu = ({
  rightClickItem,
  positionX,
  positionY,
  isToggled,
  buttons,
  contextMenuRef,
}) => {
  return (
    <menu
      className={`absolute bg-white shadow-md rounded-md ${isToggled ? 'block' : 'hidden'}`}
      style={{ top: `${positionY + 2}px`, left: `${positionX + 2}px` }}
      ref={contextMenuRef}
    >
      {buttons.map((button, index) => {
        function handleClick(e) {
          e.stopPropagation();
          button.onClick(e, rightClickItem);
        }
        if (button.isSpacer) return <hr key={index} className="border-t my-2" />;
        return (
          <button
            onClick={handleClick}
            key={index}
            className="flex items-center p-2 w-full text-left hover:bg-gray-100"
          >
            <span className="flex-grow">{button.text}</span>
            <span className={`icon ${button.icon}`}></span>
          </button>
        );
      })}
    </menu>
  );
};

export default ContextMenu;