import React from 'react'
import { useSet } from '../context/SetContext'
import './StatsPointScoring.css'

const StatsPointScoring = ({sets}) => {
  const { pointScoringEfficiency } = useSet()
  return (
    <div className='stats-ps-main'>
			<div className='stats-ps-container'>
				<p className='stats-ps-header'>Point Scoring Efficiency</p>
				<table className='stats-ps-table'>
					<thead className='stats-ps-table-head'>
						<tr>
							<td className='stats-ps-table-title'>Team</td>
							{sets.map((set, idx) => {
								return (
									<td className='stats-ps-table-title'>Set {idx+1}</td>
								)
							})}
						</tr>
					</thead>
					<tbody className='stats-ps-table-body'>
						<tr>
        	    <td>FRVBC</td>
              {sets.map(set => {
          	    const efficiency = pointScoringEfficiency(set).homeEfficiency
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
                const efficiency = pointScoringEfficiency(set).opponentEfficiency;
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

export default StatsPointScoring