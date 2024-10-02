import {TaskArrayTypes} from "@/components/TaskCard/TaskCard";

export async function fetchTaskList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data.sort((row: TaskArrayTypes) => row[0])
}
