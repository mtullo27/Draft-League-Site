import axios from 'axios';

export async function getCompetitiveData() {
    try {
        const response = await axios.get('http://localhost:3000/competitive/pokedex');
        console.log(response.data[0])
        return response.data;
    } catch (error) {
        console.error('Error fetching competitive data:', error);
        throw error;
    }
}