/// <reference types="cypress" />
import * as utilityclear from "../cleanAutomated"
import * as utilityHelper from "./helper"
import { Given, And, When, Then,Before,After} from "cypress-cucumber-preprocessor/steps";
import { regionsData } from "../../fixtures/country_region.data";

Before({tags:'@smokeTest'}, function() {
    cy.LoginToApplication().then(()=>{
     utilityclear.deleteCountry('demotest')
    })
 })
     
    After({tags:'@region'},()=>{
      cy.LogoutfromApplication()
    })

Given ('Logged as user with role Global admin and role Global settings and PolarisMaintenance',()=>
{
   cy.LoginToApplication()
})
And('I clicked button {string} and I clicked button {string}',(button1,button2)=>
{
   cy.contains(button1,{timeout:10000}).click()
   cy.contains(button2).click()
})
// #Add a country
When ('I create new country with following details:',(datatable)=>
{
    cy.get('[data-cy="addCountryButton"]', { timeout: 60000 }).click() 
    datatable.hashes().forEach((ele: any) => {

        for (let propName in ele) {
            switch (propName) {
                case 'Country Name':
                    utilityHelper.setInputValue('[data-cy="countryFormInputName"]',ele[propName])
                    break;

                case 'Country Code':
                    utilityHelper.setInputValue('[data-cy="countryFormInputCountryCode"]',ele[propName])
                    break;

                case 'Currency':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectCurrency"]', ele[propName])
                   
                    break;

                case 'Which Unit System Is Using':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectIsDefaultMetric"]',ele[propName])
                    break;

                case 'Wind Speed Unit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectWindSpeedUnit"] ',ele[propName])
                    break;

                case 'Precipitation Amount Unit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectPrecipitationAmountUnit"] ',ele[propName])
                    break;

                case 'Evapotranspiration Unit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectEvapotranspirationRefUnit"] ',ele[propName])
                    break;

                case 'Qpf Snow Amount Unit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectQpfSnowAmountUnit"] ',ele[propName])
                    break;

                case 'Temperature Unit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectTemperatureUnit"] ',ele[propName])
                    break;

                case 'Dew Point Unit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectDewPointUnit"]',ele[propName])
                    break;

                case 'ProductSetCode (Optional)':
                    utilityHelper.setInputValue('[data-cy="countryFormInputProductSetCode"]',ele[propName])
                    break;

                case 'Solutions (Optional)':
                    utilityHelper.setMultiDropdownValue('[data-cy="countryFormSelectApplicationTags"]',ele[propName],false)
                    break;

                default:
                    break;
            }
        }
    })
  
})
        
And('I click {string} and I should see tooltip text {string} and {string}',(button,headerMsg,bodyMsg)=>
{
    cy.contains(button).click();
    utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})
Then('in Country Table a row should be added for country "demotest" with following data:',(datatable)=>
{
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','demotest')
    //utilityHelper.SearchElement('Name',' trial ')
    utilityHelper.verifyTableData(datatable, 'countryTable')
})
//scenario - add region
And ('I move back to "Countries" page',()=>{
    cy.url().should('include', 'admin/countries')
})
When('I add region "All Automation" for country "demotest" present in column "Name"',()=>{
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','demotest')
    cy.get('[data-cy="countryTableLinkButton"]').click()
    cy.get('[data-cy="addRegionButton"]').contains('Add region').click()
    cy.get('[data-cy="regionFormInputName"]').type("All Automation")

})
And ('I click {string} and I should see tooltip text {string} and {string} for region',(button,headerMsg,bodyMsg)=>{
     cy.contains(button).click()
     utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})
Then('in Region Table a row should be added for region "All Automation" with following data:',(datatable)=>{
    utilityHelper.verifyTableData(datatable,'regionTable')
})
   
And ('I move back to "Countries" page',()=>{
    cy.url().should('include', 'admin/countries')
})
// Scenario:  Adding duplicated region

Given ('I am in "Countries" page',()=>{
cy.url().should('include', 'admin/countries')
})
When ('I click on "demotest" ,name of the country present in column "Name" in countries list, a list with regions are loaded',()=>
{
        cy.get('[id="3"]').click()
        utilityHelper.searchTableBasedOnColumn('countryTable','Name','demotest')
        cy.get('[data-cy="countryTableLinkButton"]').click()
})
And('I add region "All Automation" for country "demotest"',()=>
{
    cy.get('[data-cy="addRegionButton"]').contains('Add region').click()
    cy.get('[data-cy="regionFormInputName"]').type("All Automation")
})
And ('I click {string} and an error message {string} displays under field "Region Name"',(button,msg)=>
{
    cy.contains(button).click()
    cy.contains(msg).should('be.visible')
})
And ('a modal is open, should not save the region with name "All Automation"',()=>{
    cy.get('[data-cy=regionAddFormButtonClose]').click()
    //cy.get('[data-cy=regionFormInputName]').contains('All')
 //cy.get('.eKWJxm').contains('All')
})
// Scenario: Edit region without saving data and saving data
Given( 'I am in "Countries" page',()=>{
 cy.url().should('include', 'admin/countries')
})
When ('I click on "demotest" ,name of the country present in column "Name" in countries list, a list with regions are loaded',()=>{
    cy.get('[id="3"]').click()
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','demotest')
    cy.get('[data-cy="countryTableLinkButton"] ').click()
})
And ('I click three dots in the end of row or in column Action for region "All Automation" present in column "Name" a context menu with options {string} and {string} shows',(button1,button2)=>{
  cy.get('[data-cy="regionTableEditMenu"]').click()
  cy.get('[data-cy="regionTableEditButton"]').contains(button1)
  cy.get('[data-cy="regionTableDeleteButton"]').contains(button2)
})
And ('I choose {string} a modal appeared with following data for region "All Automation":',(button)=>{
    cy.get('[data-cy="regionTableEditButton"]').contains(button).click()
})
And ('I typed {string} in field "Region Name"',(button)=>{
    //cy.get('label').contains(button)
    cy.get('[data-cy="regionFormInputName"]').clear().type(button)
})
And ('I clicked button "X" in right up corner of modal "Edit Region"',()=>{
//   cy.get('.bTIjTR').click()
        cy.get('[data-cy=regionEditFormButtonClose]').click()
})
Then ('modal disappeared, should not change any data for region "All Automation":',()=>{
    cy.get('tbody>tr').should('have.length',1)
})
// #Edit region in country Test and saving data
And ('I move back to "Countries" page',()=>{
    cy.url().should('include', 'admin/countries')
})
When ('I edit region "All Automation" as {string} in "demotest" name of the country present in column "Name"',(button)=>{
    cy.get('[id="3"]').click()
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','demotest')
    cy.get('[data-cy="countryTableLinkButton"]').click()
    cy.get('[data-cy="regionTableEditMenu"]').click()
    cy.get('[data-cy="regionTableEditButton"]').click()
    // cy.get('[data-cy="addRegionButton"]').click()
    cy.get('[data-cy="regionFormInputName"]').clear().type(button)
})
And('I click {string} and I should see tooltip text {string} and {string} for region',(button,headerMsg,bodyMsg)=>{
    cy.contains(button).click()
    utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})
Then('in Region Table a row should be added with following data:',(datatable)=>{
    utilityHelper.verifyTableData(datatable,'regionTable')
})
//   Scenario: Delete country with added regions
Given ('I am in "Countries" page',()=>{
    cy.url().should('include', 'admin/countries')
})

When ('I click three dots in the end of row or in column Action for country "demotest" present in column "Name" a context menu with options {string} and {string} shows',(button1,button2)=>
{
    cy.get('[id="3"]').click()
    utilityHelper.searchTableBasedOnColumn('countryTable','Name', 'demotest')
    cy.get('[data-cy=countryTableEditMenu]').click()
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableDeleteButton"]').contains(button2).should('be.visible')
})
And('I choose "Delete" for country "demotest" a content appeared {string} and {string}',(headerMsg,bodyMsg)=>{
    cy.get('[data-cy="countryTableDeleteButton"]').click()
    cy.get('.cizzDZ').contains(headerMsg).should('be.visible')
    cy.get('.hSeVfH').contains(bodyMsg).should('be.visible')
    // utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})
And('I clicked button {string}',(button)=>{
  cy.get('[data-cy="countryDeleteDialogCancelButton"]').contains(button).click()
})

Then('content disappeared, should not delete country "demotest" or change any data for row in table:',()=>
{
    cy.get('tbody > .sc-fzoWqW > :nth-child(1)').should('be.visible')
})

// Scenario: Delete region without saving the data and saving the data
Given ('I am in "Countries" page',()=>{
    cy.url().should('include', 'admin/countries')
})
When ('I click on "demotest" ,name of the country present in column "Name" in countries list, a list with regions are loaded',()=>{
    cy.get('[id="3"]').click()
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','demotest')
    cy.get('[data-cy="countryTableLinkButton"] ').click()
})
And ('I click three dots in the end of row or in column Action for region "All Automation" present in column "Name" a context menu with options {string} and {string} shows ',(button1,button2)=>{
  cy.get('[data-cy="regionTableEditMenu"]').click()
  cy.get('[data-cy="regionTableEditButton"]').contains(button1)
  cy.get('[data-cy="regionTableDeleteButton"]').contains(button2)
})
And ('I choose "Delete" for region "All Automation" a content appeared {string} and {string}',(headerMsg,bodyMsg)=>{
    cy.get('[data-cy="regionTableDeleteButton"]').click()
    cy.get('.cizzDZ').contains(headerMsg).should('be.visible')
    cy.get('.hSeVfH').contains(bodyMsg).should('be.visible')
   
})
And ('I clicked button "Do not delete" in region',()=>{
    
    cy.get('[data-cy=regionDeleteDialogCancelButton]').click()
})

Then ('content disappeared, should not delete region "All Automation" or change any data for row in table:',()=>{
    cy.get('tbody>tr').should('have.length',1)
})

And ('I move back to "Countries" page',()=>{
    cy.get('[id="3"]').click()

})
When('I delete region "All Automation" in "demotest" name of the country present in column "Name"',()=>{
    cy.get('[data-cy="regionTableEditMenu"]').click()
    cy.get('[data-cy="regionTableDeleteButton"]').click()

    cy.get('[data-cy=regionDeleteDialogConfirmButton]').click()

})
// # Then I see tooltip text "Region deleted" and "The region has been removed. The region can anyway be added again."
Then ('the row is removed from regions table for region "All Automation" present in column "Name"',()=>{
    cy.get('[id="3"]').click()
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','demotest')
    cy.get('[data-cy="countryTableEditMenu"]').click()
    cy.get('[data-cy="countryTableDeleteButton"]').click()
    cy.get('[data-cy=countryDeleteDialogConfirmButton]').click()
    
})
