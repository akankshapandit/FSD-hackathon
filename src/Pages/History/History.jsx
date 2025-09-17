import React, { useState, useEffect } from 'react';

// Mock service that simulates your backend API
// Replace this with actual API calls when backend is ready
const HistoryAPI = {
  // Simulate fetching invoices
  getInvoices: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data that matches your expected backend response
    return [
      {
        _id: '1',
        invoiceNumber: 'INV-2024-001',
        clientName: 'John Doe Corporation',
        clientEmail: 'john@doecorp.com',
        clientAddress: '123 Business St, City, State 12345',
        invoiceDate: '2024-01-15T00:00:00.000Z',
        dueDate: '2024-01-30T00:00:00.000Z',
        items: [
          { description: 'Web Development Services', quantity: 10, price: 75.00 },
          { description: 'Consulting Hours', quantity: 5, price: 120.00 }
        ],
        subtotal: 1350.00,
        tax: 135.00,
        totalAmount: 1485.00,
        status: 'paid',
        notes: 'Thank you for your business!'
      },
      {
        _id: '2',
        invoiceNumber: 'INV-2024-002',
        clientName: 'Jane Smith Enterprises',
        clientEmail: 'jane@smith.com',
        clientAddress: '456 Enterprise Ave, City, State 12345',
        invoiceDate: '2024-01-20T00:00:00.000Z',
        dueDate: '2024-02-05T00:00:00.000Z',
        items: [
          { description: 'Mobile App Development', quantity: 20, price: 85.00 },
          { description: 'UI/UX Design', quantity: 8, price: 95.00 }
        ],
        subtotal: 2460.00,
        tax: 246.00,
        totalAmount: 2706.00,
        status: 'pending',
        notes: 'Payment due upon receipt'
      },
      {
        _id: '3',
        invoiceNumber: 'INV-2024-003',
        clientName: 'Tech Solutions Ltd',
        clientEmail: 'billing@techsolutions.com',
        clientAddress: '789 Tech Park, City, State 12345',
        invoiceDate: '2024-01-10T00:00:00.000Z',
        dueDate: '2024-01-25T00:00:00.000Z',
        items: [
          { description: 'Cloud Hosting', quantity: 1, price: 299.00 },
          { description: 'Maintenance', quantity: 3, price: 150.00 }
        ],
        subtotal: 749.00,
        tax: 74.90,
        totalAmount: 823.90,
        status: 'overdue',
        notes: 'Please contact for payment options'
      }
    ];
  },

  // Simulate downloading an invoice
  downloadInvoice: async (invoiceId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // In real implementation, this would return a PDF blob
    console.log(`Downloading invoice ${invoiceId}`);
    return new Blob(['Mock PDF content'], { type: 'application/pdf' });
  }
};

const History = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Fetch invoices from backend API
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching invoices from HistoryAPI...');
      
      // USING MOCK API - REPLACE WITH ACTUAL API CALL WHEN READY
      const data = await HistoryAPI.getInvoices();
      // ACTUAL IMPLEMENTATION (UNCOMMENT WHEN BACKEND IS READY):
      // const response = await fetch('/api/invoices', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // if (!response.ok) throw new Error('Failed to fetch invoices');
      // const data = await response.json();
      
      setInvoices(data);
      console.log('Invoices loaded successfully:', data.length, 'invoices');
      
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setError(err.message || 'Error loading invoices. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Download invoice as PDF
  const downloadInvoice = async (invoiceId, invoiceNumber) => {
    try {
      setError('');
      
      console.log(`Downloading invoice: ${invoiceNumber} (ID: ${invoiceId})`);
      
      // USING MOCK API - REPLACE WITH ACTUAL API CALL WHEN READY
      const blob = await HistoryAPI.downloadInvoice(invoiceId);
      // ACTUAL IMPLEMENTATION (UNCOMMENT WHEN BACKEND IS READY):
      // const response = await fetch(`/api/invoices/${invoiceId}/download`, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // if (!response.ok) throw new Error('Failed to download invoice');
      // const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      console.log('Invoice downloaded successfully');
      
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download invoice: ' + err.message);
    }
  };

  // View invoice details
  const viewInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
  };

  // Close invoice details
  const closeInvoiceDetails = () => {
    setSelectedInvoice(null);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return '#28a745';
      case 'pending': return '#ffc107';
      case 'overdue': return '#dc3545';
      case 'draft': return '#6c757d';
      default: return '#6c757d';
    }
  };

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '18px',
        color: '#666'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '10px' }}>📋</div>
          Loading invoices from HistoryAPI...
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '20px', color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        Invoice History
      </h1>

      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#ffeaa7',
          color: '#d63031',
          border: '1px solid #fab1a0',
          borderRadius: '5px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>⚠️ {error}</span>
          <button
            onClick={() => setError('')}
            style={{
              background: 'none',
              border: 'none',
              color: '#d63031',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Search and Controls */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '20px', 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="🔍 Search by invoice number, client name, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '6px',
            flex: '1',
            minWidth: '300px',
            fontSize: '14px',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3498db'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <button
          onClick={fetchInvoices}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Info Banner */}
      <div style={{
        padding: '12px',
        backgroundColor: '#d4edda',
        color: '#155724',
        border: '1px solid #c3e6cb',
        borderRadius: '5px',
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        ℹ️ Currently using mock data. Connect to your backend API by updating the API calls in the code.
      </div>

      {filteredInvoices.length === 0 ? (
        <div style={{
          padding: '60px 40px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          color: '#6c757d',
          border: '2px dashed #dee2e6'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📄</div>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>
            {searchTerm ? 'No invoices found' : 'No invoices available'}
          </h3>
          <p style={{ margin: 0 }}>
            {searchTerm ? 'Try adjusting your search terms' : 'Generate invoices to see them here'}
          </p>
        </div>
      ) : (
        <div style={{
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr 1fr 1fr 1fr 0.8fr 1fr',
            backgroundColor: '#2c3e50',
            color: 'white',
            padding: '16px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            <div>Invoice #</div>
            <div>Client</div>
            <div>Date</div>
            <div>Due Date</div>
            <div>Amount</div>
            <div>Status</div>
            <div style={{ textAlign: 'center' }}>Actions</div>
          </div>

          {/* Table Rows */}
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice._id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr 1fr 1fr 1fr 0.8fr 1fr',
                padding: '16px',
                borderBottom: '1px solid #e9ecef',
                alignItems: 'center',
                backgroundColor: 'white',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={{ fontWeight: '600', color: '#2c3e50' }}>
                {invoice.invoiceNumber}
              </div>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {invoice.clientName}
                </div>
                <div style={{ color: '#6c757d', fontSize: '13px' }}>
                  {invoice.clientEmail}
                </div>
              </div>
              <div>{formatDate(invoice.invoiceDate)}</div>
              <div>{formatDate(invoice.dueDate)}</div>
              <div style={{ fontWeight: '600', color: '#2c3e50' }}>
                ${invoice.totalAmount?.toFixed(2)}
              </div>
              <div>
                <span
                  style={{
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: getStatusColor(invoice.status),
                    color: 'white',
                    display: 'inline-block',
                    minWidth: '70px',
                    textAlign: 'center'
                  }}
                >
                  {invoice.status?.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button
                  onClick={() => viewInvoiceDetails(invoice)}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #3498db',
                    backgroundColor: 'transparent',
                    color: '#3498db',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#3498db';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#3498db';
                  }}
                >
                  👁️ View
                </button>
                <button
                  onClick={() => downloadInvoice(invoice._id, invoice.invoiceNumber)}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #27ae60',
                    backgroundColor: 'transparent',
                    color: '#27ae60',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#27ae60';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#27ae60';
                  }}
                >
                  📥 Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#2c3e50' }}>Invoice Details</h2>
              <button
                onClick={closeInvoiceDetails}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#3498db', marginBottom: '10px' }}>{selectedInvoice.invoiceNumber}</h3>
              <p><strong>Status:</strong> <span style={{ 
                color: getStatusColor(selectedInvoice.status),
                fontWeight: 'bold'
              }}>{selectedInvoice.status}</span></p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2c3e50' }}>Client Information</h4>
              <p><strong>Name:</strong> {selectedInvoice.clientName}</p>
              <p><strong>Email:</strong> {selectedInvoice.clientEmail}</p>
              <p><strong>Address:</strong> {selectedInvoice.clientAddress}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2c3e50' }}>Dates</h4>
              <p><strong>Invoice Date:</strong> {formatDate(selectedInvoice.invoiceDate)}</p>
              <p><strong>Due Date:</strong> {formatDate(selectedInvoice.dueDate)}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#2c3e50' }}>Amount</h4>
              <p><strong>Total:</strong> ${selectedInvoice.totalAmount?.toFixed(2)}</p>
            </div>

            {selectedInvoice.notes && (
              <div>
                <h4 style={{ color: '#2c3e50' }}>Notes</h4>
                <p>{selectedInvoice.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;