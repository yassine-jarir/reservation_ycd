import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa6";

interface FormData {
    firstNameLastName: string,
    email: string,
    prix: number,
    depart: string,
    arrive : string,
    date: string
    
}

interface resrevationPDF {
  reservation : FormData
}
function ReservationPDF({ reservation } : resrevationPDF) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add reservation details to the PDF
    doc.text(`Reservation Details : `, 10, 10);
    doc.text(`Name: ${reservation.firstNameLastName}`, 10, 20);
    doc.text(`Email: ${reservation.email}`, 10, 30);
    doc.text(`Date: ${reservation.date}`, 10, 40);
    doc.text(`Date: ${reservation.depart}`, 10, 50);
    doc.text(`Date: ${reservation.arrive}`, 10, 60);
    doc.text(`Prix: ${reservation.prix} DH`, 10, 70);
 
    // Save the r PDF
    doc.save("reservation.pdf");
  };

  return (
    <div>
 
      <button onClick={downloadPDF} type="button" className="float-end	 mt-[2rem] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex justify-center items-center"><FaFilePdf/> Download </button>

    </div>
  );
}

export default ReservationPDF;