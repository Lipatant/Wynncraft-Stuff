import { Component } from 'react';

class Navbar extends Component {
    render() {
        let inputPlaceholder = "";

        if (this.props !== null || this.props.inputPlaceholder !== null)
            inputPlaceholder = this.props.inputPlaceholder
        return (
            <form className="Window UserNameSearchBar" action="/Wynncraft-Stuff" method="get">
                <label>
                </label>
                <input
                    type="text"
                    id="searchBar"
                    placeholder={inputPlaceholder}
                    name="player"
                />
            </form>)
    }
}
export default Navbar;
