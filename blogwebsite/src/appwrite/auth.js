import config from '../config/config.js'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    // Only account variable, because we have to create account on every new object
    account

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.account = new Account(this.client)
    }

    // To sign up the user
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if(userAccount) {
                // If account is available then log in the user
                // call another method
                return this.login({email, password})
            } 
            else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    // To sign in the user
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    // To check which user is log in
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch(error) {
            // throw error
            console.log("Appwrite service :: Get Current User :: Error", error)
        }
        
        return null
    }

    async logout() {
        try{
            await this.account.deleteSessions()
        } catch(error) {
            console.log("Appwrite service :: Logout :: Error", error)
        }
    }
}

const authService = new AuthService()

export default authService 