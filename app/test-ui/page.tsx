"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { NewsCard, AsymmetricCard, Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RedBand } from "@/components/ui/RedBand";
import { Input } from "@/components/ui/Input";

export default function TestUIPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState("");

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length < 3) {
      setError("Input must be at least 3 characters");
    } else {
      setError("");
    }
  };

  return (
    <main className="min-h-screen bg-surface-white pb-20">
      <div className="bg-surface-charcoal py-10 text-white">
        <div className="container-content">
          <h1 className="text-display-md mb-4">UI Component Gallery</h1>
          <p className="text-lead text-white/70">
            Testing core components for Issue #2
          </p>
        </div>
      </div>

      <RedBand />

      <div className="container-content mt-12 space-y-16">
        {/* Buttons Section */}
        <section>
          <h2 className="text-h2-bold mb-8 border-b pb-2">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-h5">Variants</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary-rect">Primary Rect</Button>
                <Button variant="primary-pill">Primary Pill</Button>
                <Button variant="ghost-rect">Ghost Rect</Button>
                <Button variant="glass-pill" className="bg-surface-charcoal/20">Glass Pill</Button>
                <Button variant="content-ghost-pill">Ghost Pill</Button>
                <Button variant="icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-h5">States</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button isLoading={isLoading} onClick={handleButtonClick}>
                  Click to Load
                </Button>
                <Button disabled>Disabled Button</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section>
          <h2 className="text-h2-bold mb-8 border-b pb-2">Badges / Tags</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-col gap-2">
              <span className="text-caption text-text-body">Outlined (News)</span>
              <Badge variant="outlined">EMPOWERING PEOPLE</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-caption text-text-body">Filled (Quiet)</span>
              <Badge variant="filled">Sustainable Business</Badge>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-h2-bold mb-8 border-b pb-2">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NewsCard
              image="/images/news-1.png"
              date="26 APR 2026"
              tag="Infrastructure"
              title="Connecting the world through deep-sea fiber optics"
            />
            <NewsCard
              image="/images/news-2.png"
              date="24 APR 2026"
              tag="Sustainability"
              title="Our commitment to 100% renewable energy by 2030"
            />
            <AsymmetricCard className="p-8 flex flex-col justify-between min-h-[300px] bg-primary text-white">
              <h3 className="text-h3">Featured Innovation</h3>
              <p className="text-body-base">
                Discover how we are using AI to optimize network performance across Europe.
              </p>
              <Button variant="glass-pill" className="w-fit">Explore More</Button>
            </AsymmetricCard>
          </div>
        </section>

        {/* Inputs Section */}
        <section>
          <h2 className="text-h2-bold mb-8 border-b pb-2">Forms / Inputs</h2>
          <div className="max-w-md space-y-8">
            <div className="space-y-2">
              <label className="text-label" htmlFor="test-input">Standard Input</label>
              <Input
                id="test-input"
                placeholder="Enter your name..."
                value={inputValue}
                onChange={handleInputChange}
                error={error}
              />
            </div>
            <div className="space-y-2">
              <label className="text-label" htmlFor="disabled-input">Disabled Input</label>
              <Input
                id="disabled-input"
                disabled
                placeholder="You cannot type here"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
