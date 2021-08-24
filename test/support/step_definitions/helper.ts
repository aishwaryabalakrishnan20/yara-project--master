//  import * as mutations from '.../support/mutations';


/**
 * Verifies two tables, datatable from feature file and webtable from application, are equal.
 * @param datatable - From feature file.
 * @param tableObjLocator - data-cy Selector of the webtable to be verified.
 */
 export function verifyTableData(datatable:any,tableObjLocator:any):void {
    let expectedTable = new Map<any, any>();
    let expectedText: string;
    
    //Retrieve expected table from datatable param
    datatable.hashes().forEach((elem: any) => {
        for (let propName in elem) {
            let propValue = elem[propName];
            expectedTable.set(propName.toLowerCase(),propValue);
        }
    });
    
    //Retrieve actual table from application and Verify the expected table
    cy.get('[data-cy="'+ tableObjLocator +'"]', { timeout: 15000 }).within(($table) => {
 
        //Assertion - expected and actual table size
        cy.get('thead th').should('have.length',expectedTable.size);
 
        cy.get('thead th').each(($header, index, $headers) => {
           cy.get('tbody tr td:nth-child(' + (index + 1) + ')').invoke('text').then((text) => {
                let key_header=$header.text().toLowerCase().replace(/ /gi,"");
                if(key_header=="lastmod."){
                    cy.get('tbody tr td:nth-child(' + (index + 1) + ') svg').should('be.visible');
                }
                else if(expectedTable.has(key_header)){
                    if(expectedTable.get(key_header).includes(','))
                    {
                        expectedText = (expectedTable.get(key_header)).replace(',','');
                        expect(expectedText).to.be.equal(text);
                    }
                    else{
                        expect(expectedTable.get(key_header)).to.be.equal(text);
                    }                    
                }
            })
        })
    })
};

/**
 * Verifies the header and body texts of the tooltips.
 * @param headerMsg Header message to be verified.
 * @param bodyMsg Text of the body message to be verified.
 */
export function verifyAlertToolTips(headerMsg: string, bodyMsg: string): void {
    cy.get('div[role="alert"]', { timeout: 7000 }).within(($alert) => {
        cy.get('label').eq(0).should('have.text', headerMsg);
        cy.get('label').eq(1).should('have.text', bodyMsg);
    })
    cy.wait(5000);
};
/**
 * Sets the value to the dropdown element which can have only single value.
 * @param inputdatacyvalue data-cy value 
 * @param valueToSet Value to be set in the textbox
 */

export function setInputValue(inputdatacyvalue: string, valueToSet: string): void {
    cy.get(inputdatacyvalue).parent().within(()=>{
   // cy.contains('input', inputdatacyvalue).parent().within(() => {
        cy.get('input').clear().type(valueToSet)
    })
}
/**
 * Sets the value to the dropdown element which can have only single value.
 * @param dropdowndatacy data-cy locator of the dropdown element.
 * @param valueToSet Value to be set in the dropdown element.
 */
export function setSingleDropdownValue(dropdowndatacy: string, valueToSet: string): void 
{ 
    cy.get(dropdowndatacy).parent().within(()=>
    {                                                                           
        cy.get('div[class*="dropdown-indicator"]',{timeout:10000}).click() 
        cy.contains('div', valueToSet).click()
    })
}
/**
 * Sets the value to the dropdown element which can have multiple values.
 * @param dropdowndatacy -data-cy of the dropdown element.
 * @param valueToSet -Value to be set in the dropdown element.
 * @param isClearExistingVal - Set true to clear the existing values and add new values else set false.
 */
export function setMultiDropdownValue(dropdowndatacy: string, valueToSet: string, isClearExistingVal: boolean): void {
    let values: string[];
    let multiValues: number;
     cy.get(dropdowndatacy).within(()=>{
    //cy.get('[id="' + dropdownID + '"]').within(() => {
        if (isClearExistingVal) {
            cy.get('div[class*="multi-value__label"]').then($MultiDrpDownObj => {
                multiValues = $MultiDrpDownObj.length;
                while (multiValues != 0) {
                    cy.wrap($MultiDrpDownObj).closest('div').type('{backspace}');
                    multiValues--;
                }
            })
            cy.get('div[class*="placeholder"]').click();
        }

        cy.get('div[class*="dropdown-indicator"]').click();
        if (valueToSet.includes(',')) {
            values = valueToSet.split(',');
            values.forEach((eachValue) => {
                cy.contains('label', eachValue).prev().find('input').not('[checked]').click();
            })
        } else {
            cy.contains('label', valueToSet).click();
        }
        cy.get('div[class*="dropdown-indicator"]').click();
    })
};


/**
* Search particular element from the webtable according to col value .
* @param valueToSearch   - value which you want to search from the  header of the webtable.
*@param ValueToSet       - value which you wanna filter from the webtable.
*/

 export function SearchElement(valueToSearch:string,valueToSet:any):void
 {
        cy.get('thead>tr>th',{timeout:10000}).each(async($header,index,$headers)=>
    {
         const text=$header.text()
         if(text==valueToSearch)
        {
             cy.get('thead>tr>td').eq(index).contains('Search').click()
             cy.get('#search-tool').type(valueToSet).type('{enter}')
        }
    })
 }
 /**
 * Clicks on the search option on the given column and types the search string.
 * @param tableLocator -Locator of the table.
 * @param columnName -Name of the column on which search needs to be applied.
 * @param searchValue -Search string.
 */
 export function searchTableBasedOnColumn(tableLocator:string,columnName:string,searchValue:string):void{
    
    cy.get('[data-cy="'+ tableLocator +'"]', { timeout: 20000 }).within(($table)=>{
        cy.get('thead th').each(($header, headerIndex) => {
            if($header.text() == columnName){
                cy.get('thead td').eq(headerIndex).siblings().last().then(($actionsHdr)=>{
                    if($actionsHdr.text().toLowerCase().includes('clear')){
                        cy.wrap($actionsHdr).contains('Clear').click();
                    }
                });
                cy.get('thead td').eq(headerIndex).contains('Search').click();
            }
        })
    })
    cy.get('#search-tool').type(searchValue).type('{enter}');
};

export function getQueryresponse(TEST_QUERY_GET_COUNTRY: string, arg1: string) {
    throw new Error("Function not implemented.");
}

export function DeleteAutomation(TEST_MUTATION_DELETE_COUNTRY: string, arg1: string) {
    throw new Error("Function not implemented.");
}

export function deleteCountry(arg0: string) {
    throw new Error("Function not implemented.");
}
// const localStoragePrefix = `CognitoIdentityServiceProvider.${Cypress.env(
//     'COGNITO_CLIENT_ID',


//   )}.`;
//   export function getToken(): string | null {
//     const userId = localStorage.getItem(`${localStoragePrefix}LastAuthUser`);
//     const token = localStorage.getItem(`${localStoragePrefix}${userId}.idToken`);
//     return token;
//   }

 


