const adjectives = [
  "Sleepy",
  "Grumpy",
  "Happy",
  "Dopey",
  "Bashful",
  "Sneezy",
  "Doc",
  "Fluffy",
  "Silly",
  "Witty",
  "Clever",
  "Quirky",
  "Sassy",
  "Jazzy",
  "Funky",
  "Groovy",
  "Cosmic",
  "Mystical",
  "Whimsical",
  "Zany",
  "Dazzling",
  "Glittery",
  "Sparkly",
  "Shimmering",
  "Radiant",
]

const nouns = [
  "Panda",
  "Unicorn",
  "Dragon",
  "Phoenix",
  "Narwhal",
  "Yeti",
  "Sasquatch",
  "Ninja",
  "Pirate",
  "Wizard",
  "Astronaut",
  "Viking",
  "Samurai",
  "Knight",
  "Muffin",
  "Cupcake",
  "Pancake",
  "Waffle",
  "Cookie",
  "Donut",
  "Bagel",
  "Potato",
  "Pickle",
  "Banana",
  "Avocado",
  "Taco",
  "Burrito",
  "Pizza",
]

export function generateRandomUsername(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const number = Math.floor(Math.random() * 100)

  return `${adjective}${noun}${number}`
}

export function getUsernameFromStorage(): string {
  if (typeof window === "undefined") return "Anonymous"

  let username = localStorage.getItem("anonymous-username")

  if (!username) {
    username = generateRandomUsername()
    localStorage.setItem("anonymous-username", username)
  }

  return username
}

export function regenerateUsername(): string {
  if (typeof window === "undefined") return "Anonymous"

  const newUsername = generateRandomUsername()
  localStorage.setItem("anonymous-username", newUsername)

  return newUsername
}

