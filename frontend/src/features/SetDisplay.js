import React, { useState } from 'react'
import { useSet } from '../context/SetContext'
import SetDisplayCard from '../components/SetDisplayCard'
import './SetDisplay.css'

const SetDisplay = ({num}) => {
  const homeTeam = "FRVBC"
  const awayTeam = "OPPONENT"

  const {
    sets, 
    updateSet, 
    calculateUnforcedErrors, 
    calculateScores, 
    pointScoringEfficiency,
    sideoutEfficiency,
    pointRatio
  } = useSet()

  const set = sets[num - 1] || { players: [], opponents: [] };

  const unforcedErrors = calculateUnforcedErrors(set);
  const scores = calculateScores(set)
  const scoringEfficiency = pointScoringEfficiency(set)
  const sideoutPercentage = sideoutEfficiency(set)
  const pointRatios = pointRatio(set)

    return (
        <div className='set-main'>
          <div className='set-main-header'>
            Set {num}
          </div>
          <div className='set-container'>
            <div className='set-main-stats'>
              <div className='set-home'>
                <SetDisplayCard team={homeTeam} players={set.players} />
              </div>
              <div className='set-opponent'>
                <SetDisplayCard team={awayTeam} players={set.opponents} />
              </div>
            </div>
            <div className='set-display-side-stats'>
              <div className='set-display-side-div'>
                <p className='set-display-side-stat-name'>Unforced Errors</p>
                <div className='set-display-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{unforcedErrors.playerErrors}</div>
                </div>
                <div className='set-display-side-inner-div'>
                  <div>Opponent</div>
                  <div>{unforcedErrors.opponentErrors}</div>
                </div>
              </div>
              <div className='set-display-side-div'>
                <p className='set-display-side-stat-name'>Scores</p>
                <div className='set-display-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{scores.homeScore}</div>
                </div>
                <div className='set-display-side-inner-div'>
                  <div>Opponent</div>
                  <div>{scores.opponentScore}</div>
                </div>

              </div>

              <div className='set-display-side-div'>
                <p className='set-display-side-stat-name'>Scoring Efficiency</p>
                <div className='set-display-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{isNaN(scoringEfficiency.homeEfficiency) ? "n/a" : scoringEfficiency.homeEfficiency + "%"}</div>
                </div>
                <div className='set-display-side-inner-div'>
                  <div>Opponent</div>
                  <div>{isNaN(scoringEfficiency.opponentEfficiency) ? "n/a" : scoringEfficiency.opponentEfficiency + "%"}</div>
                </div>
              </div>
              <div className='set-display-side-div'>
                <p className='set-display-side-stat-name'>Sideout Percentage</p>
                <div className='set-display-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{isNaN(sideoutPercentage.homeSideoutEfficiency) ? "n/a" : sideoutPercentage.homeSideoutEfficiency + "%"}</div>
                </div>
                <div className='set-side-inner-div'>
                  <div>Opponent</div>
                  <div>{isNaN(sideoutPercentage.opponentSideoutEfficiency) ? "n/a" : sideoutPercentage.opponentSideoutEfficiency + "%"}</div>
                </div>
              </div>
              <div className='set-display-side-div'>
                <p className='set-display-side-stat-name'>Point Ratios</p>
                <div className='set-display-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{isNaN(pointRatios.homePointRatio) ? "n/a" : pointRatios.homePointRatio + "to 1"}</div>
                </div>
                <div className='set-display-side-inner-div'>
                  <div>Opponent</div>
                  <div>{isNaN(pointRatios.opponentPointRatio) ? "n/a" : pointRatios.opponentPointRatio + "to 1"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default SetDisplay;
