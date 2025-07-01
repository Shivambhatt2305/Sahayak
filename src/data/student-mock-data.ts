import { Atom, Divide, Globe, Landmark } from "lucide-react";

export const subjects = [
  {
    name: "Mathematics",
    slug: "mathematics",
    description: "Explore algebra, calculus, geometry and more.",
    icon: Divide,
    chapters: [
      { name: "Algebra Basics", slug: "algebra-basics" },
      { name: "Linear Equations", slug: "linear-equations" },
      { name: "Quadratic Functions", slug: "quadratic-functions" },
      { name: "Introduction to Calculus", slug: "intro-to-calculus" },
    ],
  },
  {
    name: "Science",
    slug: "science",
    description: "Uncover the worlds of biology, chemistry, and physics.",
    icon: Atom,
    chapters: [
      { name: "Cellular Biology", slug: "cellular-biology" },
      { name: "The Periodic Table", slug: "periodic-table" },
      { name: "Newton's Laws of Motion", slug: "newtons-laws" },
      { name: "Ecosystems and Biomes", slug: "ecosystems" },
    ],
  },
  {
    name: "History",
    slug: "history",
    description: "Journey through ancient civilizations to modern times.",
    icon: Landmark,
    chapters: [
      { name: "Ancient Rome", slug: "ancient-rome" },
      { name: "The Renaissance", slug: "the-renaissance" },
      { name: "The Industrial Revolution", slug: "industrial-revolution" },
      { name: "World War II", slug: "world-war-2" },
    ],
  },
  {
    name: "Geography",
    slug: "geography",
    description: "Learn about the world, its people, and its landscapes.",
    icon: Globe,
    chapters: [
      { name: "World Climates", slug: "world-climates" },
      { name: "Plate Tectonics", slug: "plate-tectonics" },
      { name: "Population Distribution", slug: "population-distribution" },
      { name: "Cultural Landscapes", slug: "cultural-landscapes" },
    ],
  },
];
