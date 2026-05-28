import { NextRequest, NextResponse } from 'next/server';

interface DiagnosticOrder {
  id: string;
  patientId: string;
  orderDate: string;
  type: 'Pathology' | 'CT Scan' | 'MRI' | 'X-Ray' | 'Ultrasound';
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  estimatedETA: string;
  resultDate?: string;
  results?: string;
  assignedTechnicianId?: string;
}

const diagnosticOrders: Map<string, DiagnosticOrder> = new Map();

/**
 * GET /api/diagnostics/[id]
 * Retrieve a specific diagnostic order
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = diagnosticOrders.get(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Diagnostic order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve diagnostic order' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/diagnostics/[id]
 * Update diagnostic order status and results
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = diagnosticOrders.get(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Diagnostic order not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { status, results, assignedTechnicianId, estimatedETA } = body;

    if (status) {
      order.status = status;
      if (status === 'Completed') {
        order.resultDate = new Date().toISOString();
      }
    }

    if (results) order.results = results;
    if (assignedTechnicianId) order.assignedTechnicianId = assignedTechnicianId;
    if (estimatedETA) order.estimatedETA = estimatedETA;

    diagnosticOrders.set(id, order);

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Diagnostic order updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update diagnostic order' },
      { status: 500 }
    );
  }
}
