import HospitalBooking from "@/app/components/HospitalBooking";
import { Suspense } from "react";

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#020817] text-white flex items-center justify-center font-sans">Loading Booking Portal...</div>}>
            <HospitalBooking />
        </Suspense>
    );
}
