import { React } from 'react';
import Account from '../components/account'

function NoPage() {
    const { search } = window.location;
    const player = new URLSearchParams(search).get("player");
    let isValidUsername = (username) => {
        if (username && username.match("^[a-zA-Z0-9_]{3,16}$"))
            return true;
        return false;
    }
    let tryAccount = (username) => {
        if (isValidUsername(username))
            return (<Account username={username} />);
        return (<i>Invalid Username</i>);
    }

    return (
        <span>
            <form className="Window UserNameSearchBar" action="/" method="get">
                <label>
                </label>
                <input
                    type="text"
                    id="searchBar"
                    placeholder={isValidUsername(player) ? player : "Lipatant"}
                    name="player"
                />
            </form>
            {tryAccount(player)}
        </span>
    )
    /*    return (
            <span>
                SearchBar
                <Account userName="searched" />
                <Account userName="JajmeLesLjcornes" />
                <Account userName="bleeman73" />
                <Account userName="Block_Of_Lapis" />
                <Account userName="Spaceuh" />
                <Account userName="IceWarox" />
                <Account userName="TheIvyX" />
            </span>
        )*/
}

export default NoPage;
