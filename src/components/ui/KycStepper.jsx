import { kycSteps } from "../../data/kyc.js";

export function KycStepper({ activeIndex }) {
  return (
    <div className="kyc-stepper">
      {kycSteps.map((label, index) => (
        <span className={index + 1 <= activeIndex ? "active" : ""} key={label}>
          {label}
        </span>
      ))}
    </div>
  );
}

