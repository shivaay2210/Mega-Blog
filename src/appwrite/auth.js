/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        // account creation fail bhi ho skta h 
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount) {
                // call another method
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }   
    }

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get()
            if(currentUser) return currentUser
            else return null
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService

// under the hood authentication kaise ho rhi h woh bss iss file ko pata h
// toh kbhi in future backend service change hoti h toh changes bss iss file mai honge
// front end ko koi farak nhi padega