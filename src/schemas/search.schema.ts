import { gql, OperationVariables, TypedDocumentNode } from '@apollo/client';

export type SearchTypes = 'blocks' | 'events' | 'extrinsics' | 'account';

const SEARCH_BLOCKS = gql`
  query GetBlockByPK($blockNumber: bigint!) {
    entity: blockchain_blocks_by_pk(block_number: $blockNumber) {
      id: block_number
    }
  }
`;

const SEARCH_ACCOUNTS = gql`
  query GetBlockByPK($blockNumber: bigint!) {
    entity: blockchain_blocks_by_pk(block_number: $blockNumber) {
      id: block_number
    }
  }
`;

const SEARCH_EVENTS = gql`
  query Blockchain_event_by_pk($blockNumber: bigint!, $eventIndex: Int!) {
    blockchain_event_by_pk(block_number: $blockNumber, event_index: $eventIndex) {
      block_number
      event_index
    }
  }
`;

export const getSearchQuery = (
  option: SearchTypes
): [TypedDocumentNode, (searchInput: string) => OperationVariables] => {
  if (option === 'blocks') {
    return [
      SEARCH_BLOCKS,
      (searchInput: string) => ({ variables: { blockNumber: Number(searchInput) } })
    ];
  }

  if (option === 'events') {
    return [
      SEARCH_EVENTS,
      (searchInput: string) => {
        const [blockNumber, eventId] = searchInput.split('-');
        console.warn(`fukking events ${[blockNumber, eventId]}`);
        return { variables: { blockNumber: Number(blockNumber), eventId: Number(eventId) } };
      }
    ];
  }

  return [
    SEARCH_ACCOUNTS,
    (searchInput: string) => {
      throw new Error(`not implemented search ${searchInput}`);
    }
  ];
};
