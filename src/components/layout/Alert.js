import React from 'react';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.typr}`}>
        <i className='fa fa-info-circle'> {alert.msg}</i>
      </div>
    )
  );
};

export default Alert;
