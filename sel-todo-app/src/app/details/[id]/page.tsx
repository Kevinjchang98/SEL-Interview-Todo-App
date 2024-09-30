import TaskDetails from "@/components/TaskDetails/TaskDetails";

export default async function TaskDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <TaskDetails id={params.id} />;
}
