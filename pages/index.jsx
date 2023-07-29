import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";

export default function Home() {
  return (
    <>
      <ListLayout>
        <ListItem make={"BMW"} model={"M4"} />
      </ListLayout>
    </>
  );
}
