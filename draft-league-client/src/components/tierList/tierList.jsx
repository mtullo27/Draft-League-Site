import { useSelector } from "react-redux";
import Tier from "./tier";

const TierList = ({ pokedex }) => {
    const tiers = useSelector((state) => state.league.tiers);

    // Filter tiers, excluding '99', and sort them numerically
    const filteredTiers = pokedex.tiers
        .filter((tier) => tier.localeCompare('99', undefined, { numeric: true }))
        .sort((a, b) => parseInt(b) - parseInt(a));

    const getGradientColor = (index, total) => {
        const hue = (index / (total - 1)) * 270;
        return `hsl(${hue}, 100%, 85%)`;
    };

    return (
        <div className="flex flex-row">
            {filteredTiers.map((tier, index) => (
                <div key={tier} className="">
                    <Tier
                        tier={tier}
                        backgroundColor={getGradientColor(index, filteredTiers.length)}
                    />
                </div>
            ))}
        </div>
    );
};

export default TierList;