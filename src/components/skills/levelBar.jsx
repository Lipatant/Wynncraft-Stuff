import { Component } from 'react';
import GraphBar from '../graphBar';

function CreateBarData(skillId, skillValue, skillsTotal) {
    let style = {};

    style.className = skillId.toUpperCase();
    if (skillsTotal > 0)
        style.height = String(skillValue / skillsTotal * 100) + "%";
    else
        style.height = "0px";
    if (skillValue > 0)
        style.content = String(skillValue);
    return style;
}

class SkillsLevelBar extends Component {
    render() {
        const required = ["skills"];
        const skillsDataList = ["strength", "dexterity", "intelligence", "defence", "agility"];
        const dataList = [];
        let skillsTotal = 0;

        // Checks props are valid
        if (this.props === null) return ("");
        for (const element of required)
            if (!(element in this.props))
                return ("");
        //
        for (const [skillId, skillValue] of Object.entries(this.props.skills))
            if (skillsDataList.includes(skillId))
                skillsTotal += skillValue
        for (const [skillId, skillValue] of Object.entries(this.props.skills))
            if (skillsDataList.includes(skillId))
                dataList.push(CreateBarData(skillId, skillValue, skillsTotal));
        //
        return (
            <GraphBar className={"LevelBar SkillsLevelBar " + ("className" in this.props ? this.props.className : "")}
                height="100%"
                backgroundColor="none"
                data={dataList}
            />
        );
    }
}

export default SkillsLevelBar;
