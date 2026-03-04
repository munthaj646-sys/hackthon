"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Send, AlertTriangle, Bot, User, Globe, Heart, Zap, Shield, Stethoscope, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Urgency config ────────────────────────────────── */
const SEVERITY: Record<number, { label: string; color: string; ring: string; glow: string }> = {
    5: { label: "CRITICAL", color: "text-red-400", ring: "border-red-500/40", glow: "shadow-red-500/20" },
    4: { label: "HIGH", color: "text-orange-400", ring: "border-orange-500/40", glow: "shadow-orange-500/20" },
    3: { label: "MODERATE", color: "text-yellow-400", ring: "border-yellow-500/40", glow: "shadow-yellow-500/20" },
    2: { label: "LOW", color: "text-green-400", ring: "border-green-500/40", glow: "shadow-green-500/20" },
    1: { label: "MILD", color: "text-blue-400", ring: "border-blue-500/40", glow: "shadow-blue-500/20" },
};

/* ── Quick prompts ─────────────────────────────────── */
const PROMPTS = [
    { icon: "🫀", text: "I have chest pain and left arm pain" },
    { icon: "🧠", text: "Severe headache, stiff neck, and high fever" },
    { icon: "👶", text: "My 3-year-old has high fever and a body rash" },
    { icon: "🤢", text: "Severe abdominal pain, lower right side" },
    { icon: "😮‍💨", text: "I can't breathe properly and feel dizzy" },
    { icon: "🦴", text: "Sharp lower back pain radiating to my leg" },
];

/* ── ECG SVG animation ─────────────────────────────── */
function ECGLine() {
    return (
        <svg viewBox="0 0 280 50" className="w-full h-10 opacity-40" fill="none">
            <polyline
                points="0,25 30,25 40,10 50,40 60,5 70,45 80,25 110,25 120,20 130,28 280,28"
                stroke="url(#ecgGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ecg-line"
            />
            <defs>
                <linearGradient id="ecgGrad" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="40%" stopColor="#06b6d4" />
                    <stop offset="70%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
}

/* ── Thinking dots ─────────────────────────────────── */
function ThinkingDots() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex justify-start"
        >
            <div className="flex gap-3 items-end max-w-[85%]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                    <Stethoscope size={14} className="text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-md glass-card neon-border flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 font-medium tracking-widest uppercase mr-1">Analyzing</span>
                    {[0, 0.18, 0.36].map((d, i) => (
                        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 0.8, delay: d, repeat: Infinity }} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/* ── PainBadge ─────────────────────────────────────── */
function PainBadge({ scale }: { scale: number }) {
    const s = SEVERITY[scale];
    if (!s) return null;
    return (
        <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-[11px] font-bold border ${s.ring} ${s.color} bg-black/40`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-current ${scale >= 4 ? 'animate-pulse' : ''}`} />
            PAIN {scale}/5 · {s.label}
        </motion.span>
    );
}

/* ── Main Component ──────────────────────────────────── */
export default function ChatInterface({ messages, setMessages, setPainScale, setActions }: any) {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [streamText, setStreamText] = useState("");
    const [livePain, setLivePain] = useState(0);
    const [pendingPain, setPendingPain] = useState(0);
    const [offeredBooking, setOfferedBooking] = useState(false);
    const [connected, setConnected] = useState(true);
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading, streamText]);

    const handleSend = useCallback(async (override?: string) => {
        const text = (override ?? input).trim();
        if (!text || isLoading) return;
        const newMsgs = [...messages, { role: "user", content: text }];
        setMessages(newMsgs);
        setInput("");
        setIsLoading(true);
        setStreamText("");

        try {
            const res = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMsgs, patient_name: "Patient" }),
                signal: AbortSignal.timeout(60000),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const reply = data.reply || "I couldn't process your request. Please try again.";

            let finalReply = reply;
            let triggerBooking = false;
            let bookingPain = 0;

            if (data.pain_scale >= 4) {
                finalReply += "\n\n⚠️ Would you like me to book an emergency appointment at a nearby hospital?";
                setOfferedBooking(true);
                setPendingPain(data.pain_scale);
                setLivePain(data.pain_scale);
                setPainScale(data.pain_scale);
            } else if (offeredBooking && (text.toLowerCase().match(/\b(yes|yeah|yep|ok|okay|sure|book|please)\b/))) {
                triggerBooking = true;
                bookingPain = pendingPain;
                finalReply = "Opening hospital booking interface in a new tab...";
                setOfferedBooking(false);
            } else if (text.toLowerCase().includes("book") || reply.toLowerCase().includes("book an appointment")) {
                triggerBooking = true;
                bookingPain = pendingPain > 0 ? pendingPain : 0;
                finalReply = "Opening hospital booking interface in a new tab...";
                setOfferedBooking(false);
            } else if (data.pain_scale > 0) {
                setLivePain(data.pain_scale);
                setPainScale(data.pain_scale);
            }

            // Set reply instantly instead of building it artificially
            setIsLoading(false);
            setMessages([...newMsgs, { role: "assistant", content: finalReply }]);

            if (triggerBooking) {
                const symptomStr = encodeURIComponent(newMsgs.filter((m: any) => m.role === 'user').map((m: any) => m.content).join(" | "));
                router.push(`/booking?painScale=${bookingPain}&symptoms=${symptomStr}`);
            }

            if (data.actions?.length) setActions(data.actions);
            setConnected(true);
        } catch {
            setIsLoading(false);
            setStreamText("");
            setMessages([...newMsgs, {
                role: "assistant",
                content: "⚠️ Cannot reach MediAI server.\n\nPlease run:\n```\npython start.py\n```\nin the backend folder, then try again."
            }]);
            setConnected(false);
        }
    }, [input, isLoading, messages, setMessages, setPainScale, setActions]);

    const isEmpty = messages.length === 0 && !streamText;

    return (
        <div className="flex flex-col h-full">

            {/* ── Disconnected Banner ── */}
            <AnimatePresence>
                {!connected && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                        className="bg-red-950/60 border-b border-red-500/20 text-red-400 text-xs px-4 py-2 flex items-center gap-2 overflow-hidden">
                        <span className="status-dot status-offline flex-shrink-0" />
                        Backend offline — run <code className="bg-black/40 px-2 py-0.5 rounded ml-1">python start.py</code>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Message Area ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-4">

                {/* Welcome Screen */}
                {isEmpty && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full gap-6 pb-4">

                        {/* Animated logo */}
                        <div className="relative mt-4">
                            <div className="absolute -inset-5 rounded-full bg-blue-500/10 blur-2xl" />
                            <div className="absolute -inset-3 rounded-full border border-blue-500/10 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border border-blue-500/25 flex items-center justify-center shadow-2xl shadow-blue-500/15">
                                <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                                    <circle cx="20" cy="20" r="17" stroke="url(#g1)" strokeWidth="1.5" />
                                    <path d="M12 20h4l2-7 4 14 3-10 2 3h3" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <defs>
                                        <linearGradient id="g1" x1="3" y1="3" x2="37" y2="37" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        {/* ECG animation strip */}
                        <div className="w-48"><ECGLine /></div>

                        <div className="text-center space-y-1.5">
                            <h2 className="text-[28px] font-black shimmer-text tracking-tight">MediAI</h2>
                            <p className="text-slate-400 font-semibold text-[15px]">Emergency Triage Assistant</p>
                            <p className="text-slate-600 text-xs">Emergency Medicine · Pediatrics · Internal Medicine</p>
                        </div>

                        {/* Language badges */}
                        <div className="flex gap-2 flex-wrap justify-center">
                            {[
                                { flag: "🇺🇸", name: "English", cls: "border-blue-500/20 text-blue-400 bg-blue-500/5" },
                                { flag: "🇮🇳", name: "हिंदी", cls: "border-orange-500/20 text-orange-400 bg-orange-500/5" },
                                { flag: "🔤", name: "తెలుగు", cls: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" },
                            ].map(({ flag, name, cls }) => (
                                <span key={name} className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-medium ${cls}`}>
                                    {flag} {name}
                                </span>
                            ))}
                        </div>

                        {/* Quick prompts */}
                        <div className="w-full max-w-md space-y-2">
                            <p className="text-center text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium">Tap to try</p>
                            <div className="grid grid-cols-2 gap-2">
                                {PROMPTS.map(({ icon, text }, i) => (
                                    <motion.button key={i}
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSend(text)}
                                        className="text-left px-3 py-2.5 rounded-xl bg-white/[0.025] hover:bg-white/[0.055] border border-white/[0.05] hover:border-blue-500/20 text-slate-400 hover:text-slate-200 text-xs transition-all duration-200 flex items-start gap-2">
                                        <span className="text-base leading-none mt-0.5 flex-shrink-0">{icon}</span>
                                        <span className="leading-snug">{text}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Message Bubbles */}
                <AnimatePresence initial={false}>
                    {messages.map((m: any, i: number) => {
                        const isUser = m.role === "user";
                        const painMatch = m.content?.match(/PAIN\s*SCALE:\s*(\d)/i);
                        const pain = painMatch ? parseInt(painMatch[1]) : 0;
                        return (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                                <div className={`flex gap-2.5 max-w-[86%] ${isUser ? "flex-row-reverse" : "flex-row"} items-end`}>

                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isUser ? "bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg shadow-purple-500/25"
                                        : "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25"
                                        }`}>
                                        {isUser
                                            ? <User size={14} className="text-white" />
                                            : <Stethoscope size={14} className="text-white" />}
                                    </div>

                                    {/* Bubble */}
                                    <div className="flex flex-col">
                                        <div className={`px-4 py-3 text-[13.5px] leading-relaxed shadow-xl ${isUser
                                            ? "bg-gradient-to-br from-violet-600/90 to-purple-800/80 text-white border border-white/[0.08] rounded-2xl rounded-tr-sm"
                                            : "glass-card text-slate-100 rounded-2xl rounded-tl-sm ai-message whitespace-pre-wrap"
                                            }`}>
                                            {m.content}
                                        </div>
                                        {!isUser && pain > 0 && <PainBadge scale={pain} />}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Streaming bubble */}
                {streamText && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                        <div className="flex gap-2.5 max-w-[86%] items-end">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                                <Stethoscope size={14} className="text-white" />
                            </div>
                            <div className="px-4 py-3 text-[13.5px] glass-card text-slate-100 rounded-2xl rounded-tl-sm whitespace-pre-wrap">
                                {streamText}<span className="cursor-blink ml-0.5 text-blue-400">▋</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {isLoading && !streamText && (
                    <AnimatePresence><ThinkingDots /></AnimatePresence>
                )}

                <div ref={endRef} className="h-2" />
            </div>

            {/* ── Input Bar ── */}
            <div className="px-4 pb-4 pt-2 border-t border-white/[0.04] bg-black/50 backdrop-blur-2xl">

                {/* Emergency alert */}
                <AnimatePresence>
                    {livePain >= 4 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-3 px-4 py-2.5 rounded-xl bg-red-500/8 border border-red-500/20 flex items-center gap-2 text-xs text-red-400 overflow-hidden">
                            <AlertTriangle size={12} className="animate-pulse flex-shrink-0" />
                            <strong>EMERGENCY DETECTED</strong>
                            <span className="opacity-60 ml-1">— hospital secured automatically</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-2.5">
                    <div className="relative flex-1">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                            disabled={isLoading}
                            placeholder="Describe your symptoms in any language…"
                            className="w-full glass-input text-slate-100 rounded-xl py-3.5 pl-4 pr-24 text-[13.5px] placeholder:text-slate-600"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-700 text-[10px] pointer-events-none">
                            <Globe size={10} /><span>EN · हि · తె</span>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        className="btn-glow w-11 h-11 rounded-xl text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:grayscale">
                        {isLoading
                            ? <Activity size={16} className="animate-spin" />
                            : <Send size={16} className="translate-x-[1px]" />}
                    </motion.button>
                </div>
                <p className="text-center text-[10px] text-slate-700 mt-2">
                    MediAI may make mistakes · Always follow professional medical advice
                </p>
            </div>
        </div>
    );
}
