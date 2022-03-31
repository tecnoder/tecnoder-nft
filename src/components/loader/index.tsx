import React from 'react';

const Loader = () => {
  return (
    <div className={`loader-wrap d-flex align-items-center justify-content-center`}>
      <div className={`lds-ripple`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader
