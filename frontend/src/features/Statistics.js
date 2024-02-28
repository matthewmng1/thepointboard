import React from 'react'
import StatsPointBoard from '../components/StatsPointBoard';
import StatsPointScoring from '../components/StatsPointScoring';
import StatsSideOut from '../components/StatsSideOut';
import { useSet } from '../context/SetContext';
import './Statistics.css'

const Statistics = () => {
  const { sets } = useSet()
  return (
    <div className='statistics-main'>
      <div className='statistics-container'>
        <div className='statistics-point-board'>
          <StatsPointBoard sets={sets} />
        </div>
        <div className='statistics-so-ps'>
          <StatsSideOut sets={sets} />
          <StatsPointScoring sets={sets}/>
        </div>
      </div>
    </div>
  )
}

export default Statistics;

// POSITIVE POINT SHEET
  // CALCULATE STAT TOTALS PER SET PER STATISTIC
  // CALCULATE TOTAL % OF POINTS SCORED PER STATISTIC (OVERALL STAT / TOTAL POINTS SCORE)
  // CALCULATE TOTAL % OF ERRORS PER STATISTIC (OVERALL ERROR STAT / TOTAL OPPONENT POINTS SCORE)
    // CREATE A SEPARATE OBJECT TO CONTAIN BOTH HOME & OPPONENT STATISTIC CATEGORY FOR ALL SETS?

// SIDEOUT EFFICIENCY
  // DISPLAY SIDEOUT EFFICIENCY PER SET
  // AVERAGE THE SIDEOUT EFFICIENCY

// SCORING EFFICIENCY
  // DISPLAY SCORING EFFICIENCY - OPPONENT ERRORS PER SET
  // DISPLAY SCORING EFFICIENCY + OPPONENT ERRORS PER SET
  // TOTAL UP BOTH OF THE ABOVE
