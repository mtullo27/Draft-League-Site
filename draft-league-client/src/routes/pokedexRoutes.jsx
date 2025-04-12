import axios from "axios";

export async function getPokedex() {
    try {
        const response = await axios.get("http://localhost:3000/pokedex/with_tiers");
        return response.data;
    } catch (error) {
        console.error("Error fetching pokedex data:", error);
        throw error;
    }
}
