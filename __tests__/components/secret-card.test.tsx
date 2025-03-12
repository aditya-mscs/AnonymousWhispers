import { render, screen, fireEvent } from "@testing-library/react"
import { ChakraProvider } from "@chakra-ui/react"
import { SecretCard } from "@/components/secret-card"

// Mock secret data
const mockSecret = {
  id: "test-secret-1",
  content: "This is a test secret",
  timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
  darknessLevel: 5,
  likes: 10,
  comments: [
    {
      id: "comment-1",
      content: "Test comment",
      timestamp: Date.now() - 1000 * 60 * 25,
      username: "TestUser1",
    },
  ],
  username: "TestUser2",
}

// Mock navigator.share and navigator.clipboard
Object.defineProperty(navigator, "share", {
  value: jest.fn().mockResolvedValue(true),
  configurable: true,
})

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: jest.fn().mockResolvedValue(true),
  },
  configurable: true,
})

describe("SecretCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders the secret content and username", () => {
    render(
      <ChakraProvider>
        <SecretCard secret={mockSecret} />
      </ChakraProvider>,
    )

    expect(screen.getByText("This is a test secret")).toBeInTheDocument()
    expect(screen.getByText("TestUser2")).toBeInTheDocument()
  })

  test("like button increments count when clicked", () => {
    render(
      <ChakraProvider>
        <SecretCard secret={mockSecret} />
      </ChakraProvider>,
    )

    const likeButton = screen.getByText("10").closest("button")
    expect(likeButton).toBeInTheDocument()

    if (likeButton) {
      fireEvent.click(likeButton)
      expect(screen.getByText("11")).toBeInTheDocument()

      // Click again to unlike
      fireEvent.click(likeButton)
      expect(screen.getByText("10")).toBeInTheDocument()
    }
  })

  test("shows comments when comment button is clicked", () => {
    render(
      <ChakraProvider>
        <SecretCard secret={mockSecret} />
      </ChakraProvider>,
    )

    // Comments should not be visible initially
    expect(screen.queryByText("Add a comment...")).not.toBeInTheDocument()

    const commentButton = screen.getByText("1").closest("button")
    expect(commentButton).toBeInTheDocument()

    if (commentButton) {
      fireEvent.click(commentButton)

      // Comment section should now be visible
      expect(screen.getByText("Add a comment...")).toBeInTheDocument()
      expect(screen.getByText("Test comment")).toBeInTheDocument()
      expect(screen.getByText("TestUser1")).toBeInTheDocument()
    }
  })

  test("share button calls navigator.share when available", () => {
    render(
      <ChakraProvider>
        <SecretCard secret={mockSecret} />
      </ChakraProvider>,
    )

    const shareButton = screen.getByText("Share").closest("button")
    expect(shareButton).toBeInTheDocument()

    if (shareButton) {
      fireEvent.click(shareButton)
      expect(navigator.share).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Anonymous Dark Secret",
          text: "This is a test secret...",
        }),
      )
    }
  })

  test("adds a new comment when post button is clicked", () => {
    render(
      <ChakraProvider>
        <SecretCard secret={mockSecret} />
      </ChakraProvider>,
    )

    // Open comments section
    const commentButton = screen.getByText("1").closest("button")
    if (commentButton) {
      fireEvent.click(commentButton)
    }

    // Add a new comment
    const textarea = screen.getByPlaceholderText("Add a comment...")
    fireEvent.change(textarea, { target: { value: "This is a new test comment" } })

    const postButton = screen.getByText("Post")
    fireEvent.click(postButton)

    // New comment should be visible
    expect(screen.getByText("This is a new test comment")).toBeInTheDocument()
  })
})

