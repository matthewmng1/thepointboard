import React, { useState } from 'react';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import Accumulative from './Accumulative';
import PositivePoints from './PositivePoints';
import Statistics from './Statistics';
import SetDisplay from './SetDisplay';

const ExportPdf = () => {
  const pdfExportComponent = React.useRef(null);
  const [pdfFilename, setPdfFilename] = useState(''); 


  const exportPDFWithMethod = () => {
    let element = document.querySelector('.k-grid') || document.body;
    savePDF(element, {
      paperSize: 'A4',
      fileName: `${pdfFilename}.pdf`, // Use user input for filename
    });
  };

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return(
    <div>
      <input
        type="text"
        placeholder="Enter PDF filename"
        value={pdfFilename}
        onChange={(e) => setPdfFilename(e.target.value)}
      />
      <button onClick={exportPDFWithComponent}>
        Export Match PDF
      </button>
      <PDFExport 
        forcePageBreak=".page-break" 
        landscape='true' 
        scale={0.5} 
        ref={pdfExportComponent} 
        paperSize="A4" 
        margin={10}
        fileName={`${pdfFilename}.pdf`}
        >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px' }}>
          <SetDisplay num={1}/>
          <SetDisplay num={2}/>
          <SetDisplay num={3}/>
        </div>
        
        <div className="page-break">
          <Accumulative />
        </div>
        <div className="page-break">        
          <PositivePoints />
        </div>
        <div className="page-break">
          <Statistics />
        </div>
      </PDFExport>  
    </div>
  )

}
    
export default ExportPdf;