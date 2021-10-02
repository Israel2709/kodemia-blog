import logo from '../../logo.svg';

const EntryCard = props => {
    console.log(props)
    const { entryData } = props
    const { entryTitle, content, picture } = entryData

    return (
        <div className="blog-entry">
            <img src={picture} alt="" />
            <h2>{ entryTitle }</h2>
            <p>{
                content.length > 30
                    ? `${content.slice(0, 30)}...`
                    : content
            }</p>
            <button>Ver más!</button>
        </div>
    )
}

export default EntryCard