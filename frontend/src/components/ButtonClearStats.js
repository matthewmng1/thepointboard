import React, { useState } from 'react';
import { useSet } from '../context/SetContext';
import './Button.css'

const ButtonClearStats = () => {
    const { resetAllStats } = useSet();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleConfirmation = () => {
      setShowConfirmation(true);
    };

    const handleConfirm = () => {
        resetAllStats();
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
              <p>Clear Stats?</p>
              <p>This action cannot be undone.</p>
              <div className='confirm-clear-btns'>
                <button className='confirm clear-btn' onClick={handleConfirm}>Confirm</button>
                <button className='cancel clear-btn' onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        }
        <button onClick={handleConfirmation} className='clear-data-btn'>Reset Stats</button>
      </div>
    </div>
    );
};

export default ButtonClearStats;
