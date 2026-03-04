# MediAI Frontend

This is the Next.js React frontend for the MediAI smart symptom checker. It provides a modern, glassmorphic chat interface, a dynamic 1-5 pain scale, and interactive dashboards mapped to backend MCP tool outputs (hospital location mapping and appointment/report previews).

## Prerequisites
- Node.js (v18+)
- npm

## Setup Instructions

1. **Install Dependencies**
   Navigate to this directory and run:
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage (Hackathon Demo Flow)
Ensure the FastAPI backend is running simultaneously on `localhost:8000`.
To trigger the automated critical demo flow (auto-booking, map routing, doctor report):
1. Type: "I have a fever, headache, and a stiff neck for 3 days."
2. The UI will automatically populate the map and appointment dashboards demonstrating the MCP integrations.
