import { useEffect, useState } from "react";

function JSPdf() {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        // Fetch PDF data from the server
        fetch('https://probable-fiesta-vw7556r5q5qh6qr6-3090.app.github.dev/jspdf')
            .then(response => response.blob())
            .then(blob => {
                // Create a URL for the blob data
                const url = URL.createObjectURL(blob);
                console.log(url)
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

export default JSPdf;