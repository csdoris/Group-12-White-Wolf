import { User } from './schema';

async function createUser(user) {

    const dbUser = new User(user);
    await dbUser.save();
    return dbUser;
}

// Returns list of users with their id and name only
async function retrieveUserList() {
    return await User.find({},'name');
}

async function retrieveUser(email) {
    return await User.findOne({email: email});
}

// Kinda sus, needs to supply info to be overwritten
async function updateUser(id, newData) {

    const dbUser = await User.findById(user._id);
    if (dbUser) {
        
        dbUser.username = user.username;
        dbUser.password = user.password;
        dbUser.email = user.email;

        await dbUser.save();
        return true;
    }

    return false;
}

async function deleteUser(id) {
    await User.deleteOne({ _id: id });
}

export {
    createUser,
    retrieveUser,
    retrieveUserList,
    updateUser,
    deleteUser
}