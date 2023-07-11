import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pegawai = () => {
  const [pegawaiList, setPegawaiList] = useState([]);
  const [pegawaiData, setPegawaiData] = useState({
    No_Pw: '',
    Nama_Pw: '',
    Jabatan: '',
    Alamat: '',
  });

  const fetchPegawai = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pegawai');
      setPegawaiList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPegawai();
  }, []);

  const handleInputChange = (e) => {
    setPegawaiData({ ...pegawaiData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const newPegawaiData = { ...pegawaiData, waktu: new Date().toISOString() };
      await axios.post('http://localhost:5000/pegawai', newPegawaiData);
      setPegawaiData({ No_Pw: '', Nama_Pw: '', Jabatan: '', Alamat: '' });
      fetchPegawai(); // Fetch new pegawai data after successful addition
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/pegawai/${id}`, pegawaiData);
      fetchPegawai();
      setPegawaiData({ No_Pw: '', Nama_Pw: '', Jabatan: '', Alamat: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/pegawai/${id}`);
      fetchPegawai();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Pegawai List</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          name="No_Pw"
          placeholder="No Pw"
          value={pegawaiData.No_Pw}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Nama_Pw"
          placeholder="Nama Pw"
          value={pegawaiData.Nama_Pw}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Jabatan"
          placeholder="Jabatan"
          value={pegawaiData.Jabatan}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="Alamat"
          placeholder="Alamat"
          value={pegawaiData.Alamat}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Pegawai</button>
      </form>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Alamat</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pegawaiList.map((pegawai) => (
            <tr key={pegawai.id}>
              <td>{pegawai.No_Pw}</td>
              <td>{pegawai.Nama_Pw}</td>
              <td>{pegawai.Jabatan}</td>
              <td>{pegawai.Alamat}</td>
              <td>
                <button onClick={(e) => handleUpdate(e, pegawai.id)}>Update</button>
                <button onClick={(e) => handleDelete(e, pegawai.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pegawai;
