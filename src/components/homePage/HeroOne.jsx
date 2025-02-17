import React from "react";
import { DISCORD_INVITE_LINK } from "../../const";

export const HeroOne = () => (
  <section id="header" className="bg-neutral-900 min-h-[70vh]">
    <div className="container mx-auto px-4 pt-10 flex flex-col lg:flex-row items-center justify-between">
      <div className="lg:w-1/2 text-white space-y-6 fade-in-5">
        <h1 className="font-['Lilita_One'] text-5xl lg:text-7xl">
          Welcome to Dr Hayday
        </h1>
        <p className="text-xl font-['Open_Sans']">
          Join our vibrant Discord community! Connect with fellow players, share strategies, and stay updated with the latest news.
        </p>
       
      </div>
      <div className="lg:w-1/2 mt-10 lg:mt-0 fade-in-5">
        <img
          src="https://hayday.com/graphics/misc/hero_logo.png"
          alt="Hay Day Community"
          className="w-full max-w-xl mx-auto"
        />
      </div>
    </div>
  </section>
);
