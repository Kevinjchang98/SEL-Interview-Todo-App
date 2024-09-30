import TaskDetails from "@/components/TaskDetails/TaskDetails";

/**
 * Returns details for a particular task and lets users edit the title or description
 * @param params
 * @constructor
 */
export default async function TaskDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <TaskDetails id={params.id} />;
}
