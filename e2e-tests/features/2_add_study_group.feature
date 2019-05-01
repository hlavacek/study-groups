@AddStudyGroup
Feature: Add Study group
  As a student
  I should add a study group

  Scenario: Add a study group
    When I go to "/"
    And I expand exam "Software Engineering"
    And I set "Location" to "3D Lab" in exam "Software Engineering"
    And I set "Date / Time" to "11.5.2019, 12:00" in exam "Software Engineering"
    And I click on button "Add" in exam "Software Engineering"
    Then Exam "Software Engineering" will have study groups
      | location          | datetime         |
      | 3D Lab            | 11.5.2019, 12:00 |

   Scenario: Add second study group
    When I go to "/"
    And I expand exam "Software Engineering"
    And I set "Location" to "Super Krcma" in exam "Software Engineering"
    And I set "Date / Time" to "11.5.2019, 12:00" in exam "Software Engineering"
    And I click on button "Add" in exam "Software Engineering"
    Then Exam "Software Engineering" will have study groups
      | location          | datetime         |
      | 3D Lab            | 11.5.2019, 12:00 |
      | Super Krcma       | 11.5.2019, 12:00 |
      
