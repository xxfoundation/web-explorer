import { gql, OperationVariables, TypedDocumentNode } from '@apollo/client';

export type SearchTypes = 'all' | 'blocks' | 'event'; //| 'extrinsics' | 'account';

const SEARCH_BLOCKS = gql`
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

const SEARCH_ALL = gql`
  query AllByPK($blockNumber: bigint!) {
    entity: blockchain_blocks_by_pk(block_number: $blockNumber) {
      id: block_number
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

  if (option === 'event') {
    return [
      SEARCH_EVENTS,
      (searchInput: string) => {
        const [blockNumber, eventId] = searchInput.split('-');
        return { variables: { blockNumber: Number(blockNumber), eventId: Number(eventId) } };
      }
    ];
  }

  return [
    SEARCH_ALL,
    (searchInput: string) => ({
      variables: {
        blockNumber: Number(searchInput)
      }
    })
  ];
};
