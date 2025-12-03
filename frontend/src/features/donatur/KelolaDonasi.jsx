import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import Card from "../../components/ui/Card";
import { getAuthData } from "../../utils/localStorage";
import { getMyDonasi, updateDonasiService } from "../../services/donasiService";
import { getRequests, updateRequestStatus } from "../../utils/localStorage";

const KelolaDonasi = () => {
  const user = getAuthData();
  const [donasiList, setDonasiList] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user || !user.id) return;

        const myDonasi = await getMyDonasi();
        if (mounted) {
          setDonasiList(myDonasi || []);

          const allReq = getRequests();
          const donasiIds = (myDonasi || []).map(d => String(d.id));
          const incoming = allReq.filter(r => donasiIds.includes(String(r.donasiId)));
          setRequests(incoming);
        }
      } catch (err) {
        console.error('Gagal mengambil data kelola donasi', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [user]);

  const handleAccept = async (req) => {
    const confirmAccept = window.confirm('Terima permintaan ini dan kurangi jumlah donasi?');
    if (!confirmAccept) return;

    const donasi = donasiList.find(d => String(d.id) === String(req.donasiId));
    if (!donasi) {
      alert('Donasi tidak ditemukan.');
      return;
    }

    const newJumlah = Math.max(0, Number(donasi.jumlah) - Number(req.jumlahDiminta));

    try {
      await updateDonasiService(donasi.id, { jumlah: newJumlah });

      updateRequestStatus(req.id, 'accepted');

      const allReq = getRequests();
      const donasiIds = donasiList.map(d => String(d.id));
      setRequests(allReq.filter(r => donasiIds.includes(String(r.donasiId))));

      const refreshed = await getMyDonasi();
      setDonasiList(refreshed || []);

      alert('Permintaan diterima. Jumlah donasi diperbarui.');
    } catch (err) {
      console.error(err);
      alert('Gagal memproses permintaan.');
    }
  };

  const handleReject = (req) => {
    const confirmReject = window.confirm('Tolak permintaan ini?');
    if (!confirmReject) return;

    updateRequestStatus(req.id, 'rejected');
    const allReq = getRequests();
    const donasiIds = donasiList.map(d => String(d.id));
    setRequests(allReq.filter(r => donasiIds.includes(String(r.donasiId))));
    alert('Permintaan telah ditolak.');
  };

  const handleSend = (req) => {
    const confirmSend = window.confirm('Tandai permintaan ini sebagai sudah dikirim/diambil?');
    if (!confirmSend) return;

    updateRequestStatus(req.id, 'sent');

    const allReq = getRequests();
    const donasiIds = donasiList.map(d => String(d.id));
    setRequests(allReq.filter(r => donasiIds.includes(String(r.donasiId))));

    alert('Permintaan ditandai sebagai dikirim. Penerima dapat menandai selesai setelah menerima barang.');
  };

  if (loading) {
    return <p className="text-center text-gray-500 py-12">Memuat permintaan...</p>;
  }

  if (requests.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Kelola Permintaan</h1>
        <p className="text-gray-600">Belum ada permintaan masuk untuk donasi Anda.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Permintaan Masuk</h1>

      <div className="grid gap-4">
        {requests.map((req) => {
          const donasi = donasiList.find(d => String(d.id) === String(req.donasiId));
          return (
            <Card key={req.id} className="p-4 flex items-center gap-4">
              <div className="w-20 h-20">
                {donasi?.image ? (
                  <img src={donasi.image} alt={donasi.nama} className="w-20 h-20 object-cover rounded-lg" />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">No Image</div>
                )}
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{donasi?.nama || 'Barang tidak ditemukan'}</h2>
                <p className="text-sm text-gray-600">Diminta: {req.jumlahDiminta} | Dari: {req.asalPenerima}</p>
                <p className="text-sm text-gray-500 mt-2">{req.deskripsiPermintaan}</p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="text-gray-500 text-sm flex items-center gap-2">
                  <FiClock />
                  {new Date(req.createdAt).toLocaleString('id-ID')}
                </div>
                <div className="flex gap-2">
                  {req.status === 'pending' && (
                    <>
                      <button onClick={() => handleAccept(req)} className="px-3 py-1 bg-green-500 text-white rounded">Terima</button>
                      <button onClick={() => handleReject(req)} className="px-3 py-1 bg-red-500 text-white rounded">Tolak</button>
                    </>
                  )}

                  {req.status === 'accepted' && (
                    <button onClick={() => handleSend(req)} className="px-3 py-1 bg-blue-600 text-white rounded">Kirim</button>
                  )}

                  {req.status === 'sent' && (
                    <span className="px-3 py-1 rounded bg-yellow-100 text-yellow-800">Dikirim</span>
                  )}

                  {req.status !== 'pending' && req.status !== 'accepted' && req.status !== 'sent' && (
                    <span className={`px-3 py-1 rounded ${req.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{req.status}</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default KelolaDonasi;