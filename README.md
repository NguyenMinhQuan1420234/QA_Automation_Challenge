# DRXSW Website Testing Suite

This project contains automated tests for the DRXSW website (www.drxsw.com) using Playwright.

## Features

- Comprehensive test coverage for website functionality
- Tests for novel details, categories, and reading experience
- Mobile responsiveness testing
- Performance metrics monitoring
- Error handling verification
- User interaction testing

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
# https://github.com/NguyenMinhQuan1420234/QA_Automation_Challenge.git

```bash
git clone [your-repository-url]
cd playwright_projectWebScrapping
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

To run all tests:
```bash
npx playwright test
```

To run specific test file:
```bash
npx playwright test tests/ui
```

To run tests with UI mode:
```bash
npx playwright test --ui
```

## Test Structure

The test suite includes:
- Basic website functionality tests
- Novel details and chapter reading tests
- Category navigation tests
- User interaction tests
- Mobile responsiveness tests
- Performance metrics tests
- Error handling tests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 
