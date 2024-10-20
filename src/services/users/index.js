import {Users} from "@/models/users";
import {compare} from 'bcrypt'

export async function createAccount(username, password) {
    return (new Users({username, password})).save().then(res => {
        return res
    });
}

export async function validateCredentials(username, password) {
    const user = await Users.findOne({username}).lean();
    if (!user) {
        return null;
    }
    const passwordsMatch = await compare(password, user.password);
    if (!passwordsMatch) {
        return null;
    }
    return user;

}