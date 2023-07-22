import { getDB } from "../../config/mongodb.js";


class UserRepository{

    async signUp(newUser){
        // 1. Access database
        const db = getDB();
        // 2. Get collection
        const collection = db.collection("users");
        // 3. Call insertOne function
        await collection.insertOne(newUser);
        return newUser;
    }

    async signIn(email, password){
        const db = getDB();
        const collection = db.collection("users");
        return await collection.findOne({email, password});
    }
}

export default UserRepository