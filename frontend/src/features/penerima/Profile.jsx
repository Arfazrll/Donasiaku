import { useState, useRef, useEffect } from "react";
import { FiCamera, FiEdit2 } from "react-icons/fi";
import { getAuthData, setAuthData } from "../../utils/localStorage.js";

function Profile() {
  const userData = getAuthData();
  const [profile, setProfile] = useState(userData || {
    name: "",
    email: "",
    phone: "",
    role: "",
    avatar: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ ...profile });
  const fileInputRef = useRef(null);

  useEffect(() => {
    setEditData({ ...profile });
  }, [profile]);

  const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditData({ ...editData, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile({ ...editData });
    setAuthData({ ...editData });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={editData.avatar || profile.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
            {editMode && (
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white shadow-md hover:bg-blue-700 transition"
              >
                <FiCamera size={20} />
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <h1 className="text-2xl font-bold mt-4">{profile.name}</h1>
          <span className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full mt-1">{profile.role}</span>
        </div>

        {/* Detail Profil */}
        {!editMode ? (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-500">Nama</label>
              <p className="mt-1 text-gray-800">{profile.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-gray-800">{profile.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Nomor HP</label>
              <p className="mt-1 text-gray-800">{profile.phone}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FiEdit2 /> Edit Profil
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-500">Nama</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Nomor HP</label>
              <input
                type="text"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Simpan
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
