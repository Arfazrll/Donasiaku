import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyDonasi } from "../../services/donasiService";
import Card from "../../components/ui/Card";

const DaftarDonasi = () => {
  const [donasi, setDonasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonasi = async () => {
      try {
        const data = await getMyDonasi();
        setDonasi(data);
      } catch (error) {
        console.error("Gagal mengambil data donasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonasi();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Memuat data donasi...</p>;
  }

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-semibold mb-4">Daftar Donasi Saya</h1>

      {donasi.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">
          Anda belum memiliki donasi yang aktif.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {donasi.map((item) => (
            <Card key={item.id} className="shadow-md">
              <div className="p-4">
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                  {item.kategori || "Kategori"}
                </span>

                <h2 className="font-semibold text-lg mt-2">{item.nama}</h2>

                <p className="text-sm text-gray-600">
                  {item.deskripsi || "-"}
                </p>

                <p className="text-sm mt-2">
                  <strong>Jumlah:</strong> {item.jumlah} pcs
                </p>

                <p className="text-sm">
                  <strong>Lokasi:</strong> {item.lokasi}
                </p>

                <p className="text-sm">
                  <strong>Tanggal:</strong> {new Date(item.created_at).toLocaleDateString('id-ID')}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 px-3 py-2 bg-blue-50 text-[#007EFF] font-semibold rounded-xl hover:bg-blue-100 transition-all"
                    onClick={() => navigate(`/donasi/edit/${item.id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DaftarDonasi;