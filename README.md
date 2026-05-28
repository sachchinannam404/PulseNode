# PulseNode | Enterprise Hospital Management System

PulseNode is a next-generation, enterprise-grade Hospital Management System (HMS) built for precision, security, and AI-driven operational efficiency. It provides a unified ecosystem for managing multiple healthcare operations with real-time analytics and predictive intelligence.

## 🚀 Key Modules & Features

### 🧠 AI Analytics & Predictive Intelligence
- **Capacity Forecasting**: AI-driven predictions for bed availability in 24h and 7d windows.
- **Readmission Modeling**: Risk assessment for patient readmission based on clinical history and medical conditions.
- **Operational Directives**: Automated strategic recommendations for staffing and resource allocation.

### 📋 Patient EMR Repository
- **Digital Health Records**: Centralized EMR management with MRN tracking.
- **Admission Workflow**: Streamlined patient intake and discharge processing.
- **Telemetry Overview**: Real-time status monitoring (Critical, Observation, Stable).

### 📅 Roster Management
- **Staff Scheduling**: Comprehensive shift management for doctors, nurses, and specialists.
- **Unit Coverage Telemetry**: Real-time headcount and coverage percentages for ICU, Emergency, and General Wards.

### 💊 Pharmacy & Stock
- **Inventory Tracking**: Real-time SKU management for medications and medical consumables.
- **Shortfall Alerts**: Automated "Critical" and "Low Stock" status indicators with reorder triggers.

### 🔬 Diagnostics Network
- **Lab & Imaging Sync**: Integrated tracking for pathology results, CT scans, and MRI imaging.
- **Queue Management**: Real-time ETA and status monitoring for diagnostic orders.

### 💳 Billing & Claims
- **Financial Ledger**: Management of patient invoices and insurance carrier synchronization.
- **Claims Analytics**: Tracking of total collections, pending claims, and rejection rates.

## 🛠 Technical Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Engine**: [Google Genkit](https://github.com/firebase/genkit)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Space Grotesk (Headlines) & Inter (Body)
- **Database Architecture**: Designed for Firebase Firestore integration
- **Language**: TypeScript (96.7%), JavaScript (1.7%)

## 🔒 Security & Compliance
- **HIPAA Secure Design**: Built with data privacy and clinical security standards in mind.
- **Role-Based Access**: Infrastructure ready for granular permission management.

## 📡 REST API Endpoints

PulseNode provides a complete REST API for all healthcare operations:

### **Patient Management**
- `GET/POST /api/patients` - List and create patient records
- `GET/PUT /api/patients/[id]` - Retrieve and update individual patient records

### **Staff Roster**
- `GET/POST /api/staff` - List and create staff members with filtering by role/unit
- `GET/PUT /api/staff/[id]` - Retrieve and update staff member details

### **Pharmacy Inventory**
- `GET/POST /api/pharmacy/inventory` - List and create inventory items with status tracking
- `GET/PUT /api/pharmacy/inventory/[id]` - Retrieve and update inventory item details

### **Diagnostics Network**
- `GET/POST /api/diagnostics` - List and create diagnostic orders
- `GET/PUT /api/diagnostics/[id]` - Retrieve and update diagnostic order status and results

### **Billing & Claims**
- `GET/POST /api/billing` - List invoices with analytics (collections, pending claims, rejection rates)
- `GET/PUT /api/billing/[id]` - Retrieve and update invoice payment status

### API Features
- ✅ **Filtering & Pagination**: All list endpoints support filtering by status, type, category
- ✅ **Real-time Analytics**: Billing endpoint includes metrics for collections and claim status
- ✅ **Automatic Status Management**: Status updates based on business logic
- ✅ **Error Handling**: Comprehensive error responses with proper HTTP status codes
- ✅ **TypeScript Support**: Fully typed interfaces for all data models
- ✅ **HIPAA-Ready Design**: Structured for secure healthcare data management

## 🏁 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access Dashboard**:
   Navigate to `http://localhost:9003/dashboard` to view the primary HMS control center.

4. **API Testing**:
   All REST API endpoints are available at `http://localhost:9003/api/*`

## 📦 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── patients/              # Patient EMR endpoints
│   │   ├── staff/                 # Staff roster endpoints
│   │   ├── pharmacy/              # Pharmacy inventory endpoints
│   │   ├── diagnostics/           # Diagnostic orders endpoints
│   │   └── billing/               # Billing & claims endpoints
│   └── dashboard/                 # Main HMS dashboard UI
├── ai/                            # AI/ML modules with Genkit
└── components/                    # Reusable React components
```

## 🚀 Development Scripts

```bash
npm run dev              # Start development server on port 9003
npm run genkit:dev      # Start Genkit AI development server
npm run genkit:watch    # Watch mode for Genkit development
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint
npm run typecheck       # Run TypeScript type checking
```

---
© 2024 PulseNode Healthcare Systems. Enterprise-grade medical infrastructure.
