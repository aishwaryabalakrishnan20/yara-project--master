// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('LoginToApplication',()=>{
    cy.visit('/');
    cy.get('head title').invoke('text').then((title)=>{
        if(title.includes("Sign in")){
            cy.get("#email", { timeout: 9000 }).clear().type('kavitha.elumalai@yara.com');
            cy.get("#password", { timeout: 9000 }).clear().type('Kavitha@123');
            cy.get("#btn-login").click();
           cy.xpath("//label[text()='Profile']",{timeout:9000}).should('be.visible');
           
        }
    })
})
Cypress.Commands.add('LogoutfromApplication',()=>{
    cy.visit('/');
    // cy.url().should('include', '/dashboard')
     cy.xpath('//label[text()="Profile"]').click()
     cy.xpath('//span[text()="Log out"]').click()
//    cy.get(':nth-child(2) > .sc-fzqNqU',{timeout:10000}).contains('Profile').click()
    // cy.get(":nth-child(2) > span").click()
    cy.get('#login-part').should('be.visible')
})




