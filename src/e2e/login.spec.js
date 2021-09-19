describe("Login User", () => {
    it("Successful login ", () => {
        cy.visit("http://localhost:3000/login")

        cy.get(':nth-child(1) > .form-control')
        .type('pmangla@adobe.com')

        cy.get(':nth-child(2) > .form-control')
        .type('@Pmangla1')

        cy.get('.btn')
        .click()

        cy.url()
        .should('contain', 'http://localhost:3000/home')
    })

    it("Unsuccessful login ", () => {
        cy.visit("http://localhost:3000/login")

        cy.get(':nth-child(1) > .form-control')
        .type('pmangla@adobe.com')

        cy.get(':nth-child(2) > .form-control')
        .type('abcd')

        cy.get('.btn')
        .click()

        cy.url()
        .should('contain', 'http://localhost:3000/login')
    })
})