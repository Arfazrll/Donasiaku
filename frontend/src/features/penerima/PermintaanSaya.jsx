import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiFileText,
  FiUsers,
  FiSend,
  FiClock,
  FiArrowLeft,
} from "react-icons/fi";
import { getDonasiByIdService, updateDonasiService } from "../../services/donasiService.js";
import { getAllDonasi } from "../../services/donasiService.js";
import { updateRequestStatus } from "../../utils/localStorage.js";
import { getAuthData } from "../../utils/localStorage.js";

const PermintaanSaya = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donasi, setDonasi] = useState(null);
  const [permintaan, setPermintaan] = useState([]);
  const [allDonasi, setAllDonasi] = useState([]);
  const [formData, setFormData] = useState({ jumlah: 1, asal: "", deskripsi: "" });
  const user = getAuthData();

  // Ambil data donasi jika ada ID
  useEffect(() => {
    const fetchDonasi = async () => {
      if (id) {
        const donasiData = await getDonasiByIdService(id);
        setDonasi(donasiData);
      }
    };
    fetchDonasi();
  }, [id]);

  // Ambil daftar permintaan user login
  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("requests_db") || "[]");
    const myRequests = allRequests.filter((req) => req.penerimaId === user.id);
    setPermintaan(myRequests);
  }, [user.id]);

  // Ambil semua donasi untuk ditampilkan di list
  useEffect(() => {
    const loadAllDonasi = async () => {
      const data = await getAllDonasi();
      setAllDonasi(data);
    };
    loadAllDonasi();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Data pengguna tidak ditemukan, silakan login ulang.");
      return;
    }

    if (formData.jumlah <= 0 || formData.jumlah > donasi.jumlah) {
      alert(`Jumlah harus di antara 1 dan ${donasi.jumlah}`);
      return;
    }

    if (!formData.asal) {
      alert("Silakan isi asal Anda.");
      return;
    }

    const newRequest = {
      id: `req_${Date.now()}`,
      donasiId: donasi.id,
      penerimaId: user.id,
      status: "pending",
      jumlahDiminta: formData.jumlah,
      asalPenerima: formData.asal,
      deskripsiPermintaan: formData.deskripsi,
      createdAt: new Date().toISOString(),
    };

    const allRequests = JSON.parse(localStorage.getItem("requests_db") || "[]");
    allRequests.push(newRequest);
    localStorage.setItem("requests_db", JSON.stringify(allRequests));

    alert("Permintaan berhasil diajukan!");

    const myRequests = allRequests.filter((req) => req.penerimaId === user.id);
    setPermintaan(myRequests);
    navigate("/penerima/permintaan-saya");
  };

  const handleMarkCompleted = async (req) => {
    updateRequestStatus(req.id, 'completed');

    try {
      await updateDonasiService(req.donasiId, { status: 'selesai' });
    } catch (err) {
      console.error('Gagal update status donasi:', err);
    }

    const allRequests = JSON.parse(localStorage.getItem('requests_db') || '[]');
    const myRequests = allRequests.filter((r) => r.penerimaId === user.id);
    setPermintaan(myRequests);

    alert('Terima kasih — permintaan ditandai selesai dan akan masuk ke riwayat.');
  };

  // Jika tidak sedang mengajukan (tidak ada id donasi di URL), tampilkan daftar permintaan
  if (!id) {
    if (permintaan.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-gray-600">Belum ada permintaan yang diajukan.</p>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Permintaan Saya</h1>
        <div className="grid gap-4">
          {permintaan.map((req) => {
            const donasiData = allDonasi.find(
              (d) => String(d.id) === String(req.donasiId)
            );

            return (
              <div
                key={req.id}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
              >
                {donasiData?.image ? (
                  <img
                    src={donasiData.image}
                    alt={donasiData.nama}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                    No Image
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <FiPackage /> {donasiData?.nama || "Barang Tidak Ditemukan"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Jumlah: {req.jumlahDiminta} | Status:{" "}
                    <span className="font-semibold text-blue-600">
                      {req.status}
                    </span>
                  </p>
                </div>

                <div className="text-gray-400 text-sm flex items-center gap-1">
                  <FiClock />{" "}
                  {new Date(req.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div className="ml-4">
                  {req.status === 'sent' && (
                    <button onClick={() => handleMarkCompleted(req)} className="px-3 py-1 bg-green-600 text-white rounded">
                      Tandai Selesai
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Jika sedang ajukan permintaan (ada id)
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-gray-700 font-semibold hover:text-[#007EFF] transition-colors"
        >
          <FiArrowLeft className="text-lg" />
          <span>Kembali</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl">
        <div className="bg-gradient-to-r from-[#00306C] to-[#0063FF] text-white px-8 py-6 rounded-t-3xl">
          <h1 className="text-3xl font-bold">Permintaan Barang</h1>
          <p className="text-white/80 mt-1">
            Konfirmasi permintaan Anda untuk barang ini.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <FiPackage className="text-[#007EFF]" />
              <span>Nama Barang</span>
            </label>
            <input
              type="text"
              value={donasi?.nama || ""}
              disabled
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <FiPackage className="text-[#007EFF]" />
              <span>Jumlah/Kebutuhan *</span>
            </label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              min="1"
              max={donasi?.jumlah || 1}
              required
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <FiUsers className="text-[#007EFF]" />
              <span>Darimana Anda Berasal *</span>
            </label>
            <input
              type="text"
              name="asal"
              value={formData.asal}
              onChange={handleChange}
              required
              placeholder="Contoh: Komunitas, panti asuhan, dsb."
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <FiFileText className="text-[#007EFF]" />
              <span>Deskripsi Tambahan</span>
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows="4"
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007EFF] focus:ring-4 focus:ring-[#007EFF]/10 transition-all resize-none"
            />
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 font-bold rounded-xl transition-all bg-gradient-to-r from-[#007EFF] to-[#0063FF] text-white hover:shadow-xl hover:shadow-[#007EFF]/30 hover:scale-[1.03]"
            >
              <FiSend className="text-xl" />
              <span>Ajukan Permintaan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermintaanSaya;