import axios from 'axios';

export async function getLeagueData() {
    try {
        const response = await axios.get('http://localhost:3000/league');
        return response.data;
    } catch (error) {
        console.error('Error fetching league data:', error);
        throw error;
    }
}

export async function getLeagueById(id) {
    try {
        const response = await axios.get(`http://localhost:3000/league/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching league data:', error);
        throw error;
    }
}

export async function getRosterData(id) {
    try {
        const response = await axios.get(`http://localhost:3000/league/roster/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching roster data:', error);
        throw error;
    }
}

export async function getTierData(id) {
    try {
        console.log(`http://localhost:3000/league/tier/search/${id}`)
        const response = await axios.get(`http://localhost:3000/league/tier/search/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching teirs data:', error);
        throw error;
    }
}

export async function getActiveLeague() {
    try {
        const response = await axios.get('http://localhost:3000/league/info/active');
        return response.data;
    } catch (error) {
        console.error('Error fetching active league data:', error);
        throw error;
    }
}