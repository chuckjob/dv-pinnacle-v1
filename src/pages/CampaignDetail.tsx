import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CampaignDetailPage } from "@/components/campaign/CampaignDetailPage";

const CampaignDetail = () => {
  const [program, setProgram] = useState("all");
  const [source, setSource] = useState("all");

  return (
    <AppLayout
      program={program}
      source={source}
      onProgramChange={setProgram}
      onSourceChange={setSource}
    >
      <CampaignDetailPage />
    </AppLayout>
  );
};

export default CampaignDetail;
