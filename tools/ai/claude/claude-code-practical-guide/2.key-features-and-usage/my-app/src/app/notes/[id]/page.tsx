export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <p>Note editor — id: {id}</p>;
}
