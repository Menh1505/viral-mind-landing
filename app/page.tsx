"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Pain from "@/components/Pain";
import Agents from "@/components/Agents";
import DemoReel from "@/components/DemoReel";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import WaitlistModal from "@/components/WaitlistModal";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <main>
        <Nav onOpenWaitlist={() => setWaitlistOpen(true)} />
        <Hero onOpenWaitlist={() => setWaitlistOpen(true)} />
        <Ticker />
        <Pain />
        <Agents />
        <DemoReel />
        <HowItWorks />
        <Pricing onOpenWaitlist={() => setWaitlistOpen(true)} />
        <FAQ />
        <CTA onOpenWaitlist={() => setWaitlistOpen(true)} />
        <Footer />
      </main>
    </>
  );
}
