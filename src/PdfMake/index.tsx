import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

function PdfMake() {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        // Fetch PDF data from the server
        fetch(`${API_BASE_URL}/pdfmake`)
            .then(response => response.blob())
            .then(blob => {
                // Create a URL for the blob data
                const url = URL.createObjectURL(blob);
                // Set the PDF URL in the state
                setPdfUrl(url);
            })
            .catch(error => {
                console.error('Error fetching PDF:', error);
            });
    }, []);


    return (<div style={{ height: '80vh' }}>
        <h3>PDF make preview</h3>
        <iframe src={pdfUrl} width={"100%"} height={"100%"} />
    </div>)
}

export default PdfMake;