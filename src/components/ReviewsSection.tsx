import { Star } from "lucide-react";

export default function ReviewsSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="section-shell p-8 md:p-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 gradient-text">Reviews</h2>
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star key={rating} size={28} className="text-muted-foreground/35" />
            ))}
          </div>
          <p className="font-display text-5xl font-bold text-foreground mb-4">0 Reviews</p>
          <p className="text-muted-foreground text-lg">We are just getting started. Our success stories will be here soon.</p>
        </div>
      </div>
    </section>
  );
}
