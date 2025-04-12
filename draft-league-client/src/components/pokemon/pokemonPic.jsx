import { useSelector } from "react-redux";

const PokemonPic = ({ src, alt }) => {
    if (!src) {
        return null;
    }

    return (
        <img
            className="min-w-24 min-h-24"
            src={src}
            alt={alt}
        />
    );
}

export default PokemonPic;