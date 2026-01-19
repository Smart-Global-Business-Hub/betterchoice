import { useState, useEffect } from "react";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import image6 from "../../assets/image6.jpg";
import image7 from "../../assets/image7.jpg";
import image8 from "../../assets/image8.jpg";
import image9 from "../../assets/image9.jpg";
import image10 from "../../assets/image10.jpg";

const heroSlides = [
  {
    image: image1,
    title: "Empowerment Through Development",
    subtitle: "Transforming Lives through Sustainable Development, Quality Education, Vocational Training & Thriving Community Centers.",
  },
  {
    image: image2,
    title: "where everyone can thrive, today and tomorrow.",
    subtitle: "We partner with communities to unlock human potential, build resilient futures, and create inclusive spaces",
  },
];

const whatWeDoItems = [
  {
    image: image4,
    tags: ["15,000 students supported annually", "Climate-adaptive"],
    title: "Sustainable Development",
    description: "We implement community-led initiatives that promote environmental sustainability, economic resilience, and long-term wellbeing.",
  },
  {
    image: image5,
    tags: ["Formal and Non-Formal Education", "School Rehabilitation"],
    title: "Education for All",
    description: "Education is the backbone of societal empowerment and innovation. We work to improve educational access, quality, and equity across communities.",
  },
  {
    image: image6,
    tags: ["Business skills", "entrepreneurship workshops"],
    title: "Vocational Training & Skills Development",
    description: "Our vocational programs transform lives by equipping youth and adults with practical skills that lead to meaningful employment and entrepreneurship.",
  },
  {
    image: image7,
    tags: ["Supportive Housing Initiatives", "Multipurpose centers"],
    title: "Community Centers & Supportive Housing",
    description: "Community centers are the heart of our programs—safe places where people gather to learn, grow, innovate, and belong.",
  },
];

const impactStats = [
  "500+ women trained in sustainable farming",
  "40% increase in crop yields",
  "Economic empowerment for entire families",
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white w-full overflow-x-hidden">
      {/* Hero Section with Slider */}
      <section className="relative h-screen min-h-[600px] pt-16 lg:pt-20">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl text-white">
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {slide.title}
                </h1>
                <p className="text-lg lg:text-xl opacity-90 mb-8">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                      onClick={() => scrollToSection("get-involved")}
                      className="group bg-[#33BBFF] hover:bg-[#1AA3E8] text-white font-medium px-8 py-4 rounded-full flex items-center gap-2 transition-colors"
                  >
                    Get Involved
                    <svg
                        className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => scrollToSection("what-we-do")}
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium px-8 py-4 rounded-full transition-colors"
                  >
                    Explore Our Work
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-8 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-8 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 lg:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#33BBFF] text-sm font-medium px-4 py-2 border border-[#ECF7FE] bg-[#ECF7FE] rounded-full mb-6"
                  style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "18px" }}>
              About Us
            </span>
            <h2
              className=" text-gray-900 mb-8 "
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "48px" }}
            >
              Committed to Creating Lasting Change
            </h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto mb-6"
               style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "18px" }}>
              Kobac is a community-driven development organization committed to fostering sustainable development, high-quality education, relevant vocational training, and inclusive community centers with supportive housing solutions. We believe that empowered communities—from children to youth and adults—drive long-lasting social and economic progress.
            </p>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "18px" }}>
              Our work is guided by the principles of{" "}
              <span className="text-[#009966]">equity,</span>{" "}
              <span className="text-[#155DFC]">dignity,</span>{" "}
              <span className="text-[#9810FA]">inclusion,</span>{" "}
              <span className="text-[#F54900]">collaboration,</span> and{" "}
              <span className="text-[#E60076]">sustainability</span>{" "}
              ensuring that communities have the tools, skills, and environments needed to lead prosperous lives.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-[#F0FDF4] rounded-2xl p-8 lg:p-10">
              <div className="w-12 h-12 bg-[#00A63E] rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#FFFFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "24px" }}>
                Our Vision
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
                A world where communities are educated, skilled, resilient, and have access to sustainable development opportunities and inclusive living spaces.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-[#EFF6FF] rounded-2xl p-8 lg:p-10">
              <div className="w-12 h-12 bg-[#155DFC] rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#FFFFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "24px" }}>
                Our Mission
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
                To collaborate with communities, governments, and partners in delivering holistic development programs that:
              </p>
              <ul className="space-y-3">
                {[
                  "Strengthen education systems and learning outcomes",
                  "Provide vocational and technical training linked to real job opportunities",
                  "Build and support community centers that function as hubs for learning, skills, and wellbeing",
                  "Develop sustainable housing and safe communal spaces that foster social inclusion and dignity",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_29_1126)">
                        <path d="M18.1675 8.33332C18.548 10.2011 18.2768 12.1428 17.399 13.8348C16.5212 15.5268 15.0899 16.8667 13.3437 17.6311C11.5976 18.3955 9.64215 18.5381 7.80354 18.0353C5.96494 17.5325 4.35429 16.4145 3.24019 14.8678C2.12609 13.3212 1.5759 11.4394 1.68135 9.53615C1.7868 7.63294 2.54153 5.8234 3.81967 4.4093C5.09781 2.9952 6.82211 2.06202 8.70502 1.76537C10.5879 1.46872 12.5156 1.82654 14.1666 2.77916" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.5 9.16671L10 11.6667L18.3333 3.33337" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_29_1126">
                          <rect width="20" height="20" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[#33BBFF] text-sm font-medium px-4 py-2 border border-[#ECF7FE] bg-[#ECF7FE] rounded-full mb-6"
                  style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "18px" }}>
              Featured Story
            </span>
            <h2
              className=" text-gray-900 mb-6"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "24px" }}
            >
              Empowering Women Through Sustainable Agriculture
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto"
               style={{ fontFamily: "Inter, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
              In rural Kenya, our agricultural training program has helped over 500 women farmers increase their crop yields by 40% and gain financial independence. Meet Sarah, one of many success stories transforming her community.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={image3}
              alt="Women in sustainable agriculture"
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 right-8">
              <button className="text-white flex items-center gap-2 hover:underline">
                Read Full Story
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {impactStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1675 8.33332C18.548 10.2011 18.2768 12.1428 17.399 13.8348C16.5212 15.5268 15.0899 16.8667 13.3437 17.6311C11.5976 18.3955 9.64215 18.5381 7.80354 18.0353C5.96494 17.5325 4.35429 16.4145 3.24019 14.8678C2.12609 13.3212 1.5759 11.4394 1.68135 9.53615C1.7868 7.63294 2.54153 5.8234 3.81967 4.4093C5.09781 2.9952 6.82211 2.06202 8.70502 1.76537C10.5879 1.46872 12.5156 1.82654 14.1666 2.77916" stroke="#3DB1F5" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.5 9.16659L10 11.6666L18.3333 3.33325" stroke="#3DB1F5" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <span className="text-[#364153]" style={{ fontFamily: "Inter, sans-serif", fontWeight: "400px", fontSize: "16px" }}>{stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 lg:py-32 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#33BBFF] text-sm font-medium px-4 py-2 border border-[#ECF7FE] bg-[#ECF7FE] rounded-full mb-6"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: "500px", fontSize: "18px" }}>
              What We Do
            </span>
            <h2
              className="text-[0A0A0A] mb-6"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: "500px", fontSize: "48px" }}
            >
              Committed to Creating Lasting Change
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "18px" }}>
              Our programs are designed in partnership with communities to address their most pressing needs and create sustainable solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whatWeDoItems.map((item, index) => (
              <div key={index} className="bg-[white] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs text-[#008236] bg-[#DCFCE7] px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className=" text-[#101828] mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "600px", fontSize: "24px" }}>
                    {item.title}
                  </h3>
                  <p className="text-[#4A5565] mb-4" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>{item.description}</p>
                  <button className="text-[#33BBFF] font-medium flex items-center gap-2 hover:underline">
                    Learn More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Report Section */}
      <section id="impact" className="py-20 lg:py-32 bg-[#33BBFF] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-white text-sm font-medium px-4 py-2 bg-white/20 rounded-full mb-6">
              Impact Report
            </span>
            <h2
              className="text-white mb-6"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "36px" }}
            >
              Measuring What Matters
            </h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto" style={{ fontFamily: "Inter, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
              Transparency and accountability are at the heart of everything we do. Here's our impact by the numbers.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10" >
            {[
              { number: "5000+", label: "Learners Supported", sublabel: "in quality education programs" },
              { number: "3000+", label: "Youth Trained", sublabel: "in vocational and technical skills" },
              { number: "100+", label: "Community Centers", sublabel: "Built or supported" },
              { number: "500+", label: "Families Housed", sublabel: "provided with safe housing support" },
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {stat.number}
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-white/70 text-sm">{stat.sublabel}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-white text-[#33BBFF] px-8 py-4 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: "500px", fontSize: "20px" }}>
              Download Full Impact Report
            </button>
          </div>
        </div>
      </section>
      <p className="text-center text-black mt-8"
         style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
        These metrics represent our commitment to transparency and measurable impact in the communities we serve.
      </p>
      {/* Stories of Impact Section */}
      <section className="py-20 lg:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-gray-900 mb-6"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "48px" }}
            >
              Stories of Impact
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "18px" }}>
              Real stories from real people whose lives have been transformed through our programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { image: image8, location: "Uganda", title: "Building Brighter Futures Through Education" },
              { image: image9, location: "Ghana", tags: ["Climate-adaptive"], title: "Creating Opportunities for Young Leaders" },
              { image: image10, location: "Somalia", tags: ["Climate-adaptive"], title: "Bringing Healthcare to Remote Villages" },
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs text-[#008236] bg-[#DCFCE7] px-3 py-1 rounded-full">
                      {story.location}
                    </span>
                    {story.tags?.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs text-[#008236] bg-[#DCFCE7] px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "600px", fontSize: "24px" }}>
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
                    We implement community-led initiatives that promote environmental sustainability, economic resilience, and long-term wellbeing.
                  </p>
                  <button className="text-[#33BBFF] font-medium flex items-center gap-2 hover:underline">
                    Read More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-20 lg:py-32  scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#33BBFF] text-sm font-medium px-4 py-2 border border-[#ECF7FE] bg-[#ECF7FE] rounded-full mb-6"
                  style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "18px" }}>
              Get Involved
            </span>
            <h2
              className="text-[#0A0A0A] mb-6"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "48px" }}
            >
              Join us in making a difference
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore opportunities to volunteer, donate, or partner with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Volunteer Card */}
            <div className="bg-[#F0FDF4] rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#00A63E] rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "600px", fontSize: "20px" }}>
                Volunteer
              </h3>
              <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
                Join our education & training teams and make a direct impact in communities
              </p>
              <button className="w-full border-2 border-[#00A63E] text-[#00A63E] font-medium py-3 rounded-full hover:bg-[#00A63E] hover:text-white transition-colors">
                Apply to Volunteer
              </button>
            </div>

            {/* Partner Card */}
            <div className="bg-[#EFF6FF] rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#155DFC] rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "600px", fontSize: "20px" }}>
                Partner
              </h3>
              <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
                Collaborate with us on sustainable development projects and community initiatives
              </p>
              <button className="w-full border-2 border-[#155DFC] text-[#155DFC] font-medium py-3 rounded-full hover:bg-[#155DFC] hover:text-white transition-colors">
                Become a Partner
              </button>
            </div>

            {/* Support Centers Card */}
            <div className="bg-[#FDF4FF] rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#9810FA] rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "600px", fontSize: "20px" }}>
                Support Centers
              </h3>
              <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
                Help us build and maintain community centers and housing initiatives
              </p>
              <button className="w-full border-2 border-[#9810FA] text-[#9810FA] font-medium py-3 rounded-full hover:bg-[#9810FA] hover:text-white transition-colors">
                Learn More
              </button>
            </div>

            {/* Donate Card */}
            <div className="bg-[#FFF7ED] rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#F54900] rounded-full flex items-center justify-center mb-6">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#F54900"/>
                  <path d="M17 20L23 26" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 26L22 20L24 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 17H26" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 14H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M34 34L29 24L24 34" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M26 30H32" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "600px", fontSize: "20px" }}>
                Donate
              </h3>
              <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
                Your contribution directly changes lives and builds stronger communities
              </p>
              <button className="w-full border-2 border-[#F54900] text-[#F54900] font-medium py-3 rounded-full hover:bg-[#F54900] hover:text-white transition-colors">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-[#33BBFF] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-[#ffffff] mb-8"
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "60px" }}
              >
                Get in touch with us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0174B852] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-white/80">info@kobacdev.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0174B852] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-white/80">+252 - 634496816</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{marginTop:"20%"}}>
              <form className="space-y-6">
                <input
                    type="text"
                    className="w-full bg-transparent border-0 border-b border-white/60 px-0 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-0"
                    placeholder="First name"
                />

                <div className="relative">
                  <input
                      type="email"
                      className="w-full bg-transparent border-0 border-b border-white/60 px-0 py-3 pr-12 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-0"
                      placeholder="Email"
                  />

                  <button
                      type="submit"
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-white"
                  >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#364153] mb-4"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "24px" }}
            >
              Trusted Partners
            </h2>
            <p className="text-[#4A5565]" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "400px", fontSize: "16px" }}>
              Working together with leading organizations to create lasting impact
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {["United Nations", "World Bank", "USAID", "European Union", "Gates Foundation", "UNICEF"].map((partner, index) => (
              <div key={index} className="text-[#000000]" style={{ fontFamily: "Manrope, sans-serif", fontWeight: "500px", fontSize: "14px" }}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
