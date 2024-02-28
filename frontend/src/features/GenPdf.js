import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';
import SetDisplay from './SetDisplay';
import Accumulative from './Accumulative';
import PositivePoints from './PositivePoints';
import Statistics from './Statistics';
import gearLoader from '../assets/gearLoader.gif'

const GenPdf = () => {
  const [pdfFilename, setPdfFilename] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const pdfRef = useRef();
  const page1Ref = useRef();
  const page2Ref = useRef();
  const page3Ref = useRef();
  const page4Ref = useRef();
  const page5Ref = useRef();
  const page6Ref = useRef();


  const CapturePageContent = async (divRef) => {
    try {
      const canvas = await html2canvas(divRef.current);
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing page content:', error);
      return null;
    }
  };

  const GeneratePDF = async () => {
    setIsLoading(true);
    const pdf = new jsPDF('l', 'mm', 'a4', true);
    const page1Image = await CapturePageContent(page1Ref);
    const page2Image = await CapturePageContent(page2Ref);
    const page3Image = await CapturePageContent(page3Ref);
    const page4Image = await CapturePageContent(page4Ref);
    const page5Image = await CapturePageContent(page5Ref);
    const page6Image = await CapturePageContent(page6Ref);



    const fitImageToPage = (imageData) => {
      const imgProps = pdf.getImageProperties(imageData);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = imgWidth / imgProps.width * imgProps.height;
      return { imgWidth, imgHeight };
    };

    if (page1Image) {
      const { imgWidth, imgHeight } = fitImageToPage(page1Image);
      pdf.addImage(page1Image, 'PNG', 10, 10, imgWidth, 0);
    }


    if (page2Image) {
      pdf.addPage();
      const { imgWidth, imgHeight } = fitImageToPage(page2Image);
      pdf.addImage(page2Image, 'PNG', 10, 10, imgWidth, imgHeight); 
    }


    if (page3Image) {
      pdf.addPage();
      const { imgWidth, imgHeight } = fitImageToPage(page3Image);
      pdf.addImage(page3Image, 'PNG', 10, 10, imgWidth, imgHeight);
    }


    if (page4Image) {
      pdf.addPage();
      const { imgWidth, imgHeight } = fitImageToPage(page4Image);
      pdf.addImage(page4Image, 'PNG', 10, 10, imgWidth, imgHeight);
    }


    if (page5Image) {
      pdf.addPage();
      const { imgWidth, imgHeight } = fitImageToPage(page5Image);
      pdf.addImage(page5Image, 'PNG', 10, 10, imgWidth, imgHeight);
    }

    if (page6Image) {
      pdf.addPage();
      const { imgWidth, imgHeight } = fitImageToPage(page6Image);
      pdf.addImage(page6Image, 'PNG', 10, 10, imgWidth, imgHeight);
    }

    setIsLoading(false);
    setPdfFilename('');
    pdf.save(`${pdfFilename}.pdf`);
    
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter PDF filename"
          value={pdfFilename}
          onChange={(e) => setPdfFilename(e.target.value)}
        />
        <button onClick={GeneratePDF}>Generate Match PDF</button>
      </div>
      {isLoading 
        && 
        <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
          Please wait. Your PDF is being processed...
          <img src={gearLoader} style={{width: '40%'}}/>
        </div>}
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <div ref={page1Ref}>
            <SetDisplay num={1} />
          </div>

          <div ref={page2Ref}>
            <SetDisplay num={2} />
          </div>
          <div ref={page3Ref}>
            <SetDisplay num={3} />
          </div>
          <div ref={page4Ref}>
            <Accumulative />
          </div>
          <div ref={page5Ref}>
            <PositivePoints />
          </div>
          <div ref={page6Ref}>
            <Statistics />
          </div>
        </div>
    </>
  );
};

export default GenPdf