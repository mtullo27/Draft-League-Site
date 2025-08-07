const CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const REDIRECT_URI = encodeURIComponent(import.meta.env.VITE_DISCORD_REDIRECT_URI);
const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20email`;

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
                <h1 className="text-white text-3xl mb-4">Login with Discord</h1>
                <a
                    href={DISCORD_OAUTH_URL}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition"
                >
                    Login
                </a>
            </div>
        </div>
    );
}
