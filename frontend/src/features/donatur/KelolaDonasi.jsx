import { useEffect, useState } from "react";
import { FiClock, FiPackage, FiMapPin, FiUser } from "react-icons/fi";
import { getAuthData } from "../../utils/localStorage";
import { getMyDonasi, updateDonasiService } from "../../services/donasiService";

const KelolaDonasi = () => {
  const user = getAuthData();
  const [donasiList, setDonasiList] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }

      try {
        const myDonasi = await getMyDonasi();
        setDonasiList(myDonasi || []);

        const allReq = JSON.parse(localStorage.getItem("requests_db") || "[]");
        const donasiIds = (myDonasi || []).map((d) => String(d.id));
        const incoming = allReq.filter((r) => donasiIds.includes(String(r.donasiId)));
        setRequests(incoming);
      } catch (err) {
        console.error("Gagal mengambil data kelola donasi", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleAccept = async (req) => {
    if (processing) return;
    
    const confirmAccept = window.confirm("Terima permintaan ini dan kurangi jumlah donasi?");
    if (!confirmAccept) return;

    const donasi = donasiList.find((d) => String(d.id) === String(req.donasiId));
    if (!donasi) {
      alert("Donasi tidak ditemukan.");
      return;
    }

    const newJumlah = Math.max(0, Number(donasi.jumlah) - Number(req.jumlahDiminta));

    setProcessing(true);
    try {
      await updateDonasiService(donasi.id, { jumlah: newJumlah });

      const allReq = JSON.parse(localStorage.getItem("requests_db") || "[]");
      const updatedReq = allReq.map((r) =>
        String(r.id) === String(req.id)
          ? { ...r, status: "accepted", updatedAt: new Date().toISOString() }
          : r
      );
      localStorage.setItem("requests_db", JSON.stringify(updatedReq));

      const donasiIds = donasiList.map((d) => String(d.id));
      setRequests(updatedReq.filter((r) => donasiIds.includes(String(r.donasiId))));

      const refreshed = await getMyDonasi();
      setDonasiList(refreshed || []);

      alert("Permintaan diterima. Jumlah donasi diperbarui.");
    } catch (err) {
      console.error(err);
      alert("Gagal memproses permintaan.");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = (req) => {
    if (processing) return;
    
    const confirmReject = window.confirm("Tolak permintaan ini?");
    if (!confirmReject) return;

    setProcessing(true);
    try {
      const allReq = JSON.parse(localStorage.getItem("requests_db") || "[]");
      const updatedReq = allReq.map((r) =>
        String(r.id) === String(req.id)
          ? { ...r, status: "rejected", updatedAt: new Date().toISOString() }
          : r
      );
      localStorage.setItem("requests_db", JSON.stringify(updatedReq));

      const donasiIds = donasiList.map((d) => String(d.id));
      setRequests(updatedReq.filter((r) => donasiIds.includes(String(r.donasiId))));

      alert("Permintaan telah ditolak.");
    } finally {
      setProcessing(false);
    }
  };

  const handleSend = (req) => {
    if (processing) return;
    
    const confirmSend = window.confirm("Tandai permintaan ini sebagai sudah dikirim/diambil?");
    if (!confirmSend) return;

    setProcessing(true);
    try {
      const allReq = JSON.parse(localStorage.getItem("requests_db") || "[]");
      const updatedReq = allReq.map((r) =>
        String(r.id) === String(req.id)
          ? { ...r, status: "sent", updatedAt: new Date().toISOString() }
          : r
      );
      localStorage.setItem("requests_db", JSON.stringify(updatedReq));

      const donasiIds = donasiList.map((d) => String(d.id));
      setRequests(updatedReq.filter((r) => donasiIds.includes(String(r.donasiId))));

      alert("Permintaan ditandai sebagai dikirim. Penerima dapat menandai selesai setelah menerima barang.");
    } finally {
      setProcessing(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      pakaian: "👕",
      elektronik: "💻",
      buku: "📚",
      mainan: "🧸",
      perabotan: "🛋️",
      lainnya: "📦",
    };
    return icons[category?.toLowerCase()] || "📦";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Memuat permintaan...</p>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Kelola Permintaan</h1>
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="text-5xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Permintaan</h3>
          <p className="text-gray-600">Belum ada permintaan masuk untuk donasi Anda.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Permintaan Masuk</h1>

      <div className="grid gap-4">
        {requests.map((req) => {
          const donasi = donasiList.find((d) => String(d.id) === String(req.donasiId));
          return (
            <div
              key={req.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 flex-shrink-0">
                  {donasi?.image ? (
                    <img
                      src={donasi.image}
                      alt={donasi.nama}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center text-5xl">
                      {getCategoryIcon(donasi?.kategori)}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="font-bold text-xl mb-3 text-gray-900">
                    {donasi?.nama || "Barang tidak ditemukan"}
                  </h2>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiPackage className="text-blue-500" />
                      <span>
                        Diminta: <span className="font-semibold">{req.jumlahDiminta} pcs</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiUser className="text-blue-500" />
                      <span>
                        Dari: <span className="font-semibold">{req.asalPenerima}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiMapPin className="text-blue-500" />
                      <span className="line-clamp-1">{donasi?.lokasi}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiClock className="text-blue-500" />
                      <span>
                        {new Date(req.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {req.deskripsiPermintaan && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">{req.deskripsiPermintaan}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAccept(req)}
                          disabled={processing}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                        >
                          Terima
                        </button>
                        <button
                          onClick={() => handleReject(req)}
                          disabled={processing}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                        >
                          Tolak
                        </button>
                      </>
                    )}

                    {req.status === "accepted" && (
                      <button
                        onClick={() => handleSend(req)}
                        disabled={processing}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        Tandai Dikirim
                      </button>
                    )}

                    {req.status === "sent" && (
                      <span className="px-4 py-2 rounded-xl bg-yellow-100 text-yellow-800 font-semibold">
                        Menunggu Konfirmasi Penerima
                      </span>
                    )}

                    {req.status === "rejected" && (
                      <span className="px-4 py-2 rounded-xl bg-red-100 text-red-700 font-semibold">
                        Ditolak
                      </span>
                    )}

                    {req.status === "completed" && (
                      <span className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-semibold">
                        Selesai
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KelolaDonasi;