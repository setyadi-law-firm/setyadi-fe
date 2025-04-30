import { FIRM_VALUES } from "./constants";

export function ValuesSection() {
  return (
    <div className="w-full z-0 relative flex flex-col max-md:px-12 max-md:py-12 px-16 py-18 gap-6">
      <h4 className="text-lg text-neutral-950 font-semibold mb-4">
        Our Values
      </h4>
      <div className="flex max-md:flex-col gap-4 justify-between items-center overflow-auto">
        {FIRM_VALUES.map((value, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 bg-[#F5F5F5] p-6 rounded-lg shadow-md w-full md:w-64 shrink-0 md:aspect-[3/4] aspect-[4/3]"
          >
            <div className="text-[#1059BD] font-semibold text-2xl">
              {value.header}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#777675]">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
