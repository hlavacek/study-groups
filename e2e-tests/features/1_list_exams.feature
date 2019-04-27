@ListExams
Feature: List Exams
  As a student
  I should see list of exams

  Scenario: Show base page of our application
    When I go to "/"
    Then I will see header "Study Groups"

  Scenario: Show the list of exams
    When I go to "/"
    Then I will see list "Exams"
      | Course                  | Date         | Time           |
      | Sotware engineering     | 12.5.2019    | 13:00          |
      | Artificial intelligence | 9.5.2019     | 13:00          |
