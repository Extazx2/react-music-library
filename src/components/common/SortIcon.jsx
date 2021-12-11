import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const SortIcon = ({ sort, name }) => {

    if (sort.property !== name) return null

    const iconName = {
        asc: "caret-up",
        desc: "caret-down"
    }
    const icon = iconName[sort.direction] || null

    return <FontAwesomeIcon icon={icon} />
}