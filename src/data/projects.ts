export interface Project {
  title: string
  slug: string
  icon: string | null
  desc: string
  disabled?: boolean
}

export const projects: Project[] = [
  {
    title: "Pokemon API Database",
    slug: "pokemon-database",
    icon: "/pokeball.png",
    desc: "Browse and explore 1000+ Pokémon with stats, abilities & evolutions powered by PokeAPI",
  },
  {
    title: "Monster Hunter Database",
    slug: "monster-hunter-database",
    icon: "/mh.webp",
    desc: "Your ultimate companion for Monster Hunter Wilds — monsters, weapons, armor & more",
  },
  {
    title: "Coming Soon",
    slug: "coming-soon",
    icon: null,
    disabled: true,
    desc: "",
  },
]
