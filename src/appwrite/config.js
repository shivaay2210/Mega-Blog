import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket; // or storage 

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // file post service
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, /* document id */
                {
                    title, 
                    body: content,
                    featuredImage,
                    status, 
                    userId
                }
            )
        } catch (error) {
            console.log(`Appwrite service :: createPost :: ${error}`);
            throw error
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
                {
                    title,  
                    body: content,
                    featuredImage,
                    status, 
                }
            )
        } catch (error) {
            console.log(`Appwrite service : updatePost : ${error}`);
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(`Appwrite service :: deletePost :: ${error}`);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(`Appwrite service :: getPost :: ${error}`);
            return false
        }
    }

    // if i write only listDocuments then it will also give documents whose status is not active so here we need to work with queries
    async getPosts(queries = [Query.equal("status", "active"), /* ho skta h aur queries ho multiple queries are allowed at same time */]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(`Appwrite service : getPosts : ${error}`);
            return false
        }
    }

    // async getPosts(queries) {
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             queries
    //         )
    //     } catch (error) {
    //         console.log("Appwrite service :: getPosts :: error :: ", error)
    //         return false
    //     }
    // }


    // file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(`Appwrite service : uploadFile : ${error}`);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log(`Appwrite service : deleteFile : ${error}`);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service;