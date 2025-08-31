import { useForm } from '@inertiajs/react';

export default function Edit({ profile }) {
    const { data, setData, post, processing, errors } = useForm({
        username: profile?.username || '',
        bio: profile?.bio || '',
        location: profile?.location || '',
        phone: profile?.phone || '',
        birthdate: profile?.birthdate || '',
        avatar: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route('profile.update'));
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Edit Profile</h1>
            <form onSubmit={submit} className="mt-4 space-y-4">
                <input type="text" value={data.username} onChange={(e) => setData('username', e.target.value)} placeholder="Username" />
                <textarea value={data.bio} onChange={(e) => setData('bio', e.target.value)} placeholder="Bio" />
                <input type="file" onChange={(e) => setData('avatar', e.target.files[0])} />
                <button type="submit" disabled={processing}>
                    Save
                </button>
            </form>
        </div>
    );
}
