export function getCurrentDateTime():string{
    var date=new Date();
    var currentDateTime=date.getDate()+"_"+date.getMonth()+"_"+date.getFullYear()+"_"+date.getHours()+"_"+date.getMinutes();
    return currentDateTime;
};

/**
 * Verifies the header and body texts of the tooltips.
 * @param headerMsg Header message to be verified.
 * @param bodyMsg Text of the body message to be verified.
 */
export function verifyAlertToolTips(headerMsg:string, bodyMsg:string):void{    
    cy.get('div[role="alert"]',{timeout:7000}).within(($alert)=>{
        cy.get('label').eq(0).should('have.text',headerMsg);
        cy.get('label').eq(1).should('have.text',bodyMsg);
    })
    cy.wait(5000);
};

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
 * Clicks the given menu based on its text.
 * @param menuCyLoc -data-cy locator of the Main menu to be clicked.
 * @param subMenuCyLoc -data-cy locator of the Sub-menu to be clicked.
 * @param expandedMenuCyLoc -data-cy locator of the expanded menu to be clicked.
 */
export function clickMenu(menuCyLoc:string,subMenuCyLoc:string,expandedMenuCyLoc:string):void{
    let expandedElement:number =0;
    cy.get('[data-cy="'+ menuCyLoc +'"]',{timeout:10000}).as('Mainmenu');

    if(expandedMenuCyLoc != ""){
        if( subMenuCyLoc == "" || menuCyLoc == ""){
            throw new Error("Please Select Sub-menu/Menu properly!...");
        }
        
        cy.get('@Mainmenu').click();

        cy.get('[data-cy="'+ subMenuCyLoc +'"]',{timeout:1000}).as('Submenu').then($submenu=>{  

            cy.get('[data-cy="'+ expandedMenuCyLoc +'"]').as('Expandedmenu'); 

            //Directly clicking expanded menu if Submenu is already expanded.
            expandedElement = $submenu.find('div[class*="MuiCollapse-entered"]').length;
            if( expandedElement > 0){
                cy.get('@Expandedmenu').find('a').click();
            }
            //Click Submenu first then expanded menu.
            else{  
                cy.wrap($submenu).not('div[class*="MuiCollapse-entered"]').find('label').click().within(()=>{
                    cy.get('@Expandedmenu').find('a').click();
                })
            }
        });
    }
    else if(subMenuCyLoc != ""){
        if( menuCyLoc == ""){
            throw new Error("Please Select Menu properly!...") ;
        }
        cy.get('@Mainmenu').click();
        cy.get('[data-cy="'+ subMenuCyLoc +'"]',{timeout:1000}).as('Submenu');
        cy.get('@Submenu').not('div[class*="MuiCollapse-entered"]').find('label').click();
        
        // getMenuTag('@Submenu')
        //     .then((resSubMnu)=>{
        //         cy.get('@Submenu').find(resSubMnu).click();
        //     });           
    }
    else{
        cy.get('@Mainmenu').should('exist');
        cy.get('@Mainmenu').click();
    }
};

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

/**
 * Clicks on the Action ellipse of a particular row and Choose given input action like Edit/Delete.
 * @param tableLocatorCy - Table data-cy locator.
 * @param cellValue -Input any Cellvalue in the table based on which row is selected and Actions ellipse is clicked.
 * @param action -Actions like Edit/Delete 's data-cy.
 */
 export function clickTableActionBasedOnCellValue(tableLocatorCy:string,cellValue:string,actionCy:string){    
    cy.get('[data-cy="'+ tableLocatorCy +'"] tbody td').contains(cellValue).parents('tr[role="row"]').find('td').last().click();
    cy.get('[data-cy="'+ actionCy +'"]').click();
}

/**
 * Checks submenus like Edit/Delete visible under Actions ellipse.
 * @param tableLocatorCy - Table data-cy locator.
 * @param cellValue - Input cell value based on which row is identified and Actions ellipse is clicked.
 * @param action - Actions like Edit/Delete 's data-cy to assert its visibility status.
 */
export function isActionSubmenuVisibleBasedOnCellValue(tableLocatorCy:string,cellValue:string,actionCy:string):void {
    cy.get('[data-cy="'+ tableLocatorCy +'"] tbody td').contains(cellValue).parents('tr[role="row"]').find('td').last().click();
    cy.get('[data-cy="'+ actionCy +'"]').should('be.visible');
    cy.get('[data-cy="'+ tableLocatorCy +'"] tbody td').contains(cellValue).parents('tr[role="row"]').find('td').last().click();
};

/**
 * Sets value to the input element.
 * @param inputElementCy -data-cy locator of the Input element.
 * @param valueToSet -Value to be set in the input element.
 */
export function setInputValue(inputElementCy:string, valueToSet:string):void{
    cy.get('input[data-cy="'+ inputElementCy +'"]').clear().type(valueToSet);        
};

/**
 * Sets the value to the dropdown element which can have only single value.
 * @param dropdownCy data-cy locator of the dropdown element.
 * @param valueToSet Value to be set in the dropdown element.
 */
export function setSingleDropdownValue(dropdownCy:string, valueToSet:string):void{
    cy.get('[data-cy="'+ dropdownCy +'"]').within((drpDownObj)=>{
        cy.get('div[class*="dropdown-indicator"]').click();
        cy.contains('div',valueToSet).should('exist');
        cy.contains('div',valueToSet).click();
    })
};

/**
 * Sets the value to the dropdown element which can have multiple values.
 * @param dropdownCy -data-cy locator of the dropdown element.
 * @param valueToSet -Value to be set in the dropdown element.
 * @param isClearExistingVal - Set true to clear the existing values and add new values else set false.
 */
export function setMultiDropdownValue(dropdownCy:string, valueToSet:string, isClearExistingVal:boolean):void{
    let values:string[];
    let multiValues:number;

    cy.get('[data-cy="'+ dropdownCy +'"]').within(()=>{
        if(isClearExistingVal) {
            cy.get('div[class*="multi-value__label"]').then($MultiDrpDownObj=>{
                multiValues = $MultiDrpDownObj.length;
                while(multiValues != 0){
                    cy.wrap($MultiDrpDownObj).closest('div').type('{backspace}');
                    multiValues--;
                }                        
            })
            cy.get('div[class*="placeholder"]').click();
        }           
        
        cy.get('div[class*="dropdown-indicator"]').click();
        if(valueToSet.includes(',')){
            values = valueToSet.split(',');                
            values.forEach((eachValue)=>{
                cy.contains('label',eachValue).prev().find('input').not('[checked]').click();
            })
        }else{
            cy.contains('label',valueToSet).click();
        } 
        cy.get('div[class*="dropdown-indicator"]').click();         
    })
};

/**
 * Verify the values present in the Input element
 * @param inputElementCy -data-cy locator of the Input element.
 * @param expectedValue -to be present in the Input element.
 */
 export function verifyInputValue(inputElementCy:string, expectedValue:string):void{
    cy.get('input[data-cy="'+ inputElementCy +'"]').should('have.attr','value',expectedValue);    
};

/**
 * Verifies the value present in the dropdown element which can have only single value.
 * @param dropdownCy -data-cy locator of the dropdown element.
 * @param expectedValue -to be present in the dropdown element.
 */
 export function verifySingleDropdownValue(dropdownCy:string, expectedValue:string):void{
    cy.get('[data-cy="'+ dropdownCy +'"]').within((dropdownObj)=>{
        cy.get('div[class*="singleValue"]').invoke('text').should('equal',expectedValue);
    })
};

/**
 * Verify the values present in the dropdown element which can have multiple values.
 * @param dropdownCy -data-cy locator of the dropdown element.
 * @param expectedValues  -to be present in the dropdown element.
 */
 export function verifyMultiDropdownValue(dropdownCy:string, expectedValues:string):void{
    let expValue:string[];
    let expValueIncrement:number =0;

    cy.get('[data-cy="'+ dropdownCy +'"]').within((dropdownObj)=>{
        cy.get('div[class*="multi-value__label"]').as('MultiDrpDownObj');
        
        if(expectedValues.includes(',')){
            expValue = expectedValues.split(',');

            //Assert expected array of string is equal to the array of values present in UI.
            cy.get('@MultiDrpDownObj').should('have.length',expValue.length);

            cy.get('@MultiDrpDownObj').each(($drpDownVal)=>{
                let actualVal = $drpDownVal.text();
                expect(expValue[expValueIncrement]).to.be.equal(actualVal);
                expValueIncrement++;
            })
        }else{
            cy.get('@MultiDrpDownObj').invoke('text').should('equal',expectedValues);
        }            
    })
};

/**
 * Asserts whether a row is deleted or not.
 * @param tableLocatorCy data-cy locator of the table.
 * @param cellValue Input cell value in a row based on which assertion would happen.
 * @param isDeleted Set true to check a row is deleted else set false to check otherwise.
 */
export function verifyRowIsDeleted(tableLocatorCy:string, cellValue:string, isDeleted:boolean){
    if(isDeleted){
        cy.xpath('//table[@data-cy="' + tableLocatorCy +'"]/tbody//*[contains(text(),"'+ cellValue +'")]/ancestor::tr[@role="row"]').should('not.exist');
    }else{
        cy.xpath('//table[@data-cy="' + tableLocatorCy +'"]/tbody//*[contains(text(),"'+ cellValue +'")]/ancestor::tr[@role="row"]').should('exist');
    }    
}
