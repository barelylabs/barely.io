import { Suspense } from "react";
import { api } from "@barely/lib/server/api/server.edge";

import type { LinkFilterParams } from "@barely/server/link.schema";

import { DashContentHeader } from "~/app/[handle]/_components/dash-content-header";
import { AllLinks } from "~/app/[handle]/links/_components/all-links";
import { ArchiveLinkModal } from "~/app/[handle]/links/_components/archive-link-modal";
import { LinkFilters } from "~/app/[handle]/links/_components/link-filters";
import { LinkModal } from "~/app/[handle]/links/_components/link-modal";
import { NewLinkButton } from "~/app/[handle]/links/_components/new-link-button";
import { UpgradeModal } from "~/app/[handle]/settings/billing/upgrade-modal";

export default function Page({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams: LinkFilterParams;
}) {
  const { handle } = params;
  const links = api({ handle }).link.byWorkspace();

  return (
    <>
      <DashContentHeader title="Links" button={<NewLinkButton />} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-[auto,1fr]">
        <LinkFilters />

        <Suspense fallback={<div>Loading...</div>}>
          <AllLinks links={links} filters={searchParams} />
        </Suspense>
      </div>

      <LinkModal />
      <ArchiveLinkModal />

      <UpgradeModal checkoutCancelPath="links" checkoutSuccessPath="links" />
    </>
  );
}
