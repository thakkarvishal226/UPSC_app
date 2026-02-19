import { KanbanBoard } from "@/components/syllabus/kanban/board";

export default function SyllabusPage() {
  return (
    <div className="container mx-auto py-6 h-full">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Syllabus Board</h1>
      <KanbanBoard />
    </div>
  );
}
