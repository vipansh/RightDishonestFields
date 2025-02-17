import { DISCORD_INVITE_LINK } from "../../const";

const Community = () => (
  <section
    id="community"
    className="bg-[#7AC74C] py-20 relative overflow-hidden"
  >
    <div className="container mx-auto px-4">
      <h2 className="text-center font-[Lilita_One] text-5xl text-white mb-16 animate__animated animate__fadeIn">
        Join Our Community
      </h2>
      {/* Social Media Section */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-16 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="animate__animated animate__fadeInLeft">
            <h3 className="font-[Lilita_One] text-3xl text-neutral-900 mb-6">
              Follow us on Social Media
            </h3>
            <p className="text-xl text-neutral-600 mb-8">
              Stay up-to-date with the latest in Hay Day
            </p>
            <div className="relative">
              <img
                src="https://hayday.com/graphics/misc/social_comp.png"
                alt="Social Media"
                className="w-full max-w-md"
              />
            </div>
          </div>
          <div className="animate__animated animate__fadeInRight">
            {/* Discord Invitation */}
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center p-4 hover:from-green-500 hover:to-blue-600 transition-colors duration-300">
              <a
                href={DISCORD_INVITE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full text-white"
              >
                <img
                  src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0b5061df290f5892d944_full_logo_black_RGB.svg"
                  alt="Join Discord"
                  className="w-20 h-20"
                />
                <span className="text-2xl font-[Lilita_One] ml-4">
                  Join Our Community!
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="text-center text-white">
        <h3 className="font-[Lilita_One] text-4xl mb-8 animate__animated animate__fadeIn">
          Start Your Farm Today!
        </h3>
      </div>
    </div>

    {/* Decorative Elements */}
    <img
      src="https://hayday.com/graphics/misc/left_bee.png"
      alt=""
      className="absolute left-0 top-0 w-48 opacity-20"
    />
    <img
      src="https://hayday.com/graphics/misc/right_bee.png"
      alt=""
      className="absolute right-0 bottom-0 w-48 opacity-20"
    />

    {/* Floating Characters */}
    <div className="absolute top-20 left-10 animate__animated animate__floating">
      <img
        src="https://hayday.com/graphics/sprites/chicken_fallback.png"
        alt=""
        className="w-24"
      />
    </div>
    <div className="absolute bottom-20 right-10 animate__animated animate__floating animate__delay-1s">
      <img
        src="https://hayday.com/graphics/sprites/dog_fallback.png"
        alt=""
        className="w-24"
      />
    </div>
  </section>
);

export default Community;
