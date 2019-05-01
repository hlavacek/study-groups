@ListExams
Feature: List Exams
  As a student
  I should see list of exams

  Scenario: Show base page of our application
    When I go to "/"
    Then I will see header "Study Groups"

  Scenario: Show the list of exams
    When I go to "/"
    Then I will see exams
      | title                   | subheader         |
      | Software Engineering    | 13.3.2019, 12:00  |
      | Artificial Intelligence | 12.3.2019, 12:00  |
