# MediAI Backend

This is the FastAPI backend for the MediAI smart symptom checker. It handles AI integration via DeepSeek, executes a lightweight RAG search on a local medical database, and simulates real-world MCP server tool execution (like finding hospitals, booking slots, and generating reports).

## Prerequisites
- Python 3.9+

## Setup Instructions

1. **Install Dependencies**
   It's recommended to create a virtual environment first.
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure API Keys (Optional)**
   The system defaults to a mock flow for the hackathon demo if no key is provided.
   To test real DeepSeek API completion:
   - Create a `.env` file in this directory.
   - Add `DEEPSEEK_API_KEY=your_actual_key` to the file.

3. **Run the Server**
   ```bash
   python main.py
   ```
   The backend will start at `http://0.0.0.0:8000` or `http://localhost:8000`.

## Testing the API
You can test the health endpoint by visiting:
http://localhost:8000/
pip install groq google-generativeai mistralai python-dotenv --user
