/**
* Checks a player could be named 'username'
*/
export function isValidUsername(username) {
    if (username && username.match("^[a-zA-Z0-9_]{3,16}$"))
        return true;
    return false;
}
