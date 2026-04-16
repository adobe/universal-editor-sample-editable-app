import ArticleDetail from "../../../../components/ArticleDetail";

export default async function Page(props) {
  const params = await props.params;
  return <ArticleDetail slug={params.slug} />;
}
