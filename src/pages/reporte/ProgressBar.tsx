type ProgressBarProps = {
  step: number;
  isMobile?: boolean;
};

export const ProgressBar = ({ step, isMobile }: ProgressBarProps) => {
  return (
    <div
      className={`flex items-center mb-6 ${
        isMobile ? "justify-between gap-3" : "justify-center gap-6"
      }`}
    >
      <StepCircle active={step >= 1} number={1} label="Completar datos" />
      <Divider active={step >= 2} />
      <StepCircle active={step >= 2} number={2} label="Pago" />
      <Divider active={step >= 3} />
      <StepCircle active={step >= 3} number={3} label="Documento" />
    </div>
  );
};

const StepCircle = ({
  active,
  number,
  label,
}: {
  active: boolean;
  number: number;
  label: string;
}) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 text-xs md:text-sm font-semibold
      ${active ? "bg-[#00b8a9] text-white border-[#00b8a9]" : "border-gray-300 text-gray-400"}
    `}
    >
      {number}
    </div>
    <p
      className={`text-[10px] md:text-xs mt-1 md:mt-2 ${
        active ? "text-[#00b8a9]" : "text-gray-400"
      }`}
    >
      {label}
    </p>
  </div>
);

// 👇 AQUÍ ESTABA EL PROBLEMA: antes tenía `hidden md:block`
const Divider = ({ active }: { active: boolean }) => (
  <div
    className={`h-[2px] w-8 md:w-12 ${
      active ? "bg-[#00b8a9]" : "bg-gray-300"
    }`}
  />
);
