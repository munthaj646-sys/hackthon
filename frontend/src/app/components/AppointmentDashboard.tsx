"use client";

import { Calendar, Clock, Edit2, FileText, CheckCircle2, MessageSquare } from "lucide-react";

export default function AppointmentDashboard({ availability, booking, modification, report, isActive }: any) {
    if (!isActive) return null;

    return (
        <div className="flex flex-col gap-4 animate-fade-in h-auto hidden md:flex">

            {/* Suggested Slots */}
            {availability && !booking && (
                <div className="glass-panel border-blue-500/30 rounded-3xl p-5 shadow-xl transition-all hover:border-blue-500/50">
                    <div className="flex items-center gap-2 text-[15px] font-bold text-blue-400 mb-4">
                        <Clock size={18} />
                        Available Emergency Slots ({availability.date})
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {availability.available_slots.map((slot: string, i: number) => (
                            <button key={i} className={`text-xs px-3 py-1.5 border rounded-lg transition-colors ${i === 0 ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600'}`}>
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Confirmed Booking */}
            {booking && (
                <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/80 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-5 shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all hover:border-emerald-500/50">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2 text-[15px] font-extrabold text-emerald-400">
                            <CheckCircle2 size={20} />
                            Appointment Confirmed
                        </div>
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded font-mono">
                            {booking.booking_id}
                        </span>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{booking.message}</p>
                    <div className="flex justify-between items-center text-xs">
                        <button className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                            <Edit2 size={12} /> Modify Time
                        </button>
                        <span className="text-slate-500 font-mono">
                            Auto-Booked by MediAI
                        </span>
                    </div>
                </div>
            )}

            {/* Doctor Report */}
            {report && (
                <div className="glass-panel border-slate-700/50 rounded-3xl p-5 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/20 to-transparent blur-xl"></div>
                    <div className="flex items-center gap-2 text-[15px] font-bold text-purple-400 mb-4 relative z-10">
                        <FileText size={18} />
                        Auto-Generated Doctor Report
                    </div>

                    <div className="space-y-3 text-[13px] text-slate-300 font-mono bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 shadow-inner relative z-10 object-contain">
                        <div className="flex justify-between border-b border-slate-700 pb-1">
                            <span className="text-slate-500">Patient:</span>
                            <span className="text-slate-200">{report.content_preview.Patient}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-700 py-1">
                            <span className="text-slate-500">Symptoms:</span>
                            <span className="text-rose-300 text-right w-3/4 truncate" title={report.content_preview["Symptoms reported"]}>
                                {report.content_preview["Symptoms reported"]}
                            </span>
                        </div>
                        <div className="flex justify-between pt-1">
                            <span className="text-slate-500">AI Diagnosis:</span>
                            <span className="text-purple-300 font-bold">{report.content_preview["AI Assessment"]}</span>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <MessageSquare size={10} /> SMS Alerts Sent to Patient & Doctor
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                            {report.report_id}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
