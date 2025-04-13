export function ExpertiseSection() {
  const EXPERTISES = [
    "Litigation",
    "Corporate Law",
    "Intellectual Property",
    "Litigation and Dispute Resolution",
    "Employment Law",
    "Real Estate",
    "Tax Law",
    "Family Law",
  ];

  return (
    <div className="max-md:px-12 max-md:py-12 px-16 items-center text-center py-18 bg-neutral-50 text-neutral-950 w-full z-0 relative flex flex-col gap-8">
      <h1 className="md:text-4xl text-3xl font-bold">Our Expertise</h1>
      <p>
        We provide a wide range of legal services designed to support your
        business needs. Our team of experts has extensive experience across
        various areas of law, including:
      </p>
      <div className="flex flex-wrap w-fit items-center justify-center gap-4 md:mt-10 mt-4">
        {EXPERTISES.map((expertise, index) => (
          <div
            key={index}
            className="bg-neutral-900 text-neutral-50 p-4 flex items-center justify-center text-center"
          >
            {expertise}
          </div>
        ))}
      </div>
    </div>
  );
}
