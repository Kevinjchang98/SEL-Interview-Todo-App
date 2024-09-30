import TaskList from "@/components/TaskList/TaskList";
import ActionMenu from "@/components/ActionMenu/ActionMenu";

export default function Home() {
  return (
    <>
      <h1>SEL Todo App</h1>
      <ActionMenu />
      <TaskList />
    </>
  );
}
