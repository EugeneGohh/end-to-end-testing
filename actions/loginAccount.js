const chalk = require("chalk");

class LoginAccount {
  constructor(page) {
    this.url = "http://127.0.0.1:8080/";
    this.page = page;
    this.loginBtn = "#login";
    this.loginBody = "#loginBody";
    this.usernameField = "#username";
    this.passwordField = "#password";
    this.loginPageBtn = "#loginBtn";
  }

  async login(username, password) {
    try {
      await this.page.goto(this.url);
      await this.page.waitForTimeout(this.loginBtn);
      await this.page.click(this.loginBtn);
      // Wait for the loginBody on the login page to load
      await this.page.waitForTimeout(this.loginBody);

      // Type the login credentials into the input fields
      await this.page.type(this.usernameField, username);
      await this.page.waitForTimeout(1000);

      await this.page.type(this.passwordField, password);
      await this.page.waitForTimeout(1000);

      await this.page.click(this.loginPageBtn);

      // Wait for homepage to load
      await this.page.waitForTimeout("#firstname");
      await this.page.waitForTimeout(2000);

      const firstname = await this.page.$eval(
        "#homeBody #firstname",
        (el) => el.textContent
      );

      return firstname;
    } catch (err) {
      console.log(chalk.red("ERROR => ", err));
    }
  }
}

module.exports = (page) => new LoginAccount(page);
