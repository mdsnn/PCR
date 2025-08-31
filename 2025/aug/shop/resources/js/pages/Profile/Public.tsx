export default function Public({ profile }) {
    return (
        <div className="mx-auto max-w-2xl p-6">
            <div className="flex items-center space-x-4">
                {profile.avatar ? (
                    <img src={`/storage/${profile.avatar}`} alt="avatar" className="h-20 w-20 rounded-full object-cover" />
                ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
                        <span className="text-2xl text-gray-600">{profile.user.name[0]}</span>
                    </div>
                )}

                <div>
                    <h1 className="text-2xl font-bold">{profile.user.name}</h1>
                    <p className="text-gray-500">@{profile.username}</p>
                </div>
            </div>

            {profile.bio && <p className="mt-4 text-gray-700">{profile.bio}</p>}

            {profile.location && <p className="mt-2 text-sm text-gray-500">📍 {profile.location}</p>}
        </div>
    );
}
