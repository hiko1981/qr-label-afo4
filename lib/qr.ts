import QRCode from "qrcode";

export async function createQRBuffer(text: string): Promise<Buffer> {
  return await QRCode.toBuffer(text, { type: "png", width: 512 });
}
