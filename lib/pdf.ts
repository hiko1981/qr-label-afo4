import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePDFBuffer(qrBuffer: Buffer, text: string): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 600]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const qrImage = await pdfDoc.embedPng(qrBuffer);

  page.drawText(text, { x: 40, y: 500, size: 16, font });
  page.drawImage(qrImage, { x: 100, y: 250, width: 200, height: 200 });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
