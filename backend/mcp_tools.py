import uuid
import datetime
import random

def find_nearest_hospital(location: str):
    """
    Simulates finding hospitals within 50-100km radius.
    """
    return {
        "status": "success",
        "radius_km": 50,
        "results": [
            {
                "id": "hosp_001",
                "name": "Apollo Hospitals",
                "distance_km": 3.2,
                "address": "Jubilee Hills, Hyderabad",
                "WaitTime_mins": 15
            },
            {
                "id": "hosp_002",
                "name": "Care Hospitals",
                "distance_km": 12.5,
                "address": "Banjara Hills, Hyderabad",
                "WaitTime_mins": 45
            },
            {
                "id": "hosp_003",
                "name": "Yashoda Hospitals",
                "distance_km": 48.0,
                "address": "Secunderabad",
                "WaitTime_mins": 30
            }
        ]
    }

def check_availability(hospital_id: str):
    """
    Simulates checking available timeslots for a given hospital today.
    """
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    return {
        "status": "success",
        "hospital_id": hospital_id,
        "date": today,
        "available_slots": [
            "14:00",
            "14:30",
            "15:45",
            "16:15",
            "17:00"
        ]
    }

def book_appointment(hospital_id: str, time: str, patient_name: str):
    """
    Simulates booking an appointment and generating a booking ID.
    """
    booking_id = f"BKG-{random.randint(1000, 9999)}"
    return {
        "status": "success",
        "booking_id": booking_id,
        "hospital_id": hospital_id,
        "time": time,
        "patient": patient_name,
        "message": f"Appointment successfully booked for {patient_name} at {time}."
    }

def modify_appointment(booking_id: str, new_time: str):
    """
    Simulates modifying an existing appointment.
    """
    return {
        "status": "success",
        "booking_id": booking_id,
        "updated_time": new_time,
        "message": f"Booking {booking_id} modified to {new_time}."
    }

def generate_doctor_report(patient: dict, symptoms: list, ai_assessment: dict):
    """
    Simulates generating a clinical PDF report for the doctor.
    """
    report_id = f"RPT-{str(uuid.uuid4())[:8]}"
    return {
        "status": "success",
        "report_id": report_id,
        "summary": "Full symptom report generated and added to patient record.",
        "content_preview": {
            "Patient": patient.get("name", "Unknown"),
            "Symptoms reported": ", ".join(symptoms),
            "AI Assessment": ai_assessment.get("diagnosis", "Unknown"),
            "Urgency": ai_assessment.get("urgency", "Moderate"),
            "Pain Scale": ai_assessment.get("pain_scale", "3/5")
        }
    }

def send_notification(recipient_phone: str, message: str):
    """
    Simulates sending an SMS or WhatsApp notification via Twilio (mocked).
    """
    return {
        "status": "success",
        "recipient": recipient_phone,
        "message_sent": message,
        "provider": "Mock-Twilio",
        "timestamp": datetime.datetime.now().isoformat()
    }

# Mapping of all tools for easy execution
MCP_TOOLS = {
    "find_nearest_hospital": find_nearest_hospital,
    "check_availability": check_availability,
    "book_appointment": book_appointment,
    "modify_appointment": modify_appointment,
    "generate_doctor_report": generate_doctor_report,
    "send_notification": send_notification
}
