import './CategoryCard.css'

export const CategoryCard = ({ category }) => {
    const { id, name, image } = category;
    return (
        <a href={`/categories/${id}`}>
            <article className='categoryCard__container'>
                <figure>
                    <img src={image} alt={name} />
                </figure>
                <h3>{name}</h3>
            </article>
        </a>
    )
}
