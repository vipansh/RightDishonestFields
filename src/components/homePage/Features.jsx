export const Features = () => (
      <section id="features" className="bg-neutral-100 py-20 relative">
        <div className="container mx-auto px-4">
          {/* Feature 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 animate__animated animate__fadeInLeft">
              <img
                src="https://hayday.com/graphics/misc/greetings_picture.jpg"
                alt="Farm Life"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6 animate__animated animate__fadeInRight">
              <h2 className="font-['Lilita_One'] text-4xl text-neutral-900">
                A New Life Awaits!
              </h2>
              <p className="text-xl text-neutral-700 font-['Open_Sans']">
                Greetings from your Uncle! How'd you like to be farmer? I've decided
                to retire. The farm is yours if you want it!
              </p>
            </div>
          </div>
    
          {/* Feature 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6 animate__animated animate__fadeInLeft">
              <h2 className="font-['Lilita_One'] text-4xl text-neutral-900">
                Grow and Customize Your Farm!
              </h2>
              <p className="text-xl text-neutral-700 font-['Open_Sans']">
                Hang out with all the animals - they're unconventionally adorable!
                Delight farm visitors and friends with fresh goods and even fresher
                decorations.
              </p>
            </div>
            <div className="animate__animated animate__fadeInRight">
              <img
                src="https://hayday.com/graphics/misc/overview_picture.jpg"
                alt="Farm Customization"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
    
          {/* Feature 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 animate__animated animate__fadeInLeft">
              <img
                src="https://hayday.com/graphics/misc/connect_picture.jpg"
                alt="Connect with Friends"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6 animate__animated animate__fadeInRight">
              <h2 className="font-['Lilita_One'] text-4xl text-neutral-900">
                Connect With Your Friends!
              </h2>
              <p className="text-xl text-neutral-700 font-['Open_Sans']">
                Play with your pals by trading crops and goods. Form neighborhoods
                to keep in touch, compete in the Derby, contribute to Global
                Community Events, and more!
              </p>
            </div>
          </div>
    
          {/* Feature Gallery */}
          <div className="grid lg:grid-cols-3 gap-6 mt-12">
            <div className="animate__animated animate__fadeIn">
              <img
                src="https://hayday.com/graphics/misc/explore_picture-1.jpg"
                alt="Explore 1"
                className="rounded-xl shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="animate__animated animate__fadeIn animate__delay-1s">
              <img
                src="https://hayday.com/graphics/misc/explore_picture-2.jpg"
                alt="Explore 2"
                className="rounded-xl shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="animate__animated animate__fadeIn animate__delay-2s">
              <img
                src="https://hayday.com/graphics/misc/explore_picture-3.jpg"
                alt="Explore 3"
                className="rounded-xl shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
    
        {/* Decorative Elements */}
        <div className="absolute left-0 animate__animated animate__floating">
          <img
            src="https://hayday.com/graphics/sprites/bee_fallback.png"
            alt=""
            className="w-16"
          />
        </div>
        <div className="absolute right-0 animate__animated animate__floating animate__delay-1s">
          <img
            src="https://hayday.com/graphics/sprites/cat_fallback.png"
            alt=""
            className="w-16"
          />
        </div>
      </section>
    );
    