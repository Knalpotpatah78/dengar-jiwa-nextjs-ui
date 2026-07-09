const steps = [
  { number: 1, label: "Layanan" },
  { number: 2, label: "Psikolog" },
  { number: 3, label: "Jadwal" },
  { number: 4, label: "Konfirmasi" },
];

interface BookingStepperProps {
  currentStep: number;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  currentStep > step.number
                    ? "bg-primary text-white"
                    : currentStep === step.number
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-beige text-muted"
                }`}
              >
                {currentStep > step.number ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 hidden text-xs font-medium sm:block ${
                  currentStep >= step.number ? "text-primary" : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 transition-colors ${
                  currentStep > step.number ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
