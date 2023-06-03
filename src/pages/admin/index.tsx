import { useEffect, useState } from 'react';
import Navbar from 'components/Navbar';

const AdminPage = () => {
  const [currentUser, setCurrentUser] = useState({ role: 'admin' });
  const [searchUser, setSearchUser] = useState('');
  const [searchApplication, setSearchApplication] = useState('');

  useEffect(() => {}, []);

  const requireAdmin = () => {
    if (currentUser.role !== 'admin') {
      return (
        <div>
          <p>Admin sayfasına erişim izniniz yok.</p>
        </div>
      );
    }

    const handleUserSearch = (e) => {
      setSearchUser(e.target.value);
    };

    const handleApplicationSearch = (e) => {
      setSearchApplication(e.target.value);
    };

    // Örnek kullanıcılar ve başvurular verileri
    const users = [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        identificationString: '1234567890',
        userSince: '2022-01-01',
        limit: 1000,
        totalAssetValueInTRY: 50000,
      },
      // Diğer kullanıcılar
    ];

    const applications = [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        identificationString: '1234567890',
        userSince: '2022-01-01',
        limit: 1000,
        totalAssetValueInTRY: 50000,
      },
      // Diğer başvurular
    ];

    const userFilteredList = users.filter((user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase())
    );

    const applicationFilteredList = applications.filter((application) =>
      application.name.toLowerCase().includes(searchApplication.toLowerCase())
    );

    return (
      <>
        <Navbar />
        <div className="p-20 dark:bg-slate-900 flex ">
          <div>
            <div className="p-20 mt-32 ">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Kullanıcılar</h2>
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchUser}
                  onChange={handleUserSearch}
                  className="px-4 py-2 border rounded-[12px]"
                />
              </div>
              <table className="min-w-[1400px] shadow-3xl rounded-[12px] bg-white border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Ad</th>
                    <th className="p-4 text-left">Soyad</th>
                    <th className="p-4 text-left">E-posta</th>
                    <th className="p-4 text-left">userSince</th>
                    <th className="p-4 text-left">totalAssetValueInTRY</th>
                    <th className="p-4 text-left">Limit</th>
                    <th className="p-4 text-left">Başvuru</th>
                  </tr>
                </thead>
                <tbody>
                  {userFilteredList.map((user) => (
                    <tr key={user.id}>
                      <td className="p-4">{user.id}</td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.surname}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.userSince}</td>
                      <td className="p-4">{user.totalAssetValueInTRY}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          className="w-20 p-2 border rounded-md"
                          value={user.limit}
                          // Limiti güncellemek için gerekli işlemleri buraya ekleyin
                        />
                      </td>
                      <td className="p-4">
                        <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                          Limit Arttır
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 rounded-[12px]">
                <h2 className="text-2xl font-bold">Bekleyen Başvurular</h2>
                <div className="flex justify-end items-center mb-8">
                  <input
                    type="text"
                    placeholder="Ara..."
                    value={searchApplication}
                    onChange={handleApplicationSearch}
                    className="px-4 py-2 border rounded-[12px]"
                  />
                </div>
                <table className="min-w-[1400px] shadow-3xl rounded-[12px] bg-white border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 text-left">ID</th>
                      <th className="p-4 text-left">Ad</th>
                      <th className="p-4 text-left">Soyad</th>
                      <th className="p-4 text-left">E-posta</th>
                      <th className="p-4 text-left">userSİnce</th>
                      <th className="p-4 text-left">totalAssetValueInTRY</th>
                      <th className="p-4 text-left">Onayla</th>
                      <th className="p-4 text-left">Reddet</th>
                      <th className="p-4 text-left">Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationFilteredList.map((application) => (
                      <tr key={application.id}>
                        <td className="p-4">{application.id}</td>
                        <td className="p-4">{application.name}</td>
                        <td className="p-4">{application.surname}</td>
                        <td className="p-4">{application.email}</td>
                        <td className="p-4">{application.userSince}</td>
                        <td className="p-4">
                          {application.totalAssetValueInTRY}
                        </td>
                        <td className="p-4">
                          <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-green rounded-md hover:bg-green-600">
                            Onayla
                          </button>
                        </td>
                        <td className="p-4">
                          <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600">
                            Reddet
                          </button>
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            className="w-20 p-2 border rounded-md"
                            value={application.limit}
                            // Limiti kredi kartına atamak için gerekli işlemleri buraya ekleyin
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <div>{requireAdmin()}</div>;
};

export default AdminPage;
