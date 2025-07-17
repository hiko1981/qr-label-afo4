import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; 
 const pdfDoc = await PDFDocument.create(); 
 const page = pdfDoc.addPage([400, 600]); 
 const font = await pdfDoc.embedFont(StandardFonts.Helvetica); 
 const qrImage = await pdfDoc.embedPng(qrBuffer); 
 page.drawText(text, { x: 40, y: 500, size: 16, font }); 
 page.drawImage(qrImage, { x: 100, y: 250, width: 200, height: 200 }); 
 return await pdfDoc.saveAsBase64({ dataUri: false }); 
} 
