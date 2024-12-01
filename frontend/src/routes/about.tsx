import AboutPage from "@/components/about";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  ssr: true,
});

function About() {
  return <AboutPage />;
}
