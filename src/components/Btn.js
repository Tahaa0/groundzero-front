import React from 'react';

const Btn = ({ onClick, type = 'button', children, classes = '' }) => {
  return (
    <button className={`init-btn ${classes}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Btn;
