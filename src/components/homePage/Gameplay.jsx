export const Gameplay = () => (
  <section
    id="gameplay"
    className="bg-neutral-100 py-20 relative overflow-hidden"
  >
    <div className="container mx-auto px-4">
      <h2 className="text-center font-['Lilita_One'] text-5xl text-neutral-900 mb-16 animate__animated animate__fadeIn">
        New Areas to Explore!
      </h2>
      {/* Gameplay Features Carousel (static layout example) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1: Fishing */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate__animated animate__fadeInUp">
          <img
            src="https://hayday.com/graphics/misc/explore_picture-1.jpg"
            alt="Fishing"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="font-['Lilita_One'] text-2xl text-neutral-900 mb-3">
              Fishing
            </h3>
            <p className="text-neutral-600">
              Cast your line and catch various fish in beautiful fishing spots!
            </p>
          </div>
        </div>
        {/* Feature 2: Valley */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate__animated animate__fadeInUp animate__delay-1s">
          <img
            src="https://hayday.com/graphics/misc/explore_picture-2.jpg"
            alt="Valley"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="font-['Lilita_One'] text-2xl text-neutral-900 mb-3">
              Valley
            </h3>
            <p className="text-neutral-600">
              Explore the valley and deliver goods to earn special rewards!
            </p>
          </div>
        </div>
        {/* Feature 3: Town */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate__animated animate__fadeInUp animate__delay-2s">
          <img
            src="https://hayday.com/graphics/misc/explore_picture-3.jpg"
            alt="Town"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="font-['Lilita_One'] text-2xl text-neutral-900 mb-3">
              Town
            </h3>
            <p className="text-neutral-600">
              Build and customize your own town to welcome visitors!
            </p>
          </div>
        </div>
      </div>

      {/* Cookbook Feature */}

      <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 animate__animated animate__fadeInLeft">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-['Lilita_One'] text-4xl text-neutral-900 mb-6">
                  XP Calculator
                </h3>
                <p className="text-xl text-neutral-600 mb-8">
                  Use our XP Calculator to plan your leveling strategy in Hay Day and grow your farm faster!
                </p>
                <a
                  href="/xpcalculator"
                  className="inline-block bg-[#FFB800] text-neutral-900 px-8 py-3 rounded-full font-['Lilita_One'] text-xl hover:bg-[#7AC74C] transition-colors"
                >
                  Calculate XP
                </a>
              </div>
              <div>
                <h3 className="font-['Lilita_One'] text-4xl text-neutral-900 mb-6">
                  Barn Size Calculator
                </h3>
                <p className="text-xl text-neutral-600 mb-8">
                  Maximize your storage with our Barn Size Calculator. Perfect for managing all your Hay Day goods!
                </p>
                <a
                  href="/barnsizecalculator"
                  className="inline-block bg-[#FFB800] text-neutral-900 px-8 py-3 rounded-full font-['Lilita_One'] text-xl hover:bg-[#7AC74C] transition-colors"
                >
                  Calculate Barn Size
                </a>
              </div>
            </div>
          </div>
          <div className="relative animate__animated animate__fadeInRight">
            <img
              src="https://hayday.com/graphics/misc/cookbook.png"
              alt="Hay Day Cookbook"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
        <img
          src="https://hayday.com/graphics/sprites/bee_fallback.png"
          alt=""
          className="absolute -top-10 -right-10 w-32 animate__animated animate__floating"
        />
      </div>

      <img
        src="https://hayday.com/graphics/sprites/tractor_fallback.png"
        alt=""
        className="absolute -top-10 -right-10 w-32 animate__animated animate__floating"
      />
    </div>

    {/* Decorative Elements */}
    <img
      src="https://hayday.com/graphics/misc/pigface.png"
      alt=""
      className="absolute -bottom-20 -left-20 w-64 opacity-10"
    />
    <img
      src="https://hayday.com/graphics/misc/shine.png"
      alt=""
      className="absolute top-0 right-0 w-64 opacity-10"
    />
  </section>
);
