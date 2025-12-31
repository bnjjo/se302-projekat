# se302-projekat

testing of [McMaster-Carr website](https://www.mcmaster.com). school project.

## setup

```bash
npm install
npx playwright install
```

## running tests

```
# run all tests
npx playwright test

# run smoke tests only
npx playwright test tests/smoke

# run functional tests only
npx playwright test tests/functional

# run with visible browser
npx playwright test --headed

# view html report
npx playwright show-report
```

## test cases

### smoke tests (5)
- ST-001: homepage loads successfully
- ST-002: search bar is visible and accessible
- ST-003: header navigation elements are present
- ST-004: logo is visible and clickable
- ST-005: category navigation is displayed

### functional tests (10)
- FT-001: search for a product and verify navigation
- FT-002: clear search input using clear button
- FT-003: search with special characters
- FT-004: open and close browse catalog menu
- FT-005: navigate to category from browse catalog
- FT-006: verify all categories exist in browse menu
- FT-007: navigate to category from sidebar
- FT-008: navigate to help page
- FT-009: navigate to locations page
- FT-010: click order link navigates correctly

## notes

- tests use page object model pattern
- 5 second delay between tests to avoid rate limiting
- retry count set to 2 for flaky test handling
