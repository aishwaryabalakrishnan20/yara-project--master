/// <reference types="cypress" />

declare namespace Cypress{
   
        interface Chainable {
          /**
           * Custom command for login application
           * @example cy.LoginToApplication 
           */
         // dataCy(value: string): Chainable<Element>
         LoginToApplication():Chainable<Element>,
         LogoutfromApplication():Chainable<Element>
        }
      }
    