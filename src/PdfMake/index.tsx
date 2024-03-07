import { useEffect, useState } from "react";
import pdfmake from 'pdfmake';

function PdfMake() {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        // Fetch PDF data from the server
        fetch('https://probable-fiesta-vw7556r5q5qh6qr6-3090.app.github.dev/pdfmake')
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

    // const docDefinition = {
    //     content: ['Hello world']
    // };

    // const pdfDocGenerator = pdfmake.createPdf(docDefinition);
    // pdfDocGenerator.getDataUrl((dataUrl: string) => setPdfUrl(dataUrl))


    return (<div style={{ height: '80vh' }}>
        <h3>PDF make preview</h3>
        <iframe src={pdfUrl} width={"100%"} height={"100%"} />
    </div>)
}

export default PdfMake;