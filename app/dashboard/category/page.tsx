import { CategoriesTable } from "./categories-table";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <CategoriesTable />
    </div>
  );
}
