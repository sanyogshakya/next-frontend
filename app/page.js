import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation";

export default async function Home() {
  const data = await getPage("/");
  if (!data) {
    notFound();
  }
  return <BlockRenderer blocks={data} />;
}
