import { DISCORD_INVITE_LINK } from "../../const";

export const HeroTwo = () => (
  <section
    id="hero"
    className="bg-[#7AC74C] min-h-screen relative overflow-hidden py-20"
  >
    {/* Background decorative elements */}
    <img
      src="https://hayday.com/graphics/misc/greetings_comp-back.png"
      alt=""
      className="absolute top-0 right-0 w-1/3 opacity-30  fadeIn"
    />
    <img
      src="https://hayday.com/graphics/misc/greetings_comp-front.png"
      alt=""
      className="absolute bottom-0 left-0 w-1/3 opacity-30  fadeIn"
    />

    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}

        <div className="text-white space-y-8  fadeInLeft">
          <h1 className="font-lilita text-5xl lg:text-7xl leading-tight">
            Community Features 🌟
          </h1>
          <p className="text-xl font-openSans max-w-lg">
            Join the vibrant community for active discussions, helpful tips,
            trading opportunities, and regular giveaways on our Discord server!
          </p>
        </div>
        {/* Right content */}

        <div className="relative  fadeInRight">
          <img
            src="https://hayday.com/graphics/misc/headline_comp.png"
            alt="Hay Day Farm"
            className="w-full max-w-2xl mx-auto"
          />
          {/* Animated elements */}
          <img
            src="https://hayday.com/graphics/sprites/chicken_fallback.png"
            alt=""
            className="absolute -bottom-10 -left-10 w-32 animate-bounce "
          />
          <img
            src="https://hayday.com/graphics/sprites/dog_fallback.png"
            alt=""
            className="absolute -top-10 -right-10 w-32  animate-bounce animate__infinite"
          />
        </div>
      </div>
    </div>

    {/* Floating elements */}
    <div className="absolute top-0 left-10 animate-pulse">
      <img
        src="https://hayday.com/graphics/sprites/bee_fallback.png"
        alt=""
        className="w-16 h-16"
      />
    </div>

    <div className="absolute bottom-1/4 right-10 ">
      <img
        src="https://hayday.com/graphics/sprites/fish_fallback.png"
        alt=""
        className="w-16 h-16"
      />
    </div>
  </section>
);
