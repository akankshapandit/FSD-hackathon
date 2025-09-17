import React, { useState } from "react";
import "./InvoiceGenerator.css";

const InvoiceGenerator = () => {
  // 🔹 Customer Details
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // 🔹 Invoice Metadata
  const [metadata, setMetadata] = useState({
    invoiceNo: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    paymentTerms: "Net 7 days",
  });

  // 🔹 Product / Service Items
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, unitPrice: 0, tax: 0, discount: 0 },
  ]);

  // 🔹 State for invoice generation
  const [invoicePdf, setInvoicePdf] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Handle Customer input
  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handle Metadata input
  const handleMetadataChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  // Handle Items input
  const handleItemChange = (id, e) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // Add new item row
  const addItem = () => {
    setItems([...items, { 
      id: items.length + 1, 
      description: "", 
      quantity: 1, 
      unitPrice: 0, 
      tax: 0, 
      discount: 0 
    }]);
  };

  // Remove item row
  const removeItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  // 🔹 Function to generate invoice PDF
  const generateInvoice = async () => {
    if (!customer.name || !customer.phone) {
      alert("Please enter customer name and phone number");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Prepare invoice data for the API
      const invoiceData = {
        customer,
        metadata,
        items,
        totals: calculateTotals()
      };

      // Call the invoice API to generate PDF
      const response = await invoiceAPI.generateInvoice(invoiceData);
      
      if (response.success) {
        setInvoicePdf(response.pdfUrl);
        setActiveTab("preview");
        alert("Invoice generated successfully!");
      } else {
        alert("Failed to generate invoice. Please try again.");
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("An error occurred while generating the invoice.");
    } finally {
      setIsGenerating(false);
    }
  };

  // 🔹 Function to send invoice via WhatsApp
  const sendViaWhatsApp = async () => {
    if (!customer.phone) {
      alert("Please enter a phone number to send via WhatsApp");
      return;
    }

    if (!invoicePdf) {
      alert("Please generate the invoice first");
      return;
    }

    setIsSending(true);
    
    try {
      // Call the WhatsApp API to send the PDF
      const response = await whatsappAPI.sendInvoice({
        pdfUrl: invoicePdf,
        phoneNumber: customer.phone,
        invoiceNumber: metadata.invoiceNo
      });
      
      if (response.success) {
        alert("Invoice sent successfully via WhatsApp!");
      } else {
        alert("Failed to send invoice. Please try again.");
      }
    } catch (error) {
      console.error("Error sending invoice:", error);
      alert("An error occurred while sending the invoice.");
    } finally {
      setIsSending(false);
    }
  };

  // 🔹 Function to download PDF
  const downloadPdf = () => {
    if (!invoicePdf) {
      alert("Please generate the invoice first");
      return;
    }
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = invoicePdf;
    link.download = `invoice-${metadata.invoiceNo}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🔹 Totals Calculation
  const calculateTotals = () => {
    let subtotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    items.forEach((item) => {
      const itemTotal = item.quantity * item.unitPrice;
      const itemTax = (item.tax / 100) * itemTotal;
      const itemDiscount = (item.discount / 100) * itemTotal;

      subtotal += itemTotal;
      totalTax += itemTax;
      totalDiscount += itemDiscount;
    });

    const grandTotal = subtotal + totalTax - totalDiscount;

    return { subtotal, totalTax, totalDiscount, grandTotal };
  };

  const { subtotal, totalTax, totalDiscount, grandTotal } = calculateTotals();

  return (
    <div className="invoice-app">
      {/* Animated Header */}
      <header className="invoice-header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <h1 className="invoice-title">InvoiceFlow</h1>
          </div>
          <div className="invoice-meta-preview">
            <span className="invoice-badge">Invoice #: {metadata.invoiceNo}</span>
            <span className="invoice-date">Date: {metadata.issueDate}</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            <i className="fas fa-edit"></i> Invoice Details
          </button>
          <button 
            className={`tab ${activeTab === "preview" ? "active" : ""}`}
            onClick={() => setActiveTab("preview")}
            disabled={!invoicePdf}
          >
            <i className="fas fa-eye"></i> Preview & Share
          </button>
        </div>
      </div>

      <div className="invoice-content">
        {activeTab === "details" ? (
          <>
            {/* Customer Details */}
            <section className="invoice-card glass-card">
              <h2 className="section-title">
                <i className="fas fa-user"></i> Customer Details
              </h2>
              <div className="form-grid">
                <div className="input-group">
                  <label>Customer Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter customer name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Phone (WhatsApp-enabled) *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Email (optional)</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={customer.email}
                    onChange={handleCustomerChange}
                  />
                </div>
                <div className="input-group">
                  <label>Address (optional)</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={customer.address}
                    onChange={handleCustomerChange}
                  />
                </div>
              </div>
            </section>

            {/* Invoice Metadata */}
            <section className="invoice-card glass-card">
              <h2 className="section-title">
                <i className="fas fa-file-invoice"></i> Invoice Details
              </h2>
              <div className="form-grid">
                <div className="input-group">
                  <label>Invoice Number</label>
                  <input
                    type="text"
                    name="invoiceNo"
                    value={metadata.invoiceNo}
                    readOnly
                    className="read-only"
                  />
                </div>
                <div className="input-group">
                  <label>Issue Date</label>
                  <input
                    type="date"
                    name="issueDate"
                    value={metadata.issueDate}
                    onChange={handleMetadataChange}
                  />
                </div>
                <div className="input-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={metadata.dueDate}
                    onChange={handleMetadataChange}
                  />
                </div>
                <div className="input-group">
                  <label>Payment Terms</label>
                  <input
                    type="text"
                    name="paymentTerms"
                    value={metadata.paymentTerms}
                    onChange={handleMetadataChange}
                  />
                </div>
              </div>
            </section>

            {/* Product / Service Items */}
            <section className="invoice-card glass-card">
              <div className="section-header">
                <h2 className="section-title">
                  <i className="fas fa-list"></i> Items
                </h2>
                <button onClick={addItem} className="add-btn">
                  <i className="fas fa-plus"></i> Add Item
                </button>
              </div>
              
              <div className="items-table">
                <div className="table-header">
                  <span>Description</span>
                  <span>Qty</span>
                  <span>Unit Price</span>
                  <span>Tax %</span>
                  <span>Discount %</span>
                  <span>Action</span>
                </div>
                
                {items.map((item) => (
                  <div key={item.id} className="table-row">
                    <input
                      type="text"
                      name="description"
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, e)}
                    />
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Qty"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, e)}
                    />
                    <input
                      type="number"
                      name="unitPrice"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, e)}
                    />
                    <input
                      type="number"
                      name="tax"
                      placeholder="0%"
                      min="0"
                      value={item.tax}
                      onChange={(e) => handleItemChange(item.id, e)}
                    />
                    <input
                      type="number"
                      name="discount"
                      placeholder="0%"
                      min="0"
                      value={item.discount}
                      onChange={(e) => handleItemChange(item.id, e)}
                    />
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Totals */}
            <section className="invoice-card glass-card totals-card">
              <h2 className="section-title">
                <i className="fas fa-calculator"></i> Invoice Summary
              </h2>
              <div className="totals-grid">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>₹{totalTax.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Discount:</span>
                  <span>-₹{totalDiscount.toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Grand Total:</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Generate Button */}
            <section className="invoice-card glass-card actions-card">
              <div className="action-buttons">
                <button 
                  className="generate-btn"
                  onClick={generateInvoice}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Generating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-file-pdf"></i> Generate Invoice
                    </>
                  )}
                </button>
              </div>
            </section>
          </>
        ) : (
          /* Preview Tab */
          <section className="preview-container glass-card">
            <div className="preview-header">
              <h2>
                <i className="fas fa-check-circle"></i> Invoice Ready!
              </h2>
              <p>Your invoice has been generated successfully</p>
            </div>
            
            <div className="invoice-preview">
              <div className="preview-details">
                <div className="preview-row">
                  <span>Invoice Number:</span>
                  <span>{metadata.invoiceNo}</span>
                </div>
                <div className="preview-row">
                  <span>Customer:</span>
                  <span>{customer.name}</span>
                </div>
                <div className="preview-row">
                  <span>Grand Total:</span>
                  <span className="preview-total">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="preview-actions">
                <button className="preview-download-btn" onClick={downloadPdf}>
                  <i className="fas fa-download"></i> Download PDF
                </button>
                <button 
                  className="preview-whatsapp-btn"
                  onClick={sendViaWhatsApp}
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fab fa-whatsapp"></i> Send via WhatsApp
                    </>
                  )}
                </button>
              </div>
              
              <div className="back-to-edit">
                <button onClick={() => setActiveTab("details")}>
                  <i className="fas fa-arrow-left"></i> Back to Editing
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Fictional Invoice API implementation
const invoiceAPI = {
  generateInvoice: async (invoiceData) => {
    // In a real implementation, this would connect to your backend
    console.log("Generating invoice with data:", invoiceData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful response with a PDF URL
    return {
      success: true,
      pdfUrl: `https://example.com/invoices/${invoiceData.metadata.invoiceNo}.pdf`,
      message: "Invoice generated successfully"
    };
  }
};

// Fictional WhatsApp API implementation
const whatsappAPI = {
  sendInvoice: async (invoiceData) => {
    // In a real implementation, this would connect to your WhatsApp API
    console.log("Sending invoice via WhatsApp:", invoiceData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful response
    return {
      success: true,
      message: "Invoice sent via WhatsApp"
    };
  }
};

export default InvoiceGenerator;