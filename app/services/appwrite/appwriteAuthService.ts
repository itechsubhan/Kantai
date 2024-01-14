import { account } from "./appwrite"
import { Account, ID } from "appwrite"

type CreateUserAccount = {
  email: string
  password: string
  name: string
}
class AppwriteAuthService {
  account: Account

  constructor() {
    this.account = account
  }

  // create a new record of user inside appwrite

  async createAccount({ email, password, name }: CreateUserAccount) {
    try {
      console.log("Appwrite service :: createAccount() :: " + email + " " + password + " " + name)
      const userAccount = await this.account.create(ID.unique(), email, password, name)
      if (userAccount) {
        // TODO: create login feature Have 
        return this.login({ email, password })
      } else {
        return userAccount
      }
    } catch (error) {
      //   Snackbar.show({
      //     text: String(error),
      //     duration: Snackbar.LENGTH_LONG,
      //   })
      console.log("Appwrite service :: createAccount() :: " + error)
    }
  }

  async login({ email, password }: { email: string; password: string }): Promise<void> {
    try {
      await this.account.createEmailSession(email, password)
      console.log("Login successful")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSession("current")
      console.log("Logout successful")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }
}

// Singleton instance of the API for convenience
// export default AppwriteAuthService
export const appwriteAuthService = new AppwriteAuthService()