import { NextRequest, NextResponse } from 'next/server';

interface Invoice {
  id: string;
  patientId: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  amountPaid: number;
  status: 'Draft' | 'Issued' | 'Paid' | 'Partially Paid' | 'Pending' | 'Cancelled';
  dueDate: string;
  insuranceCarrier?: string;
  claimStatus?: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

const invoices: Map<string, Invoice> = new Map();

/**
 * GET /api/billing/[id]
 * Retrieve a specific invoice
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoice = invoices.get(id);

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: invoice });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve invoice' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/billing/[id]
 * Update invoice (payment status, claim status, etc.)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoice = invoices.get(id);

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { amountPaid, status, claimStatus } = body;

    if (amountPaid !== undefined) {
      invoice.amountPaid = Math.min(amountPaid, invoice.totalAmount);

      // Auto-update status based on payment
      if (invoice.amountPaid === 0) {
        invoice.status = 'Issued';
      } else if (invoice.amountPaid < invoice.totalAmount) {
        invoice.status = 'Partially Paid';
      } else if (invoice.amountPaid === invoice.totalAmount) {
        invoice.status = 'Paid';
      }
    }

    if (status) invoice.status = status;
    if (claimStatus) invoice.claimStatus = claimStatus;

    invoices.set(id, invoice);

    return NextResponse.json({
      success: true,
      data: invoice,
      message: 'Invoice updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
}
