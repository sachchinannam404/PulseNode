import { NextRequest, NextResponse } from 'next/server';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'Medication' | 'Medical Consumable' | 'Equipment';
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  expiryDate: string;
  status: 'Critical' | 'Low Stock' | 'Normal' | 'Overstocked';
  lastRestockDate: string;
}

const inventoryItems: Map<string, InventoryItem> = new Map();

/**
 * GET /api/pharmacy/inventory/[id]
 * Retrieve a specific inventory item
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = inventoryItems.get(id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Inventory item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve inventory item' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/pharmacy/inventory/[id]
 * Update inventory item (e.g., quantity, price)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = inventoryItems.get(id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Inventory item not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { quantity, unitPrice, minStock, maxStock, expiryDate } = body;

    if (quantity !== undefined) {
      item.quantity = quantity;
      item.lastRestockDate = new Date().toISOString();

      // Update status based on new quantity
      if (quantity === 0) item.status = 'Critical';
      else if (quantity <= item.minStock) item.status = 'Low Stock';
      else if (quantity >= item.maxStock) item.status = 'Overstocked';
      else item.status = 'Normal';
    }

    if (unitPrice !== undefined) item.unitPrice = unitPrice;
    if (minStock !== undefined) item.minStock = minStock;
    if (maxStock !== undefined) item.maxStock = maxStock;
    if (expiryDate) item.expiryDate = expiryDate;

    inventoryItems.set(id, item);

    return NextResponse.json({
      success: true,
      data: item,
      message: 'Inventory item updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update inventory item' },
      { status: 500 }
    );
  }
}
