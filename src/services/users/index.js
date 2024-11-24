import {Users} from "@/models/users";
import {compare} from 'bcrypt'

export async function createAccount(username, password, emailAddress, ageGroup) {
    console.log('Creating the account: ',{username, password,emailAddress, ageGroup});
    return (new Users({username, password,emailAddress, ageGroup})).save().then(res => {
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