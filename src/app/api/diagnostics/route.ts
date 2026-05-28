import { NextRequest, NextResponse } from 'next/server';

export interface DiagnosticOrder {
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
 * GET /api/diagnostics
 * Retrieve diagnostic orders with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const patientId = searchParams.get('patientId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let filteredOrders = Array.from(diagnosticOrders.values());

    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    }

    if (type) {
      filteredOrders = filteredOrders.filter(o => o.type === type);
    }

    if (patientId) {
      filteredOrders = filteredOrders.filter(o => o.patientId === patientId);
    }

    const total = filteredOrders.length;
    const start = (page - 1) * limit;
    const paginatedOrders = filteredOrders.slice(start, start + limit);

    return NextResponse.json({
      success: true,
      data: paginatedOrders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve diagnostic orders' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/diagnostics
 * Create a new diagnostic order
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, type, description, estimatedETA, assignedTechnicianId } = body;

    if (!patientId || !type || !description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: patientId, type, description',
        },
        { status: 400 }
      );
    }

    const orderId = `DIAG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newOrder: DiagnosticOrder = {
      id: orderId,
      patientId,
      orderDate: new Date().toISOString(),
      type,
      description,
      status: 'Pending',
      estimatedETA: estimatedETA || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      assignedTechnicianId: assignedTechnicianId || undefined,
    };

    diagnosticOrders.set(orderId, newOrder);

    return NextResponse.json(
      { success: true, data: newOrder, message: 'Diagnostic order created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create diagnostic order' },
      { status: 500 }
    );
  }
}
