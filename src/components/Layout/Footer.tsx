import { Lock, BadgeCheck, Wrench } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto" style={{ background: "#1B2D45" }}>
      {/* Trust bar */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[13px] sm:text-sm font-semibold text-white/70">
          <span className="flex items-center gap-2"><Wrench className="w-5 h-5" style={{ color: "#4BA6A0" }} />Licensed &amp; Bonded Technicians</span>
          <span className="flex items-center gap-2"><Lock className="w-5 h-5" style={{ color: "#4BA6A0" }} />Secure &amp; Encrypted</span>
          <span className="flex items-center gap-2"><BadgeCheck className="w-5 h-5" style={{ color: "#4BA6A0" }} />Satisfaction Guaranteed</span>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex flex-col items-center md:items-start max-w-xs text-center md:text-left space-y-4">
            <Image src="/logo.png" alt="Gate Repair Dispatch" width={200} height={67} className="h-14 w-auto brightness-0 invert" />
            <p className="text-white/50 text-sm font-medium">We connect you with licensed, bonded gate repair technicians for emergency driveway gate and access control repair nationwide.</p>
          </div>
          <div className="flex flex-col items-center md:items-end space-y-4">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-bold text-white/60">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
            </nav>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/30 font-medium space-y-2">
          <p>&copy; {currentYear} GateRepairDispatch.com. All rights reserved.</p>
          <p className="max-w-3xl mx-auto">GateRepairDispatch.com is an independent matching service. We do not employ technicians directly. All repairs, parts, and warranties are handled by our verified local partners.</p>
        </div>
      </div>
    </footer>
  );
}
