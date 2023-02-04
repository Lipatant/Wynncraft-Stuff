import { Component } from 'react';

function RemoveClassSkin(className, inUpperCase = false) {
    let classReturned = className.toLowerCase();
    const classSkinAliases = {
        "hunter": "archer",
        "knight": "warrior",
        "ninja": "assassin",
        "darkwizard": "mage",
        "dark wizard": "mage",
        "skyseer": "shaman",
    }

    if (classReturned in classSkinAliases)
        classReturned = classSkinAliases[classReturned].toLowerCase();
    if (inUpperCase)
        return (classReturned.toUpperCase());
    return (classReturned);
}

function TryValue(object, key, defaultValue = "") {
    if ((typeof object) == "object" && key in object)
        return object[key];
    return defaultValue;
}

function FillUrl(url, classId = "") {
    if ((typeof url) != "string")
        return "";
    return url.replace("%?", classId).replace("%>", process.env.PUBLIC_URL);
}

class ClassImg extends Component {
    render() {
        const required = ["classId", "file"];

        if (this.props === null) return ("");
        for (const element of required)
            if (!(element in this.props))
                return ("");
        const classId = TryValue(this.props, "reskins", true) ? this.props.classId.toLowerCase() : RemoveClassSkin(this.props.classId, false);
        const element = <img className={"ClassImg " + TryValue(this.props, "className")}
            src={FillUrl(this.props.file, classId)} alt={TryValue(this.props, "alt")} />
        if ("href" in this.props) {
            return (
                <a href={FillUrl(this.props.href, classId)} target="_blank" rel="noreferrer">
                    {element}
                </a>
            );
        }
        return element;
    }
}

export default ClassImg;
