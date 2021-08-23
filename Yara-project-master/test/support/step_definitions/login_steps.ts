/// <reference types="cypress" />
import { Given, And } from "cypress-cucumber-preprocessor/steps";
// Given(' Logged as user with role Global admin and role Global settings and PolarisMaintenance',()=>{
//     cy.wait(8000)
//     cy.visit('https://agrocore-admin-polaris.stage.emea.yaradigitallabs.io/')
// })
// And( 'clicked to button {string}',(button)=>{
//     cy.wait(8000)
//     cy.get('[data-cy=menuItem_admin] > .sc-AxmLO').contains('Global settings').click()
// })
// And ('clicked {string}',button=>{
//     cy.contains(button).click()
// })
Given('Logged as user with role Global admin and role Global settings and PolarisMaintenance', () => {
    cy.wait(5000);
    cy.visit('https://agrocore-admin-polaris.stage.emea.yaradigitallabs.io/')


})
And('clicked to button {string}', (button) => {
    //cy.button
    //cy.contains('button').click()
    cy.wait(8000)
    cy.get('[data-cy=menuItem_admin] > .sc-AxmLO').contains('Global settings').click()
    //cy.wait(8000)
    // cy.contains('button').click()
    //cy.get('button').should("include",'Global settings').click()
    // cy.get('button').invoke('text').then((text1)=>{
    //     expect(button).to.be.equal(text1)
    // })
    //cy.contains('Global settings').invoke('').click()
    //cy.click();
    //cy.contains('button').should("include",'Global settings').click()
})
And('clicked {string}', button => {
    cy.contains(button).click()
})