import { useEffect, useState } from 'react';
import getAllApplicationsToObject from 'utils/apimiddlewareAdmin/getAllApplicationsToObject';
import { useTranslation } from 'next-i18next';
import approveCreditCardApplication from 'utils/apimiddlewareAdmin/approveCreditCardApplication';
import rejectCreditCardApplication from 'utils/apimiddlewareAdmin/rejectCreditCardApplication';
import { AdminApplication } from 'libs/types/adminApplication';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { CreditCard } from 'react-feather';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ApplicationsList(props) {
  const { t } = useTranslation('admin');
  const [searchApplication, setSearchApplication] = useState('');
  const [cardLimit, setCardLimit] = useState("");
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllApplicationsToObject(
          localStorage.getItem('token')
        );
        if (res?.allApplications && res.allApplications.length > 0) {
          setApplications(res.allApplications);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApplicationSearch = (e) => {
    setSearchApplication(e.target.value);
  };

  const applicationFilteredList = applications?.filter((application) =>
    application?.firstName
      .toLowerCase()
      .includes(searchApplication.toLowerCase())
  );

  const handleLimitChange = (e) => {
    setCardLimit(e.target.value);
  };

  const handleApproveButtonClick = async (id) => {
    const resp = await approveCreditCardApplication(
      localStorage.getItem('token'),
      id,
      parseInt(cardLimit)
    );
    if (resp.success) {
      // After approving the application, update the table
      const res = await getAllApplicationsToObject(
        localStorage.getItem('token')
      );
      setApplications(res?.allApplications);
    }
    console.log(resp);
  };

  const handleRejectButtonClick = async (id) => {
    const resp = await rejectCreditCardApplication(
      localStorage.getItem('token'),
      id
    );
    if (resp.success) {
      // After rejecting the application, update the table
      const res = await getAllApplicationsToObject(
        localStorage.getItem('token')
      );
      setApplications(res?.allApplications);
    }
    console.log(resp);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div key="applicationsss" className="relative h-full w-[1600px]">
      <h2 className="text-2xl font-bold">Bekleyen Başvurular</h2>
      <div className="flex justify-end items-center mb-8 ">
        <input
          type="text"
          placeholder="Ara..."
          value={searchApplication}
          onChange={handleApplicationSearch}
          className="px-4 py-2 border w-full rounded-[12px]"
        />
      </div>
      {applications.length > 0 ? (
        <TableContainer className="shadow-3xl" component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{t('ApplicationId')}</StyledTableCell>
                <StyledTableCell align="right">
                  {t('ApplicationFirstName')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {t('ApplicationLastName')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {t('ApplicationEmail')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {t('ApplicationUserSince')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {t('ApplicationTotalAssetValue')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {t('ApplicationApprove')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {t('ApplicationReject')}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {t('ApplicationCardLimit')}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationFilteredList?.map((application) => (
                <StyledTableRow key={application.id}>
                  <StyledTableCell component="th" scope="row">
                    {application?.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {application?.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {application?.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {application?.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {String(application.userSince).split('T')[0]}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {application?.totalAssetValueInTRY}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      className="px-4 py-2 mr-2 text-sm font-medium text-white bg-green rounded-md hover:bg-green-600"
                      onClick={() => handleApproveButtonClick(application?.id)}
                    >
                      {t('Approve')}
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      className="px-4 py-2 mr-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                      onClick={() => handleRejectButtonClick(application?.id)}
                    >
                      {t('Reject')}
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <input
                      type="text"
                      className="w-20 p-2 border rounded-md"
                      value={cardLimit}
                      onChange={handleLimitChange}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>No applications found.</div>
      )}
    </div>
  );
}
