import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Tanmay Islam",
    message:
      "ApplyIQ helped me land multiple interviews with ease. The AI resume tips really made a difference!",
    img: "https://i.ibb.co/sdTfWPM4/aditya.webp",
  },
  {
    name: "Aditya Roy",
    message:
      "The job tracking and email reminders keep me organized and on top of my applications.",
    img: "https://i.ibb.co/rGd84fSj/daniel.webp",
  },
  {
    name: "Maya Naura",
    message:
      "Scheduling interviews synced with Google Calendar is a game-changer for my workflow.",
    img: "https://i.ibb.co/gZYkv893/naura.webp",
  },
  {
    name: "Maya Rahman",
    message:
      "The analytics dashboard gives me real insights to improve my job search success rate.",
    img: "https://i.ibb.co/jvqZdYrH/man-3.jpg",
  },
  {
    name: "Ethan Lee",
    message:
      "ApplyIQ's UI is super intuitive, making job hunting less stressful and more productive.",
    img: "https://i.ibb.co/gMz5Hk0X/man-2.jpg",
  },
  {
    name: "Lucas Smith",
    message:
      "Integrating resumes and tracking applications in one place saved me hours each week!",
    img: "https://i.ibb.co/w3Rj0Mm/man-1.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-white border-t border-primary/10">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-montserrat  mb-4">
          What Our Users Say
        </h2>
        <p className="text-lg font-openSans text-gray-700 max-w-2xl mx-auto">
          Real feedback from ApplyIQ users who streamlined their job search and landed their dream roles.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        loop={true}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col items-center bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/20 h-full"
              style={{ minHeight: "360px" }} // uniform card height
            >
              {/* User Photo */}
              <img
                src={t.img}
                alt={t.name}
                className="w-full h-56 object-cover rounded-t-2xl"
                loading="lazy"
              />

              {/* Name and Message Container */}
              <div className="w-full bg-primary/20 backdrop-blur-md px-6 rounded-b-2xl text-center flex flex-col justify-center flex-grow">
                <h3 className="text-lg md:text-xl font-bold font-montserrat text-primary mb-2 mt-4">
                  {t.name}
                </h3>
                <p className="text-gray-800 font-openSans leading-relaxed px-2 mb-6">
                  {t.message}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
