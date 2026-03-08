import { redirect } from "next/navigation";

export default async function LegacyStudyRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/studyroom/${id}?tab=study-guide`);
}
