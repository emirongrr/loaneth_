import { useContext, useEffect, useState } from 'react';
import Navbar from 'components/Navbar';
import { User } from 'libs/types/user';
import getAllUsersToObject from 'utils/apimiddlewareAdmin/getAllUsersToObject';
import UsersComponent from 'components/Admin/UsersComponent';
import ApplicationsComponent from 'components/Admin/ApplicationsComponent';
import getAllApplicationsToObject from 'utils/apimiddlewareAdmin/getAllApplicationsToObject';
import { UserContext } from 'contexts';
import { Loader } from 'components/Loader';

type AdminApplication = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userSince: Date;
  phoneNumber: string;
  totalAssetValueInTRY: number;
};

const AdminPage = () => {
  const { isLoading, sessionSet, currentUser }: any = useContext(UserContext);
  const [users, setUsers] = useState<User[]>();
  const [applications, setApplications] = useState<AdminApplication[]>();

  const fetchApplications = async () => {
    return getAllApplicationsToObject(localStorage.getItem('token'))
      .then()
      .then((res) => {
        if (res.success) {
          setApplications(res.allApplications);
        }
        console.log(res?.allApplications);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getAllUsersData = () => {
    return getAllUsersToObject(localStorage.getItem('token'))
      .then()
      .then((res) => {
        if (res.success) {
          setUsers(res.allUsers);
        }
        console.log(res?.allUsers);
      });
  };
  useEffect(() => {
    getAllUsersData();
  }, []);

  const requireAdmin = () => {
    if (currentUser?.role !== 'ADMIN') {
      return (
        <div>
          <p>Admin sayfasına erişim izniniz yok.</p>
        </div>
      );
    }

    const responsive = {
      desktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    return (
      <div className="">
        <Navbar />
        <div className="mt-32 m-20 h-11/12 w-11/12">
          <UsersComponent users={users}></UsersComponent>
          <ApplicationsComponent
            applications={applications}
          ></ApplicationsComponent>
        </div>
      </div>
    );
  };

  return <div>{requireAdmin()}</div>;
};

export default AdminPage;
