import JsPDF from 'jspdf';


function ExportPDF(props) {
const generatePDF = () => {

    const report = new JsPDF('portrait','pt','a4');
    report.html(document.querySelector('#report2')).then(() => {
    report.save('report.pdf');
 
 
    });
}

return (
    <button onClick={generatePDF} type="button">Export PDF</button>
);
}

export default ExportPDF;
