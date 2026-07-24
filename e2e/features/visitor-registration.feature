Feature: Visitor Registration
  As a visitor
  I want to register my visit
  So that the organization knows I am here

  Scenario: Successful visitor registration
    Given I am on the landing page
   When I choose Visitor
   And I fill in "Nylla Mwangi" as my full name
   And I fill in "Interview" as my purpose of visit
   And I click the Register button
   Then I should be redirected to the dashboard

  Scenario: Registration fails with empty full name
    Given I am on the landing page
    And I choose Visitor
    When I leave the full name empty
    And I fill in "Interview" as my purpose of visit
    And I click the Register button
    Then I should see an error message "Full name is required"

  Scenario: Registration fails with empty purpose
    Given I am on the landing page
    And I choose Visitor
    When I fill in "Nylla Mwangi" as my full name
    And I leave the purpose empty
    And I click the Register button
    Then I should see an error message "Purpose is required"