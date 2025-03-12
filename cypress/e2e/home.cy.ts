describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should display the header and secret input", () => {
    cy.contains("Share Your Darkest Secrets Anonymously").should("be.visible")
    cy.get('textarea[placeholder*="Share your secret"]').should("be.visible")
  })

  it("should enable submit button only when secret is long enough", () => {
    const textarea = cy.get('textarea[placeholder*="Share your secret"]')
    const submitButton = cy.contains("button", "Share Anonymously")

    // Button should be disabled initially
    submitButton.should("be.disabled")

    // Enter short text
    textarea.type("Too short")
    submitButton.should("be.disabled")

    // Enter longer text
    textarea.clear().type("This is a longer secret that should enable the submit button")
    submitButton.should("not.be.disabled")
  })

  it("should display secrets in tabs", () => {
    cy.contains("Most Recent").click()
    cy.get('[role="tabpanel"]').should("be.visible")

    cy.contains("Most Dark").click()
    cy.get('[role="tabpanel"]').should("be.visible")

    cy.contains("Trending").click()
    cy.get('[role="tabpanel"]').should("be.visible")
  })

  it("should show advertisement banners", () => {
    cy.contains("Advertisement").should("exist")
  })

  it("should allow liking a secret", () => {
    // Find the first secret card
    cy.get('[role="tabpanel"]:visible').within(() => {
      // Get the like count before clicking
      cy.get("button")
        .contains(/^\d+$/)
        .invoke("text")
        .then((initialCount) => {
          // Click the like button
          cy.get("button").contains(/^\d+$/).click()

          // Verify the count increased by 1
          cy.get("button")
            .contains(/^\d+$/)
            .should(($el) => {
              const newCount = Number.parseInt($el.text())
              const oldCount = Number.parseInt(initialCount)
              expect(newCount).to.equal(oldCount + 1)
            })
        })
    })
  })

  it("should allow commenting on a secret", () => {
    // Find the first secret card and open comments
    cy.get('[role="tabpanel"]:visible').within(() => {
      cy.contains("button", /^\d+$/).eq(1).click() // Comment button
    })

    // Add a comment
    cy.get('textarea[placeholder="Add a comment..."]').type("This is a test comment from Cypress")
    cy.contains("button", "Post").click()

    // Verify the comment was added
    cy.contains("This is a test comment from Cypress").should("be.visible")
  })
})

