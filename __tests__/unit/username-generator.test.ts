import { generateRandomUsername, getUsernameFromStorage, regenerateUsername } from "@/lib/username-generator"
import { describe, beforeEach, test, expect, jest } from "@jest/globals"

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("Username Generator", () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.spyOn(Math, "random").mockRestore()
  })

  test("generateRandomUsername should return a string", () => {
    const username = generateRandomUsername()
    expect(typeof username).toBe("string")
  })

  test("generateRandomUsername should follow the pattern of AdjectiveNounNumber", () => {
    // Mock Math.random to return predictable values
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0) // First adjective
      .mockReturnValueOnce(0) // First noun
      .mockReturnValueOnce(0) // Number 0

    const username = generateRandomUsername()
    expect(username).toMatch(/^[A-Z][a-z]+[A-Z][a-z]+0$/)
  })

  test("getUsernameFromStorage should return existing username from localStorage", () => {
    localStorageMock.setItem("anonymous-username", "TestUser123")
    const username = getUsernameFromStorage()
    expect(username).toBe("TestUser123")
  })

  test("getUsernameFromStorage should generate and store new username if none exists", () => {
    const username = getUsernameFromStorage()
    expect(typeof username).toBe("string")
    expect(localStorageMock.getItem("anonymous-username")).toBe(username)
  })

  test("regenerateUsername should create a new username and update localStorage", () => {
    localStorageMock.setItem("anonymous-username", "OldUsername123")
    const newUsername = regenerateUsername()
    expect(newUsername).not.toBe("OldUsername123")
    expect(localStorageMock.getItem("anonymous-username")).toBe(newUsername)
  })
})

