import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CampaignHealthPage } from "@/components/dashboard/CampaignHealthPage";

const Index = () => {
  const [program, setProgram] = useState("all");
  const [source, setSource] = useState("all");

  return (
    <AppLayout
      program={program}
      source={source}
      onProgramChange={setProgram}
      onSourceChange={setSource}
    >
      <CampaignHealthPage sourceFilter={source} />
    </AppLayout>
  );
};

export default Index;
