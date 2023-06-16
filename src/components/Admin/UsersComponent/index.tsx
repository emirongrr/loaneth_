import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function UserList(props) {
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
    <div key="users" className="relative h-full w-[1600px]">
      <h2 className="text-2xl font-bold">Kullanıcılar</h2>
      <input
        type="text"
        placeholder="Ara..."
        value={searchUser}
        onChange={handleUserSearch}
        className="px-4 py-2 border justify-end w-full rounded-[12px]"
      />
      <TableContainer component={Paper} className="mt-5 shadow-3xl">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Ad</StyledTableCell>
              <StyledTableCell>Soyad</StyledTableCell>
              <StyledTableCell>E-posta</StyledTableCell>
              <StyledTableCell>phoneNumber</StyledTableCell>
              <StyledTableCell>role</StyledTableCell>
              <StyledTableCell>Limit</StyledTableCell>
              <StyledTableCell>Başvuru</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {userFilteredList?.map((user) => (
              <StyledTableRow key={user.identificationString}>
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>{user.role}</StyledTableCell>
                <StyledTableCell>
                  <input
                    type="number"
                    className="w-20 p-2 border rounded-md"
                    value={user?.cards[1]?.maxCardLimit}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    {t('ShowCards')}
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
