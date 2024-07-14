import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    // Create account means sign up method
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if(userAccount) {
                // Call another method
                // If user account exist login the user
                return this.login({email, password})
            }
            else {
                return userAccount
            }
        } 
        catch(error) {
            console.log("Appwrite service :: createAccount :: error", error)
        }
    }

    // Login means sign in method
    async login({email, password}) {
        try {
            // Checking if there is any active session of user and deleting it to login another user or same one

            // const sessions = await this.account.listSessions()

            // if(sessions.total > 0) {
            //     await this.logout()
            // }

            return await this.account.createEmailPasswordSession(email, password)
        }
        catch(error) {
            console.log("Appwrite service :: login :: error", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        }
        catch(error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }
        
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSession()
        }
        catch(error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }
}

const authService = new AuthService()

export default authService