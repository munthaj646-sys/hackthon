"use client";

import { useEffect, useState } from "react";
import { Navigation, MapPin } from "lucide-react";

export default function MapDashboard({ hospitals, radius, isActive }: any) {
    // Normally using react-leaflet SSR dynamically:
    // const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
    // For hackathon reliability without full custom Map markers config, we simulate a beautiful map UI.

    if (!isActive || !hospitals || hospitals.length === 0) return null;

    return (
        <div className="glass-panel border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900/40">
                <div className="flex items-center gap-2 text-[15px] font-bold text-slate-200">
                    <Navigation size={18} className="text-blue-400" />
                    Hospitals Found ({radius}km radius)
                </div>
                <div className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full animate-pulse font-bold">
                    Emergency Proximity
                </div>
            </div>

            {/* Premium Mock Map View */}
            <div className="h-56 relative bg-slate-950 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Hyderabad&zoom=11&size=600x300&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=element:geometry|color:0x0f172a&style=element:labels.text.fill|color:0x746855&style=element:water|color:0x1e293b')] bg-cover bg-center opacity-80 mix-blend-screen"></div>
                {/* Radar Effect overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-blue-500/10 rounded-full animate-[spin_3s_linear_infinite] border-t-blue-500/60 backdrop-blur-[2px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,1)] ring-4 ring-blue-500/20"></div>

                {/* Plotting hospitals roughly around center */}
                {hospitals.slice(0, 3).map((h: any, i: number) => {
                    // Fake random positions around center for demo
                    const pos = [
                        { top: '30%', left: '40%' },
                        { top: '60%', left: '70%' },
                        { top: '40%', left: '80%' }
                    ][i % 3];

                    return (
                        <div key={i} className="absolute flex flex-col items-center group-hover:scale-110 transition-transform cursor-pointer" style={pos}>
                            <MapPin size={28} className={i === 0 ? "text-rose-500 animate-bounce drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]" : "text-slate-500"} />
                            <div className="bg-slate-900/90 text-[11px] font-medium px-2 py-1 rounded-md border border-slate-700/50 mt-1 shadow-xl text-slate-200 backdrop-blur-md">
                                {h.name}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="p-4 bg-slate-900/40 border-t border-white/5">
                <div className="flex gap-2 text-[13px] text-slate-300 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
                    Recommending: <span className="text-white font-bold">{hospitals[0]?.name}</span> ({hospitals[0]?.distance_km}km)
                </div>
            </div>
        </div>
    );
}
