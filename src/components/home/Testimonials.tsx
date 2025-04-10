
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "This visualization tool has completely transformed how I understand data structures. Being able to see the algorithms in action makes complex concepts click instantly.",
    name: "Samir Kariya",
    role: "Computer Science Teacher",
    initials: "SK"
  },
  {
    quote: "As a professor, I've integrated this tool into my curriculum. The interactive visualizations help students grasp concepts faster than traditional teaching methods alone.",
    name: "Dr. Krunal Vagehla",
    role: "CS HOD",
    initials: "KV"
  },
  {
    quote: "The ability to visualize algorithms step-by-step helped me prepare for technical interviews. I can now explain complex data structures with confidence.",
    name: "Deep Ratanpara",
    role: "Student",
    initials: "DR"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Students & Educators Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
