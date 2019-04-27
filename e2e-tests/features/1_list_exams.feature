@ListExams
Feature: List Exams
  As a student
  I should see list of exams

  Scenario: Show base page of our application
    When I go to "/"
    Then I will see header "Study Groups"

  # Scenario: Show the list of exams
  #   When I go to "/"
  #   Then I will see list "Available Projects"
  #     | *Title*            | *Subtitle*   | Loan Amount    | Project Comment         |
  #     | School in Slovakia | BMZ - 123xyz | 4.000.000,00 € | Nice school in Slovakia |
