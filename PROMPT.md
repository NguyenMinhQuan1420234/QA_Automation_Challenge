# CONTEXT FOR WRITING AUTOMATION TESTCASES
## Based context

As a quality engineer, I want to achieve 100% coverage on testcases.
host url: https://opensource-demo.orangehrmlive.com/
Framework uses playwright 
Test type are functional test
Set global delay = 10000ms

## testdata
Account for the website
username: Admin
password: admin123

## Test Scenario
### Scenario 1: Functional testing for Log-in page
url: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

### Scenario 2: Functional testing for Search function
url: https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index

To-Do:
1. Develop a well-rounded suite of test cases for these functionalities, covering:
• Functional scenarios
• Edge cases
• Negative paths

2. Create 2 test files to achieve  coverage 100% of this  web including positive and negative cases.

3. Add annotation to trigger only this scenario.

4. Each testcases should have 2 or more assertions.

5. Create excel file to store testcases in check list, provide collumns with test scenario name, test name,, test type, pass/fail, note.

6. In second Scenario, Functional Testing for Search function, add precondition log in with account Admin.

## File paths:
test file path: /tests

## Framework should incorporate:
• Cross-browser/platform support
• Modular design for ease of updates and scalability
• CI/CD compatibility (Jenkins, GitHub Actions, GitLab CI, etc.) for automated execution
• Configurable parameters and comprehensive reporting
• Support for automating different test types: UI, API, regression, performance