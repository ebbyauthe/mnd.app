"use client";

import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Testimonial = {
  quote: string;
  name: string;
  gpa: string;
  avatar: string;
};

export default function ReviewsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const autoplayRef = useRef(
    Autoplay({
      delay: 3600,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplayRef.current],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3800);

    return () => window.clearInterval(timer);
  }, [emblaApi]);

  return (
    <div className="reviews-embla mt-10" ref={emblaRef}>
      <div className="reviews-embla__container">
        {testimonials.map((item, index) => (
          <div className="reviews-embla__slide" key={`${item.name}-${index}`}>
            <article className="review-card">
              <p className="review-quote">&quot;{item.quote}&quot;</p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={`${item.name} profile`}
                    className="review-avatar"
                    loading="lazy"
                  />
                  <p className="text-2xl font-bold" style={{ color: "var(--app-fg)" }}>
                    {item.name}
                  </p>
                </div>
                <p className="text-2xl font-extrabold" style={{ color: "var(--app-fg)" }}>
                  {item.gpa}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
