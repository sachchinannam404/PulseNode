import { NextRequest, NextResponse } from 'next/server';

export interface InventoryItem {
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
 * GET /api/pharmacy/inventory
 * Retrieve inventory items with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let filteredItems = Array.from(inventoryItems.values());

    if (status) {
      filteredItems = filteredItems.filter(i => i.status === status);
    }

    if (category) {
      filteredItems = filteredItems.filter(i => i.category === category);
    }

    const total = filteredItems.length;
    const start = (page - 1) * limit;
    const paginatedItems = filteredItems.slice(start, start + limit);

    return NextResponse.json({
      success: true,
      data: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve inventory' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pharmacy/inventory
 * Create a new inventory item
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sku,
      name,
      category,
      quantity,
      unit,
      minStock,
      maxStock,
      unitPrice,
      expiryDate,
    } = body;

    if (!sku || !name || !category || quantity === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: sku, name, category, quantity',
        },
        { status: 400 }
      );
    }

    const itemId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Determine status based on quantity
    let status: 'Critical' | 'Low Stock' | 'Normal' | 'Overstocked';
    if (quantity === 0) status = 'Critical';
    else if (quantity <= minStock) status = 'Low Stock';
    else if (quantity >= maxStock) status = 'Overstocked';
    else status = 'Normal';

    const newItem: InventoryItem = {
      id: itemId,
      sku,
      name,
      category,
      quantity,
      unit: unit || 'units',
      minStock: minStock || 10,
      maxStock: maxStock || 100,
      unitPrice: unitPrice || 0,
      expiryDate: expiryDate || '',
      status,
      lastRestockDate: new Date().toISOString(),
    };

    inventoryItems.set(itemId, newItem);

    return NextResponse.json(
      { success: true, data: newItem, message: 'Inventory item created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create inventory item' },
      { status: 500 }
    );
  }
}
