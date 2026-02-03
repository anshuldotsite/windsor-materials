import { Marquee } from "@/components/ui/marquee";

type Review = {
  name: string;
  body: string;
  rating: 5 | 4;
};

const reviews: Review[] = [
  {
    name: "Matthew Wilson",
    rating: 5,
    body: "The cabinet boxes feel premium and sturdy. Delivery was fast and the finish looks flawless.",
  },
  {
    name: "Emily Carter",
    rating: 5,
    body: "Great communication and an easy process end-to-end. The hardware feels solid and smooth.",
  },
  {
    name: "Aarav Sharma",
    rating: 5,
    body: "Quartz install came out perfect. Clean edges, consistent pattern, and very easy to maintain.",
  },
  {
    name: "Priya Nair",
    rating: 5,
    body: "Closet layout was planned well and maximized space. Soft-close drawers are a nice touch.",
  },
  {
    name: "Omar Al-Farsi",
    rating: 5,
    body: "High quality materials and excellent finishing. The team was professional and on time.",
  },
  {
    name: "Aisha Hassan",
    rating: 5,
    body: "Beautiful modern look with durable build quality. Everything arrived exactly as expected.",
  },
  {
    name: "Wei Chen",
    rating: 5,
    body: "Strong craftsmanship and clean installation. Very satisfied with the overall experience.",
  },
  {
    name: "Min-Ji Park",
    rating: 5,
    body: "The sink and faucet set feels premium. Smooth operation and the finish matches perfectly.",
  },
  {
    name: "Hiro Tanaka",
    rating: 5,
    body: "The range hood performs great and looks sleek. Noticeably less odor and smoke in the kitchen.",
  },
  {
    name: "Fatima Al-Mansoori",
    rating: 5,
    body: "Amazing attention to detail. The final result elevated our entire kitchen and storage spaces.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-[#dda01e]" : "text-gray-200"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ name, body, rating }: Review) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <figure className="w-[350px] shrink-0 rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-gray-50 text-[#1F3A5F] flex items-center justify-center font-medium text-sm">
          {initials}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-base font-medium text-[#1F3A5F]">
            {name}
          </figcaption>
          <Stars rating={rating} />
        </div>
      </div>

      <blockquote className="text-sm leading-relaxed text-gray-500 font-light">
        “{body}”
      </blockquote>
    </figure>
  );
}

export default function ReviewsMarquee() {
  return (
    <section className="py-32 bg-gray-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-light text-[#1F3A5F] mb-4">
              Trusted by homeowners & builders
            </h2>
            <p className="text-gray-500 font-light text-lg">
              Real feedback from customers across kitchens, closets, and
              finishes.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem] py-4">
            {reviews.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-gray-50/50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-gray-50/50 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
