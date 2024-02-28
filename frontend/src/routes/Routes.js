import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Accumulative from '../features/Accumulative'
import GenPdf from '../features/GenPdf'
import PlayersForm from '../features/PlayersForm'
import PositivePoints from '../features/PositivePoints'
import Set from '../features/Set'
import Statistics from '../features/Statistics'

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/playersform" element={<PlayersForm />}/>
            <Route path="/set1" element={<Set num={1}/>}/>
            <Route path="/set2" element={<Set num={2}/>}/>
            <Route path="/set3" element={<Set num={3}/>}/>
            {/* <Route path="/set4" element={<Set num={4}/>}/>
            <Route path="/set5" element={<Set num={5}/>}/> */}
            <Route path="/accumulative" element={<Accumulative />}/>
            <Route path="/positivepoints" element={<PositivePoints />}/>
            <Route path="/statistics" element={<Statistics />}/>
            {/* <Route path="/exportpdf" element={<ExportPdf />}/> */}
            <Route path="/genpdf" element={<GenPdf />}/>

        </Routes>
    </div>
  )
}

export default AppRoutes