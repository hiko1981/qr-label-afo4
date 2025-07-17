import QRCode from "qrcode"; 
 return await QRCode.toBuffer(text, { type: "png", width: 512 }); 
} 
