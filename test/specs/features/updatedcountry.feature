Feature: Countries
    Add, edit and delete country

    Background: I am in countries page and adding a country
        Given Logged as user with role Global admin and role Global settings and PolarisMaintenance
        And I clicked button "Global settings" and I clicked button "Locations"
        #Add a country
        When I create new country with following details:
            | Country Name | Country Code | Currency | Which Unit System Is Using | Wind Speed Unit | Precipitation Amount Unit | Evapotranspiration Unit | Qpf Snow Amount Unit | Temperature Unit | Dew Point Unit | ProductSetCode (Optional) | Solutions (Optional) |
            | sample       | TS           | AFN      | Metric                     | km/h            | mm                        | mm                      | cm                   | °C               | °C             | 33                        | CNP                  |
        And I click "Save" and I should see tooltip text "Country added!" and "The new country has been successfully added to the global list."
        Then in Country Table a row should be added for country "sample" with following data:
            | Name   | Country Code | Currency Code | Product Set Code | Solutions | Translation Key | Last Mod. | Actions |
            | sample | TS           | AFN           | 33               | CNP       | country.test    | ?         | ···     |
    @country
    Scenario: Add a country and Edit country without saving changes and saving changes
        Given  I am in "Countries" page
        #Edit Country without saving the data
        When I click three dots in the end of row or in column Actions for country "sample" present in column "Name" a context menu with options "Edit" and "Delete" shows
        And I choose "Edit" for country "sample" a modal appeared with following data:
            | Country Name | Country Code | Currency      | Which Unit System Is Using | Wind Speed Unit | Precipitation Amount Unit | Evapotranspiration Unit | Qpf Snow Amount Unit | Temperature Unit | Dew Point Unit | ProductSetCode (Optional) | Solutions (Optional) |
            | sample       | TS           | AFN - Afghani | Metric                     | km/h            | mm                        | mm                      | cm                   | °C               | °C             | 33                        | CNP                  |
        And I change data in all fields for country "Test" with following data:
            | Country Name | Country Code | Currency | Which Unit System Is Using | Wind Speed Unit | Precipitation Amount Unit | Evapotranspiration Unit | Qpf Snow Amount Unit | Temperature Unit | Dew Point Unit | ProductSetCode (Optional) | Solutions (Optional) |
            | sample 1     | TP           | EUR      | Imperial                   | mph             | inch                      | inch                    | inch                 | °F               | °F             | 34                        | Ayra,CNP             |
        And I click button <X> in right up corner of modal "Edit Country"
        Then modal disappeared, should not change any data for country "sample":
            | Name   | CountryCode | CurrencyCode | ProductSetCode | Solutions | Translationkey | LastMod. | Actions |
            | sample | TS          | AFN          | 33             | CNP       | country.test   | ?        | ···     |
        #Edit Country and save changes
        When I search country "sample" present in column "Name" and choose "Edit"
        And I change data in all fields for country "sample" with following data:
            | Country Name | Country Code | Currency | Which Unit System Is Using | Wind Speed Unit | Precipitation Amount Unit | Evapotranspiration Unit | Qpf Snow Amount Unit | Temperature Unit | Dew Point Unit | ProductSetCode (Optional) | Solutions (Optional) |
            | sample 1     | TP           | BGN      | Imperial                   | mph             | inch                      | inch                    | inch                 | °F               | °F             | 34                        | Ayra,CNP             |
        And I click "Save" and I should see tooltip text "Changes saved" and "The changes done to the table row have been successfully saved."
        Then data for country "sample 1" should be updated in row
            | Name     | CountryCode | CurrencyCode | ProductSetCode | Solutions | Translationkey   | Lastmod. | Actions |
            | sample 1 | TP          | BGN          | 34             | Ayra,CNP  | country.sample_1 | ?        | ···     |

     @country
    Scenario: Add a country and Delete country without saving changes and saving changes

        Given  I am in "Countries" page
        #  Scenario: Denied deleting of country without regions
        When I clicked three dots in the end of row in column Action for country Test a context menu with options "Edit" and "Delete" shows
        And I choose "Delete" a content appeared "Please note!"and"Are you sure you want to delete sample? The action cannot be reverted."
        And clicked button "Don't delete"
        Then modal disappeared, should not changes anything in data or row for country  trial 1

        #  Scenario: Delete country without regions
        When I clicked three dots in the end of row in column Action for country Test a context menu with options "Edit" and "Delete" shows
        And I choose "Delete" a content appeared "Please note!"and"Are you sure you want to delete sample? The action cannot be reverted."
        And clicked button Delete
        Then I see tooltip "Country deleted"and"The country has been removed. The country can anyway be added again."