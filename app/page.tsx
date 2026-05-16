"use client";
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

export default function Home() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <main>
        <Nav />
        <Hero />
        <Ticker />
        <Pain />
        <Agents />
        <DemoReel />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
