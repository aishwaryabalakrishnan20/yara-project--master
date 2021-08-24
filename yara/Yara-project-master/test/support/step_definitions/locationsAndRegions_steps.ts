/// <reference types="cypress" />
import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';



Given('visit app',()=>{
    cy.visit('/',{failOnStatusCode: false})
    cy.get('#email').type('kavitha.elumalai@yara.com');
        cy.get('#password').type('Kavitha@123');
        cy.get('#btn-login').click();
        cy.visit(Cypress.config().baseUrl + '/admin/countries')
        
     //cy.visit('/'+ 'admin/countries')
   // cy.url().should('admin/countries')
       // console.log('urlValue + /admin/countries')
})

   

And('clicked to button {string}', (button) => {
 
    cy.wait(8000)
    cy.get('[data-cy=menuItem_admin] > .sc-AxmLO').contains('Global settings').click()
   
})

// And('clicked {string}', button => {
//     cy.contains(button).click()
// })
// When('I clicked button {string} a modal appeared', button => {
//     cy.get('button').contains('Add Country').click()
// })
// // Then('revisit locations',()=>{
// //   // cy.visit('/')
// //   // cy.request('admin/countries')
// //   window.location.href="/admin/countries"
        
// // })
