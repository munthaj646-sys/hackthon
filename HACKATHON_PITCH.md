# 🎤 MediAI — Hackathon Pitch Deck Prompts & Structure

*You can use this document as a direct script/prompt to feed into tools like Gamma.app, Tome, Canva, or ChatGPT to generate your exact 9-slide presentation for the hackathon.*

---

## Project Name: MediAI
**Tagline:** Intelligent Emergency Triage & Actionable Hospital Routing

---

### Slide 1: Title Slide
- **Headline:** MediAI
- **Sub-headline:** The next generation of multilingual AI medical triage and emergency routing.
- **Visual Idea:** A sleek, dark-themed mockup of the MediAI chat interface showing a glowing ECG line and glassmorphism elements. Or an illustration of a digital heart/stethoscope.
- **Talking Point:** "Welcome to MediAI. When medical emergencies strike, every second counts. We built a system that not only understands what's wrong, but actively gets you the help you need."

### Slide 2: The Problem
- **Headline:** The "Golden Hour" is Lost in Confusion
- **Bullet Points:**
  - AI chatbots today give generic advice, but leave patients stranded during real emergencies.
  - Patients often panic and don't know which hospital or specialist to visit.
  - Language barriers prevent non-English speakers from conveying critical symptoms quickly.
- **Visual Idea:** Icons representing a ticking clock, a confused patient looking at a phone, and a generic ⚠️ warning sign.
- **Talking Point:** "During a medical crisis, conversing with a basic AI is dangerous. Patients need direct action, context-aware routing, and they need it in a language they understand."

### Slide 3: The Solution
- **Headline:** MediAI: From Chat to Care in Seconds
- **Bullet Points:**
  - **Conversational Triage:** Analyzes symptoms using advanced clinical NLP.
  - **Automated Escalation:** Detects severe pain (4/5 or 5/5) and stops the chat to prioritize action.
  - **Seamless Booking:** Automatically routes the patient to the nearest open hospital, bypassing the waiting room.
- **Visual Idea:** A simple flowchart: `User Types Symptoms` ➡️ `AI Detects Pain 5/5` ➡️ `Redirects to Hospital Booking`.
- **Talking Point:** "MediAI listens, evaluates, and acts. It shifts from being a conversational assistant to a life-saving triage tool the moment it detects a critical situation."

### Slide 4: Multi-Agent AI Architecture 
- **Headline:** Specialized AI for Specialized Needs
- **Content:** We built a custom Auto-Router that evaluates the query and sends it to the best model:
  - 🚨 **Groq (Llama 3.3 70B):** Handles life-threatening emergencies with deep reasoning.
  - 🩺 **OpenRouter (Gemini 2.0 Flash):** Handles complex, general medical and chronic queries.
  - 📅 **Mistral 7B:** Handles quick administrative queries and appointment changes.
- **Visual Idea:** A master "Router" node splitting into three different brains (Llama, Gemini, Mistral) based on keywords.
- **Talking Point:** "Not all symptoms are equal, so not all models should handle them. Our router acts as a senior doctor, delegating the query to the specialist model best equipped to answer it rapidly."

### Slide 5: The "Red Flag" Booking Workflow
- **Headline:** Action Over Conversation
- **Bullet Points:**
  - When the AI scores the patient's pain as 4/5 or 5/5, it intercepts the prompt.
  - Asks the user for confirmation to secure an emergency slot.
  - Opens a dedicated Location-Based Booking Tab.
  - Carries over all extracted symptoms and pain data seamlessly.
- **Visual Idea:** Screenshot of the chat interface showing the pulsing red "EMERGENCY DETECTED" banner, pointing to the sleek Hospital Booking UI.

### Slide 6: Bridging the Doctor-Patient Gap
- **Headline:** Pre-Arrival Intelligence
- **Bullet Points:**
  - Hospitals are shown with real-time wait times, open/closed statuses, and consultation fees (₹).
  - Once confirmed, patient gets an SMS receipt.
  - **The Magic:** The receiving Doctor gets a comprehensive AI-generated symptom report *before* the patient even walks through the doors.
- **Visual Idea:** A split-screen showing a patient receiving an SMS, and a doctor holding an iPad with a summary of the patient's symptoms.

### Slide 7: Built for Accessibility (Multilingual)
- **Headline:** Breaking the Language Barrier
- **Bullet Points:**
  - Fully supports English, Hindi (हिंदी), and Telugu (తెలుగు).
  - Auto-detects user language and responds fluently in the same dialect with appropriate medical terminology.
  - Democratizes access to high-end medical triage for rural and non-English speaking populations.
- **Visual Idea:** Three speech bubbles showing the same medical greeting in English, Hindi, and Telugu.
- **Talking Point:** "Medical emergencies are scary enough. You shouldn't have to translate your pain. MediAI speaks your language."

### Slide 8: Technical Stack & Execution
- **Headline:** Under the Hood
- **Bullet Points:**
  - **Frontend:** Next.js, React, TailwindCSS, Framer Motion (for fluid, clinical UI).
  - **Backend:** Python FastAPI, SQLite + SQLAlchemy for appointment persistence.
  - **AI Integration:** Groq, Mistral, and OpenRouter APIs running asynchronously.
- **Visual Idea:** Standard tech stack logos (Next.js, Python, FastAPI, Tailwind, Groq).

### Slide 9: Future Roadmap & Vision
- **Headline:** The Future of MediAI
- **Bullet Points:**
  - **Live Ambulance Tracking:** Dispatched automatically for 5/5 critical pain.
  - **Wearable Integration:** Pulling live heart-rate and oxygen data from smartwatches.
  - **EHR Integration:** Connecting directly into national health registry databases.
- **Visual Idea:** A constellation graph showing MediAI connecting to an Ambulance, an Apple Watch, and a Hospital Database.
- **Talking Point:** "Today, we're doing smart triage. Tomorrow, MediAI becomes the central nervous system of emergency response."
