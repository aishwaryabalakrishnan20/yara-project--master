
/// <reference types="cypress" />
import TestFilter from "../TestFilter";
import * as utilityHelper from "./helper"
import * as utilityclear from "../cleanAutomated"
import { Given, And, When, Then,Before,After } from "cypress-cucumber-preprocessor/steps";
// TestFilter(['smoke'], () => {
Before({tags:"@country"},()=>{
    cy.LoginToApplication().then(()=>{
    utilityclear.deleteCountry('sample')
    })
})
After({tags:'@country'},()=>{
    cy.LogoutfromApplication()
})




Given ('Logged as user with role Global admin and role Global settings and PolarisMaintenance',()=>
{
    cy.LoginToApplication()
    
   
})
And('I clicked button {string} and I clicked button {string}',(button1,button2)=>
{
    cy.contains(button1,{timeout:50000}).click()
    cy.contains(button2).click()
})
        // #Add a country
When ('I create new country with following details:',(datatable)=>
{
    cy.get('[data-cy="addCountryButton"]', { timeout: 30000 }).click() 
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
Then('in Country Table a row should be added for country "sample" with following data:',(datatable)=>
{
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','sample')
    //utilityHelper.SearchElement('Name',' trial ')
    utilityHelper.verifyTableData(datatable, 'countryTable')
})
// Scenario: Add a country and Edit country without saving changes and saving changes
Given ('I am in "Countries" page',()=>{
    cy.url().should('include', 'admin/countries')
})
// #Edit Country without saving the data
When ('I click three dots in the end of row or in column Actions for country "sample" present in column "Name" a context menu with options {string} and {string} shows',(button1,button2)=>{
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','sample')
    cy.get('[data-cy=countryTableEditMenu]').click()
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableDeleteButton"]').contains(button2).should('be.visible')
})
And('I choose {string} for country "sample" a modal appeared with following data:',(button)=>{
    cy.contains(button).click()
})
And ('I change data in all fields for country "sample" with following data:',(dataTable)=>
{ 

    dataTable.hashes().forEach((ele: any) => {

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
                    utilityHelper.setMultiDropdownValue('[data-cy="countryFormSelectApplicationTags"]',ele[propName],true)
                    break;

                default:
                    break;
            }
        }
    })
  
})
And ('I click button <X> in right up corner of modal "Edit Country"',()=>
{
    cy.get('[data-cy=countryEditFormButtonClose]').click()
})
Then('modal disappeared, should not change any data for country "sample":',()=>
{
    cy.get('tbody>tr').should('have.length',1)
})

// #Edit Country and save changes
When ('I search country "sample" present in column "Name" and choose {string}',(button1)=>
{
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','sample') 
    //utilityHelper.SearchElement('Name', ' trial ')
    cy.get('[data-cy=countryTableEditMenu]').click()
    //cy.get('sc-fzoXWK hnKkAN').contains(button1,button2)
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableEditButton"]').click()
    
})
And ('I change data in all fields for country "Test" with following data:',(datatable)=>{
    
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
                    utilityHelper.setMultiDropdownValue('[data-cy="countryFormSelectApplicationTags"]',ele[propName],true)
                    break;

                default:
                    break;
            }
        }
    })
  
})
And ('I click {string} and I should see tooltip text {string} and {string}',(button,headerMsg,bodyMsg)=>
{
    cy.contains(button).click();
    utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})
Then ('data for country "sample 1" should be updated in row',(dataTable)=>
{
    utilityHelper.verifyTableData(dataTable, 'countryTable')
})

//SCENARIO-4  Denied deleting of country without regions
// Scenario: Add a country and Edit country without saving changes and saving changes
Given ('I am in "Countries" page',()=>{
    cy.url().should('include', 'admin/countries')
})
When ('I clicked three dots in the end of row in column Action for country Test a context menu with options {string} and {string} shows',(button1,button2)=>
{
   
    utilityHelper.searchTableBasedOnColumn('countryTable','Name', 'sample')
    cy.get('[data-cy=countryTableEditMenu]').click()
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableDeleteButton"]').contains(button2).should('be.visible')
})
And('I choose "Delete" a content appeared {string}and{string}',(button1,button2)=>
{
    cy.get('[data-cy="countryTableDeleteButton"]').click()
    cy.get('.cizzDZ').contains(button1).should('be.visible')
    cy.get('.hSeVfH',{timeout:7000}).contains(button2).should('be.visible')
    

})
And("clicked button {string}",(button)=>
{
    cy.get('[data-cy="countryDeleteDialogCancelButton"]').contains(button).click()

})
Then('modal disappeared, should not changes anything in data or row for country  trial 1',()=>
{
    cy.get('tbody > .sc-fzoWqW > :nth-child(1)').should('be.visible')
 
})

//SCENARIO-5 Delete country without regions

When('I clicked three dots in the end of row in column Action for country Test a context menu with options {string} and {string} shows',(button1,button2)=>
{
   
    utilityHelper.searchTableBasedOnColumn('countryTable','Name', ' sample ')
    cy.get('[data-cy=countryTableEditMenu]').click()
    
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableDeleteButton"]').contains(button2).should('be.visible')
})

And(' ',(button1,button2)=>
{
    cy.get('[data-cy="countryTableDeleteButton"]').click()
    cy.get('.cizzDZ').contains(button1).should('be.visible')
    cy.get('.hSeVfH').contains(button2).should('be.visible')
   
})
And('clicked button Delete',()=>
{
    cy.get('[data-cy=countryDeleteDialogConfirmButton]').click()
    

})
Then('I see tooltip {string}and{string}',(headerMsg,bodyMsg)=>
{
utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})

// after(()=>{
//     cy.LogoutfromApplication()
//  });
// })

