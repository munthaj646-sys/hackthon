"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const hospitals = [
    {
        id: 1,
        name: "Apollo Hospitals",
        distance: "3.2 km",
        rating: 4.8,
        reviews: 2341,
        speciality: "Multi-Speciality",
        address: "Jubilee Hills, Hyderabad",
        wait: "~15 min",
        image: "🏥",
        slots: ["9:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "3:45 PM", "5:00 PM"],
        doctors: ["Dr. Ramesh Sharma", "Dr. Priya Nair", "Dr. Anil Kumar"],
        fee: "800",
        badge: "Top Rated",
        badgeColor: "#10b981",
        open: true,
    },
    {
        id: 2,
        name: "KIMS Hospital",
        distance: "5.1 km",
        rating: 4.5,
        reviews: 1892,
        speciality: "Super Speciality",
        address: "Secunderabad, Hyderabad",
        wait: "~25 min",
        image: "🏨",
        slots: ["9:30 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM"],
        doctors: ["Dr. Suresh Reddy", "Dr. Kavitha Menon"],
        fee: "750",
        badge: "Nearest",
        badgeColor: "#3b82f6",
        open: true,
    },
    {
        id: 3,
        name: "Yashoda Hospital",
        distance: "6.8 km",
        rating: 4.6,
        reviews: 3105,
        speciality: "Multi-Speciality",
        address: "Somajiguda, Hyderabad",
        wait: "~10 min",
        image: "🏦",
        slots: ["10:00 AM", "12:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"],
        doctors: ["Dr. Rajesh Gupta", "Dr. Meena Iyer", "Dr. Farhan Ali"],
        fee: "600",
        badge: "Fastest",
        badgeColor: "#f59e0b",
        open: true,
    },
    {
        id: 4,
        name: "Care Hospitals",
        distance: "8.3 km",
        rating: 4.3,
        reviews: 1247,
        speciality: "General",
        address: "Banjara Hills, Hyderabad",
        wait: "~30 min",
        image: "🏢",
        slots: ["9:00 AM", "1:30 PM", "3:00 PM", "5:00 PM"],
        doctors: ["Dr. Swati Patel"],
        fee: "500",
        badge: null,
        open: false,
    },
];

const STEPS = ["hospitals", "slots", "confirm", "done"];

export default function HospitalBooking() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState("hospitals");
    const [selectedHospital, setSelectedHospital] = useState<any>(null);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [patientName, setPatientName] = useState("");
    const [phone, setPhone] = useState("");
    const [filter, setFilter] = useState("all");

    const symptoms = searchParams.get("symptoms") || "Fever, Headache, Stiff Neck";
    const painScale = parseInt(searchParams.get("painScale") || "4", 10);

    const [bookingId, setBookingId] = useState("");

    useEffect(() => {
        setBookingId("MED-" + Math.random().toString(36).substr(2, 8).toUpperCase());
    }, []);

    const painLabels = ["", "Mild", "Low", "Moderate", "Severe", "Critical"];
    const painColors = ["", "#10b981", "#84cc16", "#f59e0b", "#ef4444", "#7c3aed"];

    const filteredHospitals =
        filter === "open" ? hospitals.filter((h) => h.open) : hospitals;

    const today = new Date();
    const dateStr = today.toLocaleDateString("en-IN", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    const s = styles;

    return (
        <div style={s.root as any}>
            <div style={s.bg as any} />

            {/* Header */}
            <header style={s.header as any}>
                <div style={s.headerInner as any}>
                    <div style={s.logo as any}>
                        <span style={{ fontSize: 26, color: "#06b6d4" }}>⚕</span>
                        <span style={s.logoText as any}>MediAI</span>
                    </div>
                    <div style={s.painBadge as any}>
                        <span style={{ color: painColors[painScale], fontWeight: 700 }}>● Pain {painScale}/5</span>
                        <span style={{ color: painColors[painScale], fontSize: 11, marginLeft: 6 }}>
                            {painLabels[painScale]?.toUpperCase()}
                        </span>
                    </div>
                </div>
            </header>

            {/* Stepper */}
            <div style={s.stepperWrap as any}>
                {["Find Hospital", "Choose Slot", "Confirm", "Done"].map((label, i) => {
                    const cur = STEPS.indexOf(step);
                    const active = cur >= i;
                    return (
                        <div key={label} style={{ display: "flex", alignItems: "center" }}>
                            <div style={{
                                display: "flex", flexDirection: "column", alignItems: "center", gap: 4
                            }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: "50%",
                                    background: active ? "#06b6d4" : "#1e293b",
                                    border: `2px solid ${active ? "#06b6d4" : "#334155"}`,
                                    color: active ? "#fff" : "#475569",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 11, fontWeight: 700,
                                }}>
                                    {active && cur > i ? "✓" : i + 1}
                                </div>
                                <span style={{ fontSize: 10, color: active ? "#e2e8f0" : "#475569", whiteSpace: "nowrap" }}>
                                    {label}
                                </span>
                            </div>
                            {i < 3 && (
                                <div style={{
                                    width: 40, height: 2, background: active && cur > i ? "#06b6d4" : "#1e293b",
                                    margin: "0 6px", marginBottom: 16,
                                }} />
                            )}
                        </div>
                    );
                })}
            </div>

            <div style={s.container as any}>

                {/* Symptom Banner */}
                {step !== "done" && (
                    <div style={s.symptomBanner as any}>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", letterSpacing: 2, marginBottom: 3 }}>
                                AI DETECTED SYMPTOMS
                            </div>
                            <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{symptoms}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            {[1, 2, 3, 4, 5].map(n => (
                                <div key={n} style={{
                                    width: 10, height: 10, borderRadius: "50%",
                                    background: n <= painScale ? painColors[painScale] : "#1e293b",
                                    transform: n === painScale ? "scale(1.4)" : "scale(1)",
                                    transition: "all 0.2s",
                                }} />
                            ))}
                            <span style={{ color: painColors[painScale], fontSize: 11, fontWeight: 700, marginLeft: 8 }}>
                                {painLabels[painScale]}
                            </span>
                        </div>
                    </div>
                )}

                {/* ── HOSPITALS ── */}
                {step === "hospitals" && (
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Nearby Hospitals</h2>
                                <p style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>📍 Hyderabad · {dateStr}</p>
                            </div>
                            <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                                {["all", "open"].map(f => (
                                    <button key={f} onClick={() => setFilter(f)} style={{
                                        padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                                        cursor: "pointer", transition: "all 0.2s",
                                        background: filter === f ? "#06b6d4" : "transparent",
                                        color: filter === f ? "#fff" : "#94a3b8",
                                        border: `1px solid ${filter === f ? "#06b6d4" : "#1e293b"}`,
                                    }}>
                                        {f === "all" ? "All" : "Open Now"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
                            {filteredHospitals.map(h => (
                                <div key={h.id} onClick={() => h.open && (setSelectedHospital(h), setStep("slots"))}
                                    style={{
                                        background: "#0a0f1e", borderRadius: 12, padding: 14,
                                        cursor: h.open ? "pointer" : "not-allowed",
                                        position: "relative", overflow: "hidden",
                                        border: `1.5px solid ${selectedHospital?.id === h.id ? "#06b6d4" : "#1e293b"}`,
                                        opacity: h.open ? 1 : 0.55,
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                                    }}>
                                    {h.badge && (
                                        <div style={{
                                            position: "absolute", top: 14, right: 14,
                                            padding: "3px 10px", borderRadius: 20, fontSize: 10,
                                            fontWeight: 700, color: "#fff", background: h.badgeColor,
                                        }}>{h.badge}</div>
                                    )}
                                    <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                                        <div style={{ fontSize: 28 }}>{h.image}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 14 }}>{h.name}</div>
                                            <div style={{ color: "#06b6d4", fontSize: 11, fontWeight: 500, marginTop: 1 }}>{h.speciality}</div>
                                            <div style={{ color: "#64748b", fontSize: 11, marginTop: 1 }}>📍 {h.address}</div>
                                        </div>
                                        <div style={{ color: "#94a3b8", fontSize: 10 }}>{h.distance}</div>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
                                        <span style={{ color: "#e2e8f0", fontSize: 12 }}>
                                            <span style={{ color: "#f59e0b" }}>★</span> {h.rating}
                                            <span style={{ color: "#64748b" }}> ({h.reviews.toLocaleString()})</span>
                                        </span>
                                        <span style={{ color: "#e2e8f0", fontSize: 12 }}>
                                            <span style={{ color: "#06b6d4" }}>⏱</span> {h.wait} wait
                                        </span>
                                        <span style={{ color: "#e2e8f0", fontSize: 12 }}>
                                            <span style={{ color: "#10b981" }}>🩺</span> {h.doctors.length} doctors
                                        </span>
                                        <span style={{ color: "#e2e8f0", fontSize: 12 }}>
                                            <span style={{ color: "#a855f7", fontWeight: 700 }}>₹</span> {h.fee} fee
                                        </span>
                                        <span style={{
                                            marginLeft: "auto", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                                            background: h.open ? "#06300a" : "#300a0a",
                                            color: h.open ? "#4ade80" : "#f87171",
                                        }}>
                                            {h.open ? "● Open" : "● Closed"}
                                        </span>
                                    </div>

                                    <button style={{
                                        width: "100%", padding: "10px 0", borderRadius: 10, border: "none",
                                        background: h.open ? "linear-gradient(135deg,#06b6d4,#0284c7)" : "#1e293b",
                                        color: "#fff", fontWeight: 700, fontSize: 13, cursor: h.open ? "pointer" : "not-allowed",
                                    }}>
                                        {h.open ? "Select & Book →" : "Unavailable"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── SLOTS ── */}
                {step === "slots" && selectedHospital && (
                    <div>
                        <button onClick={() => setStep("hospitals")} style={s.backBtn as any}>← Back</button>

                        <div style={{
                            background: "#0a0f1e", border: "1.5px solid #06b6d4",
                            borderRadius: 10, padding: "10px 14px",
                            display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
                        }}>
                            <span style={{ fontSize: 24 }}>{selectedHospital.image}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 14 }}>{selectedHospital.name}</div>
                                <div style={{ color: "#64748b", fontSize: 11 }}>📍 {selectedHospital.address} · {selectedHospital.distance}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ color: "#f59e0b", fontSize: 12 }}>★ {selectedHospital.rating}</div>
                                <div style={{ color: "#64748b", fontSize: 10 }}>{selectedHospital.reviews.toLocaleString()} reviews</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <h3 style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>👨‍⚕️ Choose a Doctor</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {selectedHospital.doctors.map((d: any) => (
                                    <div key={d} onClick={() => setSelectedDoctor(d)} style={{
                                        display: "flex", alignItems: "center", gap: 14,
                                        padding: "12px 16px", borderRadius: 12, cursor: "pointer",
                                        background: selectedDoctor === d ? "#0f2535" : "#0a0f1e",
                                        border: `1.5px solid ${selectedDoctor === d ? "#06b6d4" : "#1e293b"}`,
                                    }}>
                                        <div style={{
                                            width: 38, height: 38, borderRadius: "50%",
                                            background: "linear-gradient(135deg,#06b6d4,#0284c7)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#fff", fontWeight: 800, fontSize: 15,
                                        }}>
                                            {d.split(" ").slice(-1)[0][0]}
                                        </div>
                                        <div>
                                            <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{d}</div>
                                            <div style={{ color: "#64748b", fontSize: 11 }}>{selectedHospital.speciality}</div>
                                        </div>
                                        {selectedDoctor === d && <span style={{ marginLeft: "auto", color: "#06b6d4", fontWeight: 700 }}>✓</span>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <h3 style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>🕐 Available Slots — Today</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px,1fr))", gap: 8 }}>
                                {selectedHospital.slots.map((slot: any) => (
                                    <button key={slot} onClick={() => setSelectedSlot(slot)} style={{
                                        padding: "10px 8px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                                        cursor: "pointer", transition: "all 0.2s",
                                        background: selectedSlot === slot ? "linear-gradient(135deg,#06b6d4,#0284c7)" : "#0a0f1e",
                                        border: `1.5px solid ${selectedSlot === slot ? "#06b6d4" : "#1e293b"}`,
                                        color: selectedSlot === slot ? "#fff" : "#94a3b8",
                                    }}>{slot}</button>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => selectedSlot && selectedDoctor && setStep("confirm")} style={{
                            ...(s.primaryBtn as any),
                            opacity: selectedSlot && selectedDoctor ? 1 : 0.4,
                            cursor: selectedSlot && selectedDoctor ? "pointer" : "not-allowed",
                        }}>
                            Continue to Confirm →
                        </button>
                    </div>
                )}

                {/* ── CONFIRM ── */}
                {step === "confirm" && (
                    <div>
                        <button onClick={() => setStep("slots")} style={s.backBtn as any}>← Back</button>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 14 }}>Confirm Your Booking</h2>

                        <div style={{ background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                            {[
                                ["🏥 Hospital", selectedHospital?.name],
                                ["📍 Address", selectedHospital?.address],
                                ["👨‍⚕️ Doctor", selectedDoctor],
                                ["📅 Date", `Today — ${dateStr}`],
                                ["🕐 Time", selectedSlot],
                                ["🤒 Symptoms", symptoms],
                                ["⚠️ Pain Level", `${painScale}/5 — ${painLabels[painScale]}`],
                            ].map(([k, v], i) => (
                                <div key={k} style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    padding: "10px 0", borderBottom: "1px solid #0f172a", gap: 12,
                                }}>
                                    <span style={{ color: "#64748b", fontSize: 12 }}>{k}</span>
                                    <span style={{
                                        color: k === "🕐 Time" ? "#06b6d4" : k === "⚠️ Pain Level" ? painColors[painScale] : "#e2e8f0",
                                        fontSize: 12, fontWeight: k === "🕐 Time" || k === "⚠️ Pain Level" ? 700 : 400,
                                        textAlign: "right", marginLeft: "auto"
                                    }}>{v}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginBottom: 14 }}>
                            <input placeholder="Full Name" value={patientName}
                                onChange={e => setPatientName(e.target.value)} style={s.input as any} />
                            <input placeholder="Phone Number" value={phone}
                                onChange={e => setPhone(e.target.value)} style={s.input as any} />
                        </div>

                        <div style={s.noticeBox as any}>
                            📲 Confirmation SMS will be sent to your number. Doctor will receive your full symptom report before you arrive.
                        </div>

                        <button onClick={() => patientName && phone && setStep("done")} style={{
                            ...(s.primaryBtn as any),
                            opacity: patientName && phone ? 1 : 0.4,
                            cursor: patientName && phone ? "pointer" : "not-allowed",
                        }}>
                            ✅ Confirm Appointment
                        </button>
                    </div>
                )}

                {/* ── DONE ── */}
                {step === "done" && (
                    <div style={{ textAlign: "center", paddingTop: 10 }}>
                        <div style={{
                            width: 60, height: 60, borderRadius: "50%",
                            background: "linear-gradient(135deg,#10b981,#059669)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 30, color: "#fff", margin: "0 auto 14px",
                        }}>✓</div>
                        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>Appointment Confirmed!</h1>
                        <p style={{ color: "#64748b", fontSize: 12, marginBottom: 20 }}>Your booking has been successfully placed.</p>

                        <div style={{ background: "#0a0f1e", border: "1.5px solid #1e293b", borderRadius: 12, padding: 18, marginBottom: 18, textAlign: "left" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                <span style={{ color: "#64748b", fontSize: 10, letterSpacing: 1 }}>BOOKING ID</span>
                                <span style={{ color: "#06b6d4", fontWeight: 700, letterSpacing: 2, fontSize: 14 }}>{bookingId}</span>
                            </div>
                            <div style={{ height: 1, background: "#1e293b", marginBottom: 16 }} />
                            {[
                                ["🏥", selectedHospital?.name],
                                ["👨‍⚕️", selectedDoctor],
                                ["📅", `Today · ${selectedSlot} @ ${selectedHospital?.name}`],
                                ["📍", selectedHospital?.address],
                            ].map(([icon, val]) => (
                                <div key={icon} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid #0f172a" }}>
                                    <span style={{ color: "#64748b" }}>{icon}</span>
                                    <span style={{ color: "#e2e8f0", fontSize: 13 }}>{val}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
                            {[
                                { icon: "📲", title: "SMS Sent to Patient", sub: phone },
                                { icon: "📋", title: "Report Sent to Doctor", sub: selectedDoctor },
                            ].map(item => (
                                <div key={item.title} style={{
                                    display: "flex", alignItems: "center", gap: 12,
                                    background: "#0a0f1e", border: "1px solid #1e293b",
                                    borderRadius: 12, padding: "12px 20px",
                                }}>
                                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                                    <div>
                                        <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{item.title}</div>
                                        <div style={{ color: "#64748b", fontSize: 11 }}>{item.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: "#020817", border: "1px solid #1e293b", borderRadius: 10, padding: 14, marginBottom: 20, textAlign: "left", fontFamily: "monospace" }}>
                            <div style={{ color: "#06b6d4", fontWeight: 700, marginBottom: 10, fontSize: 12 }}>📋 PATIENT REPORT — SENT TO DOCTOR</div>
                            <div style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.9 }}>
                                <div>👤 Patient: <span style={{ color: "#e2e8f0" }}>{patientName}</span></div>
                                <div>📞 Phone: <span style={{ color: "#e2e8f0" }}>{phone}</span></div>
                                <div>🤒 Symptoms: <span style={{ color: "#e2e8f0" }}>{symptoms}</span></div>
                                <div>⚠️ Pain: <span style={{ color: painColors[painScale], fontWeight: 700 }}>{painScale}/5 — {painLabels[painScale]}</span></div>
                                <div>📅 Appt: <span style={{ color: "#06b6d4" }}>Today {selectedSlot} @ {selectedHospital?.name}</span></div>
                            </div>
                        </div>

                        <button onClick={() => {
                            setStep("hospitals"); setSelectedHospital(null);
                            setSelectedSlot(null); setSelectedDoctor(null);
                            setPatientName(""); setPhone("");
                            window.close();
                        }} style={{ ...(s.primaryBtn as any), background: "linear-gradient(135deg,#10b981,#059669)" }}>
                            Done & Close Tab
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    root: {
        minHeight: "100vh", height: "100vh", overflowY: "auto", background: "#020817",
        fontFamily: "'DM Sans','Nunito',sans-serif", color: "#e2e8f0", position: "relative",
    },
    bg: {
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 20% 10%,rgba(6,182,212,0.08) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(2,132,199,0.06) 0%,transparent 60%)",
        pointerEvents: "none",
    },
    header: {
        borderBottom: "1px solid #0f172a", background: "rgba(2,8,23,0.96)",
        backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100,
    },
    headerInner: {
        maxWidth: 900, margin: "0 auto", padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
    },
    logo: { display: "flex", alignItems: "center", gap: 10 },
    logoText: { fontSize: 20, fontWeight: 800, color: "#f1f5f9", letterSpacing: -0.5 },
    painBadge: {
        display: "flex", alignItems: "center",
        background: "#0f172a", border: "1px solid #1e293b",
        padding: "6px 14px", borderRadius: 20, fontSize: 13,
        marginLeft: "auto"
    },
    stepperWrap: {
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "18px 24px", maxWidth: 600, margin: "0 auto",
    },
    container: { maxWidth: 900, margin: "0 auto", padding: "0 16px 20px" },
    symptomBanner: {
        background: "linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02))",
        border: "1px solid rgba(239,68,68,0.2)",
        borderRadius: 10, padding: "10px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 16, flexWrap: "wrap", gap: 8,
    },
    backBtn: {
        background: "transparent", border: "1px solid #1e293b",
        color: "#94a3b8", padding: "6px 12px", borderRadius: 8,
        cursor: "pointer", fontSize: 12, marginBottom: 14,
    },
    primaryBtn: {
        width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg,#06b6d4,#0284c7)",
        color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 8,
    },
    input: {
        width: "100%", padding: "12px 16px",
        background: "#0a0f1e", border: "1px solid #1e293b",
        borderRadius: 10, color: "#e2e8f0", fontSize: 14,
        marginBottom: 12, outline: "none", boxSizing: "border-box",
    },
    noticeBox: {
        background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.2)",
        borderRadius: 10, padding: "12px 16px",
        color: "#94a3b8", fontSize: 12, lineHeight: 1.6, marginBottom: 20,
    },
};

