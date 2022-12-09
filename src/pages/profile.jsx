import { React } from 'react';
import Account from '../components/account'
import Navbar from '../components/navbar';
import OnlineBoard from '../components/onlineBoard';
import { isValidUsername } from '../utils/minecraftUsername';

function NoPage() {
    const { search } = window.location;
    const player = new URLSearchParams(search).get("player");

    let tryAccount = (username) => {
        if (isValidUsername(username))
            return (<Account username={username} />);
        return (<i>Invalid Username</i>);
    }

    let home = () => {
        return (
            <span className="Home">
                <OnlineBoard />
            </span>
        )
    }

    return (
        <span>
            <Navbar inputPlaceholder={isValidUsername(player) ? player : "Lipatant"} />
            {(player && !player.match("^[ ]*$")) ? tryAccount(player) : home()}
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
