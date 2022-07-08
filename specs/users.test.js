let credentials = require("../utils/credentials");
let createAccount = require("../actions/createAccount");
let loginAccount = require("../actions/loginAccount");

jest.setTimeout(60000);

describe("Basic authentication e2e tests", () => {
  let credential;
  beforeAll(async () => {
    // Set a definite site for the page viewport so view is consistent across browsers
    await page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
    });

    credential = credentials("User");
    createAccount = await createAccount(page);
    loginAccount = await loginAccount(page);
  });

  it("Should be able to create an account", async () => {
    const firstname = await createAccount.signup(
      credential.fullname,
      credential.username,
      credential.password
    );
    page.waitForTimeout(1000);
    expect(credential.fullname);
  });

  it("Should be able to log in after a successful account creation", async () => {
    const firstname = await loginAccount.login(
      credential.username,
      credential.password
    );
    page.waitForTimeout(1000);
    expect(credential.fullname);
  });
});
