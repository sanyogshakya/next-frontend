import { BlockRenderer } from "components/BlockRenderer";
import { notFound } from "next/navigation";
import { getPage } from "utils/getPage";

export default async function Page({ params }) {
  const data = await getPage(params.slug.join("/"));
  if (!data) {
    notFound();
  }
  return <BlockRenderer blocks={data} />;
}
