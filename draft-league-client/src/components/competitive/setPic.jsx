const PokemonPic = ({ src, alt }) => {
    if (!src) {
        return null;
    }

    return (
        <img
            className="min-w-64 min-h-64"
            src={src}
            alt={alt}
        />
    );
}

export default PokemonPic;