import React, { FC } from 'react';
import {
  styled,
  Paper,
  Table,
  TableCell as MuiCell,
  TableBody,
  TableRow as SummaryEntry,
  Skeleton,
} from '@mui/material';

const PaperStyled = styled(Paper)({
  overflow: 'hidden',
  borderRadius: '33px'
});

const TableStyled = styled(Table)(({ theme }) => ({
  tableLayout: 'fixed',
  borderCollapse: 'collapse',
  '& tr:first-child td': {
    [theme.breakpoints.up('md')]: {
      paddingTop: '4rem'
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: '2rem'
    }
  },
  '& tr:last-child td': {
    [theme.breakpoints.up('md')]: {
      paddingBottom: '4rem'
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: '2rem'
    }
  }
}));

export const SummaryContainer: FC = ({ children }) => (
  <PaperStyled>
    <TableStyled size='medium'>
      <TableBody>{children}</TableBody>
    </TableStyled>
  </PaperStyled>
);

export { TableRow as SummaryEntry } from '@mui/material';

export const SummaryValue = styled(MuiCell)(({ theme }) => ({
  ...theme.typography.body1,
  [theme.breakpoints.up('sm')]: {
    paddingLeft: '2rem',
    paddingRight: '2rem'
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: '4rem',
    paddingRight: '4rem'
  },
  border: 'none',
  fontWeight: 400
}));

export const SummaryHeader = styled(SummaryValue)(({ theme }) => ({
  width: '6rem',
  color: theme.palette.grey[700],
  fontWeight: 500,
  backgroundColor: theme.palette.grey[100],
  borderRight: `1px solid  ${theme.palette.grey[200]}`,
  textTransform: 'uppercase'
}));

export const SummaryLoader: FC<{ number: number }> = ({ number }) => {
  return (
    <SummaryContainer>
      {Array.from(Array(number).keys()).map((Row, index) => {
        return (
          <SummaryEntry key={index}>
            <SummaryHeader>
              <Skeleton />
            </SummaryHeader>
            <SummaryValue>
              <Skeleton />
            </SummaryValue>
          </SummaryEntry>
        );
      })}
    </SummaryContainer>
  );
};

export { default as WithCopy } from './WithCopy';
