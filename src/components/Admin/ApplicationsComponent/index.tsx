import { User } from 'libs/types/user';
import { useEffect, useState } from 'react';
import getAllApplicationsToObject from 'utils/apimiddlewareAdmin/getAllApplicationsToObject';
import { useTranslation } from 'next-i18next';
import approveCreditCardApplication from 'utils/apimiddlewareAdmin/approveCreditCardApplication';
import rejectCreditCardApplication from 'utils/apimiddlewareAdmin/rejectCreditCardApplication';

export default function (props) {
  const { t } = useTranslation('admin');
  const [searchApplication, setSearchApplication] = useState('');
  const [cardLimit, setCardLimit] = useState<string>('');
  let applications = props?.applications;

  const handleApplicationSearch = (e) => {
    setSearchApplication(e.target.value);
  };
  const applicationFilteredList = applications?.filter((application) =>
    application?.firstName
      .toLowerCase()
      .includes(searchApplication.toLowerCase())
  );
  const handleLimitChange = (e) => {
    setCardLimit(e?.target?.value);
  };

  const handleApproveButtonClick = async (id) => {
    let resp = await approveCreditCardApplication(localStorage.getItem('token'),id,5000)
    if(resp.success){
      //if successfull remove row from table
      let res = await getAllApplicationsToObject(localStorage.getItem('token'))
      applications = res?.allApplications
    }
    console.log(resp)
  }

  const handleRejectButtonClick = async (id) =>{
    let resp = await rejectCreditCardApplication(localStorage.getItem('token'), id)
    if(resp.success){
      let res = await getAllApplicationsToObject(localStorage.getItem('token'))
      applications = res?.allApplications
    }
    console.log(resp)
  }

  return (
    <div key="applicationsss" className="relative h-full w-full">
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
      <table className="w-full shadow-3xl rounded-[12px] bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">{t('ApplicationId')}</th>
            <th className="p-4 text-left">{t('ApplicationFirstName')}</th>
            <th className="p-4 text-left">{t('ApplicationLastName')}</th>
            <th className="p-4 text-left">{t('ApplicationEmail')}</th>
            <th className="p-4 text-left">{t('ApplicationUserSince')}</th>
            <th className="p-4 text-left">{t('ApplicationTotalAssetValue')}</th>
            <th className="p-4 text-left">{t('ApplicationApprove')}</th>
            <th className="p-4 text-left">{t('ApplicationReject')}</th>
            <th className="p-4 text-left">{t('ApplicationCardLimit')}</th>
          </tr>
        </thead>
        <tbody>
          {applicationFilteredList?.map((application) => (
            <tr key={application.id}>
              <td className="p-4">{application?.id}</td>
              <td className="p-4">{application?.firstName}</td>
              <td className="p-4">{application?.lastName}</td>
              <td className="p-4">{application?.email}</td>
              <td className="p-4">
                {String(application.userSince).split('T')[0]}
              </td>
              <td className="p-4">{application?.totalAssetValueInTRY}</td>
              <td className="p-4">
                <button
                  className="px-4 py-2 mr-2 text-sm font-medium text-white bg-green rounded-md hover:bg-green-600"
                  onClick={(e) =>handleApproveButtonClick(application?.id)}
                >
                  Onayla
                </button>
              </td>
              <td className="p-4">
                <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={(e) => handleRejectButtonClick(application?.id)}
                >
                  Reddet
                </button>
              </td>
              <td className="p-4">
                <input
                  type="text"
                  className="w-20 p-2 border rounded-md"
                  value={cardLimit}
                  onChange={handleLimitChange}
                  // Limiti kredi kartına atamak için gerekli işlemleri buraya ekleyin
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
