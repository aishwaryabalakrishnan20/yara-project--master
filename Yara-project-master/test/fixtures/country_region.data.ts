export const Add_EditCountryModal_cy = {    
    btnAddCountry              :'addCountryButton',
    txtCountryName             :'countryFormInputName',
    txtCountryCode             :'countryFormInputCountryCode',
    drpDwnCurrency             :'countryFormSelectCurrency',
    drpDwnUnitSystem           :'countryFormSelectIsDefaultMetric',
    drpDwnWindSpeed            :'countryFormSelectWindSpeedUnit',
    drpDwnPrecipitationAmount  :'countryFormSelectPrecipitationAmountUnit',
    drpDwnEvapotranspiration   :'countryFormSelectEvapotranspirationRefUnit',
    drpDwnQpfSnowAmt           :'countryFormSelectQpfSnowAmountUnit',
    drpDwnTemperature          :'countryFormSelectTemperatureUnit',
    drpDwnDewPoint             :'countryFormSelectDewPointUnit',
    txtProductSetCode          :'countryFormInputProductSetCode',
    drpDwnSolutions            :'countryFormSelectApplicationTags',
    frmAddEditCountry          :'locationCountryForm',
    frmAddCountryClose         :'countryAddFormButtonClose',
    frmEditCountryClose        :'countryEditFormButtonClose'
}

/**
 * ID locators for components present in 'Add region'/'Edit Region' modal.
 */
export const Add_EditRegionModal_cy ={
    btnAddRegion         : "addRegionButton",    
    txtregionName        : "regionFormInputName",
    frmAddEditRegion     : "regionForm",
    frmAddRegionClose    :'regionAddFormButtonClose',
    frmEditRegionClose   :'regionEditFormButtonClose'
}

/**
 * data-cy locators for components present in 'Country' table and its Actions ellipse and 'Region' table and its Actions ellipse
 */
export const CountryRegionTable_Actions_cy = {
    countryTable            : "countryTable",
    regionTable             : "regionTable",
    countryEditAction       : "countryTableEditButton",
    countryDeleteAction     : "countryTableDeleteButton",
    regionEditAction        : "regionTableEditButton",
    regionDeleteAction      : "regionTableDeleteButton",
}

export const CountryTableColumnNames ={
    colName         :"Name",
    countryCode     :"Country Code",
    currencyCode    :"Currency Code",
    productSetCode  :"Product Set Code",
    solutions       :"Solutions",
    transKey        :"Translation key",
    lastMod         :"Last mod.",
    actions         :"Actions"
}

export const RegionTableColumnNames ={
    colName         :"Name",    
    transKey        :"Translation key",
    lastMod         :"Last mod.",
    actions         :"Actions"
}

export const countriesData ={
    countryName           :"Test",    
    updatedCountryName    :"Test 1"    
}

export const regionsData ={
    regionName           :"All",  
    updatedRegionName    :"All Test"
}