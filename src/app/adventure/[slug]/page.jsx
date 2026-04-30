import AdventureDetail from "../../../components/AdventureDetail";

export default async function Page(props) {
  const params = await props.params;
  return <AdventureDetail slug={params.slug} />;
}
