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

async function retrieveUserByEmail(email) {
    return await User.findOne({email: email });
}

async function retrieveUserById(id) {
    return await User.findOne({_id: id });
}

// Updates corresponding attributes of a user
async function updateUser(id, user) {

    const dbUser = await User.findById(id);
    if (dbUser) {
        
        dbUser.name = user.name ? user.name: dbUser.name;
        dbUser.password = user.password ? user.password: dbUser.password;
        dbUser.email = user.email ? user.email : dbUser.email;

        await dbUser.save();
        return dbUser;
    }

    return false;
}

async function deleteUser(id) {
    await User.deleteOne({ _id: id });
}

export {
    createUser,
    retrieveUserByEmail,
    retrieveUserById,
    retrieveUserList,
    updateUser,
    deleteUser
}