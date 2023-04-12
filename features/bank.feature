Feature: To test the functionality of the data table in Failed Banks List

Background:
    Given the user is on the Failed Banks page

Scenario: The user filters the data table
    When the user enters text into search box 
    Then the data table only shows results that match text in search box

Scenario: The user sorts the data table
    When the user clicks a column header
    Then the data table sorts the results according to selected column header

Scenario: The user navigates the data table
    When the user clicks a page number
    Then the data table shows the results from that page