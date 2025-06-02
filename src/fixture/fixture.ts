// fixtures/customFixtures.ts
import { test as baseTest, Page } from '@playwright/test';
import ENV from '../utils/env';
import { admin, password } from '../utils/data';
import { login } from '../pages/loginPage';

type UserInfo = {
  username: string;
  password: string;
};

type Fixtures = {
  userInfo: UserInfo;
  signIn: Page;
  authenticatedPage: Page;
};

const test = baseTest.extend<Fixtures>({
  userInfo: async ({}, use) => {
    await use({
      username: admin,
      password: password,
    });
  },

  signIn: async ({ page }, use) => {
    await page.goto(ENV.BASE_URL);
    await use(page);
  },

  authenticatedPage: async ({ page, userInfo }, use) => {
    await page.goto(ENV.BASE_URL);
    await login(page, userInfo.username, userInfo.password)
    await use(page);
  },
});

export { test };
export { expect } from '@playwright/test';