import { NextRequest, NextResponse } from 'next/server';

export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  status: 'Critical' | 'Observation' | 'Stable';
  admissionDate: string;
  dischargeDate?: string;
  clinicalHistory: string[];
}

const patients: Map<string, Patient> = new Map();

/**
 * GET /api/patients
 * Retrieve all patients or filter by status
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let filteredPatients = Array.from(patients.values());

    if (status) {
      filteredPatients = filteredPatients.filter(p => p.status === status);
    }

    const total = filteredPatients.length;
    const start = (page - 1) * limit;
    const paginatedPatients = filteredPatients.slice(start, start + limit);

    return NextResponse.json({
      success: true,
      data: paginatedPatients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve patients' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/patients
 * Create a new patient record
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mrn, firstName, lastName, dateOfBirth, email, phone, clinicalHistory } = body;

    // Validation
    if (!mrn || !firstName || !lastName || !dateOfBirth) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: mrn, firstName, lastName, dateOfBirth' },
        { status: 400 }
      );
    }

    const patientId = `PAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newPatient: Patient = {
      id: patientId,
      mrn,
      firstName,
      lastName,
      dateOfBirth,
      email: email || '',
      phone: phone || '',
      status: 'Stable',
      admissionDate: new Date().toISOString(),
      clinicalHistory: clinicalHistory || [],
    };

    patients.set(patientId, newPatient);

    return NextResponse.json(
      { success: true, data: newPatient, message: 'Patient created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create patient' },
      { status: 500 }
    );
  }
}
