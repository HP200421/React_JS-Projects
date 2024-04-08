import { Client, ID, Databases, Storage, Query } from 'appwrite'
import conf from '../conf/conf.js'

// Creating a class name Service
export class Service{
 client = new Client()
 database
 storage

 constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)

    this.database = new Databases(this.client)
    this.storage = new Storage(this.client)
 }

 // Creating post
 async createPost({title, slug, content, featuredImage, status, userId}) {
   try {
      return await this.database.createDocument(
         conf.appwriteDatabaseId,
         conf.appwriteCollectionId,
         slug, // It will work as document id, We can use Id.unique() instead of this
         {
            title,
            content,
            featuredImage,
            status,
            userId
         }
      )
   } catch(error) {
      console.log("Appwrite service :: createPost :: error", error)
   }
 }

//  Updating post

async updatePost(slug, {title, content, featuredImage, status}) {
   try {
      return await this.database.updateDocument(
         conf.appwriteDatabaseId,
         conf.appwriteCollectionId,
         slug,
         {
            title,
            content,
            featuredImage,
            status
         }
      )
   } catch(error) {
      console.log("Appwrite service :: updatePost :: error", error)
   }
}

// Deleting post
async deletePost(slug) {
   try {
      await this.database.deleteDocument(
         conf.appwriteDatabaseId,
         conf.appwriteCollectionId,
         slug
      )

      return true
   } catch(error) {
      console.log("Appwrite service :: deletPost :: error", error)
      return false
   }
}

// Return single post
async getPost(slug) {
   try {
      return this.database.getDocument(
         conf.appwriteDatabaseId,
         conf.appwriteCollectionId,
         slug
      )
   } catch (error) {
      console.log("Appwrite service :: getPost :: error", error)
      return false
   }
}

// Return all post's that are active ....... that means all the collections from given database
async getPosts(queries = [Query.equal("status", "active")]) {
   try {
     return await this.database.listDocuments(
         conf.appwriteDatabaseId,
         conf.appwriteCollectionId,
         queries
      )
   } catch(error) {
      console.log("Appwrite service :: getPosts :: error", error)
   }
}

// File upload services
async uploadFile(file) {
   try {
      return await this.storage.createFile(
         conf.appwriteBucketId,
         ID.unique(),
         file
      )
   } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error)
      return false
   }
}

// File delete services
async deleteFile(fileId) {
   try {
      await this.storage.deleteFile(
         conf.appwriteBucketId,
         fileId
      )

      return true
   } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error)
      return false
   }
}

getFilePreview(fileId) {
   return this.storage.getFilePreview(
      conf.appwriteBucketId,
      fileId
   )
}

}

// Creating object and exporting it to access functionality
const service = new Service()

export default service