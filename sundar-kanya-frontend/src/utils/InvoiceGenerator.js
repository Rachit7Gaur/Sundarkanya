import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getLogoBase64 } from "./logoToBase64";

const generateInvoice = async (order) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "normal");

  // Header Background
  doc.setFillColor(214, 51, 132);
  doc.rect(0, 0, 210, 30, "F");

  // Logo
  const logo = await getLogoBase64();

  doc.addImage(logo, "JPEG", 15, 5, 20, 20);

  // Company Name
  doc.setTextColor(255, 255, 255);

  doc.setFontSize(22);
  doc.text("SundarKanya", 42, 15);

  doc.setFontSize(11);
  doc.text("Premium Jewellery Store", 42, 22);

  doc.setFontSize(12);
  doc.text("Order Invoice", 42, 28);

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Order Details
  doc.setFontSize(12);

  doc.text(`Invoice No : INV-${order._id.slice(-6)}`, 15, 45);

  doc.text(`Order ID : ${order._id}`, 15, 53);

  doc.text(
    `Date : ${new Date(order.createdAt).toLocaleDateString()}`,
    15,
    61
  );

  // Customer Details
  doc.setFontSize(14);
  doc.text("Customer Details", 15, 75);

  doc.setFontSize(11);

  doc.text(order.shippingAddress.fullName, 15, 83);

  doc.text(order.shippingAddress.phone, 15, 90);

  doc.text(order.shippingAddress.address, 15, 97);

  doc.text(
    `${order.shippingAddress.city}, ${order.shippingAddress.state}`,
    15,
    104
  );

  doc.text(order.shippingAddress.pincode, 15, 111);

  // Product Table
  autoTable(doc, {
    startY: 125,

    head: [["Product", "Qty", "Price", "Subtotal"]],

    body: order.items.map((item) => [
      item.name,
      item.quantity,
      `Rs. ${Number(item.price).toFixed(2)}`,
      `Rs. ${(Number(item.price) * Number(item.quantity)).toFixed(2)}`,
    ]),

    headStyles: {
      fillColor: [214, 51, 132],
    },

    styles: {
      font: "helvetica",
      fontSize: 11,
    },
  });

  const finalY = doc.lastAutoTable.finalY + 15;

  doc.setFontSize(12);

  doc.text(
    `Payment Method : ${order.paymentMethod}`,
    15,
    finalY
  );

  doc.text(
    `Payment Status : ${order.paymentStatus}`,
    15,
    finalY + 8
  );

  doc.setFontSize(15);

  doc.text(
    `Grand Total : Rs. ${Number(order.totalAmount).toFixed(2)}`,
    15,
    finalY + 22
  );

  // Footer Line
  doc.setDrawColor(214, 51, 132);

  doc.line(15, finalY + 30, 195, finalY + 30);

  // Footer
  doc.setFontSize(10);

  doc.text(
    "Thank you for shopping with SundarKanya",
    105,
    finalY + 42,
    { align: "center" }
  );

  doc.text(
    "https://sundarkanya-five.vercel.app",
    105,
    finalY + 49,
    { align: "center" }
  );

  doc.save(`Invoice-${order._id.slice(-6)}.pdf`);
};

export default generateInvoice;