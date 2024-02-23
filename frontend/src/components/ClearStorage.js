import React, { useState } from 'react';
import './ClearStorage.css'

const ClearStorage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
    // You might want to add additional logic here if you need to update your component state after clearing local storage
  };

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    clearLocalStorage();
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className='clear-storage-main'>
      <div className='clear-storage-container'>
        {showConfirmation &&
          <div className="confirm-clear-overlay">
            <div className="confirm-clear-div">
              <p>Clear Match Data?</p>
              <p>This action cannot be undone.</p>
              <div className='confirm-clear-btns'>
                <button className='confirm clear-btn' onClick={handleConfirm}>Confirm</button>
                <button className='cancel clear-btn' onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        }
        <button className='clear-data-btn' onClick={handleConfirmation}>Clear Match Data</button>
      </div>
    </div>
  );
};

export default ClearStorage;
