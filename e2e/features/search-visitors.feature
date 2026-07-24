Feature: Search Visitors
  As an admin
  I want to search for visitors by name
  So that I can quickly find a specific visitor

  Scenario: Search returns matching visitors
    Given I am on the dashboard page
    When I type "Nylla" in the search box
    Then I should only see visitors whose name contains "Nylla"

  Scenario: Search returns no results for unknown name
    Given I am on the dashboard page
    When I type "zzznomatch" in the search box
    Then I should see "No Visitors Found"

  Scenario: Search is case insensitive
    Given I am on the dashboard page
    When I type "nylla" in the search box
    Then I should only see visitors whose name contains "nylla"