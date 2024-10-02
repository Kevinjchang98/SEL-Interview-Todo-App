export async function fetchTaskList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/`, {
    cache: "no-store",
  });
  return res.json();
}
