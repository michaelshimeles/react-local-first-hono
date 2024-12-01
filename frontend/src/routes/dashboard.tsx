import Dashboard from "@/components/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  ssr: true,
});

function DashboardPage() {
  return <Dashboard />;
}