import { NextRequest, NextResponse } from 'next/server';

interface Patient {
  id: string;
  mrn: string;
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
 * GET /api/patients/[id]
 * Retrieve a specific patient by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const patient = patients.get(id);

    if (!patient) {
      return NextResponse.json(
        { success: false, error: 'Patient not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: patient });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve patient' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/patients/[id]
 * Update a patient record
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const patient = patients.get(id);

    if (!patient) {
      return NextResponse.json(
        { success: false, error: 'Patient not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      status,
      dischargeDate,
      clinicalHistory,
    } = body;

    // Update patient fields
    if (firstName) patient.firstName = firstName;
    if (lastName) patient.lastName = lastName;
    if (email) patient.email = email;
    if (phone) patient.phone = phone;
    if (status) patient.status = status;
    if (dischargeDate) patient.dischargeDate = dischargeDate;
    if (clinicalHistory) patient.clinicalHistory = clinicalHistory;

    patients.set(id, patient);

    return NextResponse.json({
      success: true,
      data: patient,
      message: 'Patient updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update patient' },
      { status: 500 }
    );
  }
}
