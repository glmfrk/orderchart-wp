// Generate Invoice
function generateInvoice() {
  const doc = new jsPDF();
  doc.text("Order Invoice", 20, 20);
  doc.text(`Name: ${initialObj.shippingInfo.userName}`, 20, 30);
  doc.text(`Phone: ${initialObj.shippingInfo.userPhone}`, 20, 40);
  doc.text(`Address: ${initialObj.shippingInfo.userAddress}`, 20, 50);
  doc.text(`Order Note: ${initialObj.orderNote}`, 20, 60);

  let y = 70;
  initialObj.items.forEach((item) => {
    doc.text(
      `Item: ${item.title}, Quantity: ${item.quantity}, Price: ${item.price}`,
      20,
      y
    );
    y += 10;
  });

  doc.text(`Subtotal: ${initialObj.subTotal}`, 20, y + 10);
  doc.text(`Shipping: ${initialObj.shippingCharge}`, 20, y + 20);
  doc.text(`Grand Total: ${initialObj.grandTotal}`, 20, y + 30);

  doc.save("invoice.pdf");
}

// Send Email
function sendEmail() {
  // Note: This function requires a backend service to send the email
  fetch("https://your-backend-service.com/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: "golamfaruk204@gmail.com",
      subject: "Order Invoice",
      body: "Please find attached the order invoice.",
      attachments: [
        {
          filename: "invoice.pdf",
          content: btoa(generateInvoice().output()),
          encoding: "base64",
        },
      ],
    }),
  }).then((response) => {
    if (response.ok) {
      alert("Invoice sent successfully!");
    } else {
      alert("Failed to send the invoice.");
    }
  });
}
