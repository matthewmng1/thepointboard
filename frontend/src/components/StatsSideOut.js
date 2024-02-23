import React from 'react'
import { useSet } from '../context/SetContext'
import './StatsSideOut.css'

const StatsSideOut = ({sets}) => {
	const { sideoutEfficiency } = useSet()

  return (
    <div className='stats-so-main'>
      <div className='stats-so-container'>
				<p className='stats-so-header'>Sideout Efficiency</p>
				<table className='stats-so-table'>
					<thead className='stats-so-table-head'>
						<tr>
              <td className='stats-so-table-title'>Team</td>
              {sets.map((set, idx) => {
                return (
                  <td className='stats-so-table-title'>Set {idx+1}</td>
                )
              })}
            </tr>
					</thead>
					<tbody className='stats-so-table-body'>
						<tr>
              <td >FRVBC</td>
              {sets.map(set => {
                const efficiency = sideoutEfficiency(set).homeSideoutEfficiency
                return (
                  <td>
                    {isNaN(efficiency) ? "0%" : `${efficiency}%`}
                  </td>
                );
              })}
            </tr>
            <tr>
      	      <td>OPPONENT</td>
              {sets.map(set => {
                const efficiency = sideoutEfficiency(set).opponentSideoutEfficiency;
                return (
                  <td>
        	          {isNaN(efficiency) ? "0%" : `${efficiency}%`}
                  </td>
                );
              })} 
            </tr>
					</tbody>
				</table>
			</div>
    </div>
  )
}

export default StatsSideOut;