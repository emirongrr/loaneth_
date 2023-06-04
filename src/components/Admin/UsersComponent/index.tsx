import ConstructReference from 'libs/refconstructor';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';

export default function (props) {
  const { t } = useTranslation('admin');
  const [searchUser, setSearchUser] = useState('');
  const users = props?.users;

  const handleUserSearch = (e) => {
    setSearchUser(e.target.value);
  };
  const userFilteredList = users?.filter((user) =>
    user?.firstName.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div key="users" className="relative h-full w-full">
      <h2 className="text-2xl font-bold">Kullanıcılar</h2>
      <input
        type="text"
        placeholder="Ara..."
        value={searchUser}
        onChange={handleUserSearch}
        className="px-4 py-2 border rounded-[12px]"
      />
      <table className="w-full shadow-3xl rounded-[12px] bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Ad</th>
            <th className="p-4 text-left">Soyad</th>
            <th className="p-4 text-left">E-posta</th>
            <th className="p-4 text-left">phoneNumber</th>
            <th className="p-4 text-left">role</th>
            <th className="p-4 text-left">Limit</th>
            <th className="p-4 text-left">Başvuru</th>
          </tr>
        </thead>
        <tbody>
          {userFilteredList?.map((user) => (
            <tr key={user.identificationString}>
              <td className="p-4">{user.firstName}</td>
              <td className="p-4">{user.lastName}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.phoneNumber}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">
                <input type="number" className="w-20 p-2 border rounded-md" />
              </td>
              <td className="p-4">
                <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                  {t('ShowCards')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
