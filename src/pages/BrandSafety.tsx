import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { BrandSafetyProfilesPage } from "@/components/brand-safety/BrandSafetyProfilesPage";

const BrandSafety = () => {
  const [program, setProgram] = useState("all");
  const [source, setSource] = useState("all");

  return (
    <AppLayout
      program={program}
      source={source}
      onProgramChange={setProgram}
      onSourceChange={setSource}
    >
      <BrandSafetyProfilesPage />
    </AppLayout>
  );
};

export default BrandSafety;
