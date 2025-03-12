import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ChakraProvider } from "@chakra-ui/react"
import { SecretInput } from "@/components/secret-input"
import { createSecret } from "@/lib/actions"

// Mock the server action
jest.mock("@/lib/actions", () => ({
  createSecret: jest.fn().mockResolvedValue({
    id: "test-id",
    content: "Test secret content",
    timestamp: Date.now(),
    darknessLevel: 5,
  }),
}))

// Mock SpeechRecognition
const mockSpeechRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}

global.SpeechRecognition = jest.fn().mockImplementation(() => mockSpeechRecognition)
global.webkitSpeechRecognition = jest.fn().mockImplementation(() => mockSpeechRecognition)

describe("SecretInput Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders the textarea and buttons", () => {
    render(
      <ChakraProvider>
        <SecretInput />
      </ChakraProvider>,
    )

    expect(screen.getByPlaceholderText(/share your secret/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /record your secret/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /share anonymously/i })).toBeInTheDocument()
  })

  test("submit button is disabled when text is too short", () => {
    render(
      <ChakraProvider>
        <SecretInput />
      </ChakraProvider>,
    )

    const submitButton = screen.getByRole("button", { name: /share anonymously/i })
    expect(submitButton).toBeDisabled()

    const textarea = screen.getByPlaceholderText(/share your secret/i)
    fireEvent.change(textarea, { target: { value: "Short" } })
    expect(submitButton).toBeDisabled()

    fireEvent.change(textarea, { target: { value: "This is a longer secret that should enable the button" } })
    expect(submitButton).not.toBeDisabled()
  })

  test("submits the secret when button is clicked", async () => {
    render(
      <ChakraProvider>
        <SecretInput />
      </ChakraProvider>,
    )

    const textarea = screen.getByPlaceholderText(/share your secret/i)
    const submitButton = screen.getByRole("button", { name: /share anonymously/i })

    fireEvent.change(textarea, { target: { value: "This is a test secret that is long enough to submit" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(createSecret).toHaveBeenCalledWith(
        expect.objectContaining({
          content: "This is a test secret that is long enough to submit",
        }),
      )
    })
  })

  test("starts recording when mic button is clicked", () => {
    render(
      <ChakraProvider>
        <SecretInput />
      </ChakraProvider>,
    )

    const micButton = screen.getByRole("button", { name: /record your secret/i })
    fireEvent.click(micButton)

    expect(global.SpeechRecognition).toHaveBeenCalled()
    expect(mockSpeechRecognition.start).toHaveBeenCalled()
  })
})

