import { useEffect, useState } from "react"

export function ContactFilter(props) {

    const [filterBy, setFilterBy] = useState(props.filterBy)

    useEffect(() => {
        props.onChangeFilter(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        setFilterBy(prevFilterBy => ({
            ...prevFilterBy,
            [field]: value
        }))
    }

    const { txt } = filterBy
    return (
        <div className="input-container">
            <input onChange={handleChange} value={txt} type="text" name="txt" className="input" placeholder="Search contacts"/>
            <div className="underline"></div>
        </div>
    )
}
