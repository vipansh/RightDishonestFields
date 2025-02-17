export const Characters = () => (
  <section
    id="characters"
    className="bg-[#4D8B31] py-20 relative overflow-hidden"
  >
    <div className="container mx-auto px-4">
      <h2 className="text-center font-['Lilita_One'] text-5xl text-white mb-16 animate__animated animate__fadeIn">
        Meet The Farm Family
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Character 1 */}
        <div className="bg-white rounded-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300 animate__animated animate__fadeInUp">
          <div className="relative h-64">
            <img
              src="https://hayday.com/graphics/sprites/chicken_fallback.png"
              alt="Chicken"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-full object-contain"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="font-['Lilita_One'] text-2xl text-neutral-900">
              Farm Chicken
            </h3>
            <p className="text-neutral-600 mt-2">
              Your reliable egg producer and cheerful morning alarm!
            </p>
          </div>
        </div>
        {/* Character 2 */}
        <div className="bg-white rounded-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300 animate__animated animate__fadeInUp animate__delay-1s">
          <div className="relative h-64">
            <img
              src="https://hayday.com/graphics/sprites/dog_fallback.png"
              alt="Dog"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-full object-contain"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="font-['Lilita_One'] text-2xl text-neutral-900">
              Faithful Dog
            </h3>
            <p className="text-neutral-600 mt-2">
              Your loyal companion and farm guardian!
            </p>
          </div>
        </div>
        {/* Character 3 */}
        <div className="bg-white rounded-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300 animate__animated animate__fadeInUp animate__delay-2s">
          <div className="relative h-64">
            <img
              src="https://hayday.com/graphics/sprites/cat_fallback.png"
              alt="Cat"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-full object-contain"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="font-['Lilita_One'] text-2xl text-neutral-900">
              Curious Cat
            </h3>
            <p className="text-neutral-600 mt-2">
              The perfect mouse catcher and milk lover!
            </p>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <img
        src="https://hayday.com/graphics/misc/greetings_comp-front.png"
        alt=""
        className="absolute bottom-0 left-0 w-48 opacity-20"
      />
      <img
        src="https://hayday.com/graphics/misc/greetings_comp-back.png"
        alt=""
        className="absolute top-0 right-0 w-48 opacity-20"
      />
    </div>
    {/* Floating elements */}
    <div className="absolute top-20 left-10 animate-in">
      <img
        src="https://hayday.com/graphics/sprites/bee_fallback.png"
        alt=""
        className="w-16"
      />
    </div>
    <div className="absolute bottom-20 right-10 animate-bounce">
      <img
        src="https://hayday.com/graphics/sprites/fish_fallback.png"
        alt=""
        className="w-16"
      />
    </div>
  </section>
);
