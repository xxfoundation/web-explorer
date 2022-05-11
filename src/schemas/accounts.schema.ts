import { gql } from '@apollo/client';

export type FindAccountByAddressType = {
  accounts?: [
    {
      address: string;
    }
  ];
};

export const FIND_ACCOUNT_BY_ADDRESS = gql`
  query SearchAccounts($where: accounts_bool_exp) {
    accounts(where: $where) {
      address
    }
  }
`;
