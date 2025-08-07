const PokemonPic = ({ src, alt }) => {
    if (!src) {
        return null;
    }

    return (
        <img
            className="min-h-24 max-h-24 "
            src={src}
            alt={alt}
        />
    );
}

export default PokemonPic;