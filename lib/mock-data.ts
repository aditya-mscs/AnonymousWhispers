import type { Secret } from "./types"

export const mockSecrets: Secret[] = [
  {
    id: "secret-1",
    content:
      "I've been pretending to be happy for so long that I don't remember what genuine happiness feels like anymore. Every smile is forced, every laugh is rehearsed.",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    darknessLevel: 8,
    likes: 42,
    interactions: 67,
    username: "SleepyUnicorn42",
    comments: [
      {
        id: "comment-1",
        content: "I feel this way too sometimes. You're not alone.",
        timestamp: Date.now() - 1000 * 60 * 25,
        username: "FunkyPanda17",
      },
      {
        id: "comment-2",
        content: "Have you tried talking to someone professional about this?",
        timestamp: Date.now() - 1000 * 60 * 20,
        username: "WittyWaffle88",
      },
    ],
  },
  {
    id: "secret-2",
    content:
      "I sabotaged my best friend's job interview because I was jealous they might be more successful than me. They still don't know it was me.",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    darknessLevel: 7,
    likes: 18,
    interactions: 29,
    username: "GrumpyDragon33",
    comments: [
      {
        id: "comment-3",
        content: "That's really messed up. You should come clean.",
        timestamp: Date.now() - 1000 * 60 * 60,
        username: "SassyPotato55",
      },
    ],
  },
  {
    id: "secret-3",
    content:
      "I've been living a double life for years. My family thinks I'm a successful business person, but I actually lost my job months ago and have been pretending to go to work every day.",
    timestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    darknessLevel: 6,
    likes: 76,
    interactions: 103,
    username: "CosmicCupcake21",
    comments: [
      {
        id: "comment-4",
        content: "The longer you wait, the harder it will be to tell the truth.",
        timestamp: Date.now() - 1000 * 60 * 60 * 4,
        username: "QuirkyNinja77",
      },
      {
        id: "comment-5",
        content: "I did something similar once. The anxiety was unbearable.",
        timestamp: Date.now() - 1000 * 60 * 60 * 3,
        username: "DazzlingBurrito12",
      },
    ],
  },
  {
    id: "secret-4",
    content:
      "I'm terrified of being alone, but I push everyone away because I don't think I deserve love or friendship.",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    darknessLevel: 5,
    likes: 128,
    interactions: 156,
    username: "WhimsicalYeti66",
    comments: [
      {
        id: "comment-6",
        content: "This hit me hard. I do the exact same thing.",
        timestamp: Date.now() - 1000 * 60 * 60 * 23,
        username: "JazzyBagel99",
      },
    ],
  },
  {
    id: "secret-5",
    content:
      "I stole money from my parents when I was a teenager to buy drugs. They blamed my younger sibling, and I never spoke up. The guilt eats me alive every day.",
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    darknessLevel: 9,
    likes: 54,
    interactions: 89,
    username: "MysticalPirate44",
    comments: [
      {
        id: "comment-7",
        content: "It's never too late to make amends.",
        timestamp: Date.now() - 1000 * 60 * 60 * 47,
        username: "SillyAstronaut11",
      },
      {
        id: "comment-8",
        content: "That's really heavy. Have you considered therapy to process this?",
        timestamp: Date.now() - 1000 * 60 * 60 * 46,
        username: "SparklyTaco23",
      },
    ],
  },
]

