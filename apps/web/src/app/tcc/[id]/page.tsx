import { DetailView } from "@/views/detail-view";

export default function TccDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <DetailView id={params.id} />;
}
