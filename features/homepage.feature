Feature: Homepage

  Scenario: Verify the title of the homepage
    Given I am on the homepage
    When I check the title
    Then Title should contain "Personal Portfolio"

  Scenario: Verify the presence of the 'Home' section in the navbar
    Given I am on the homepage
    When I look for the 'Home' link in the navbar
    Then it should be visible

  Scenario: Verify the 'About' section is accessible from the navbar
    Given I am on the homepage
    When I click on the 'About' link in the navbar
    Then I should see the About section

  Scenario: Verify "Read More" button 
    Given I am on the homepage
    When I click on the Read More button in About section
    Then I see detailed About section and return to homepage

   Scenario: Verify the 'Services' section is accessible from the navbar
    Given I am on the homepage
    When I click on the 'Services' link in the navbar
    Then I should see the Services section

   Scenario: Verify the 'Portfolio' section is accessible from the navbar
    Given I am on the homepage
    When I click on the 'Portfolio' link in the navbar
    Then I should see the Portfolio section

   Scenario: Verify the 'Contact' section is accessible from the navbar
    Given I am on the homepage
    When I click on the 'Contact' link in the navbar
    Then I should see the Contact section

  Scenario: Verify the footer text is correct
    Given I am on the homepage
    When I look at the footer
    Then it should contain "Copyright © 2024 by Bhavya| All Rights Reserved."

    Scenario: Verify the social media links are working
    Given I am on the homepage
    When I click on the Facebook social media icon
    Then I should be redirected to Facebook and return to homepage

    Scenario: Verify the social media links are working
    Given I am on the homepage
    When I click on the Instagram social media icon
    Then I should be redirected to Instagram and return to homepage

    Scenario: Verify the social media links are working
    Given I am on the homepage
    When I click on the LinkedIn social media icon
    Then I should be redirected to LinkedIn and return to homepage
