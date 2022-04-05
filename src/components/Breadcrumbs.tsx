import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, styled, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { theme } from '../themes/default';
import Link from './Link';

type ParamsType = { params: Record<string, string | number> };

const CustomLink = styled(Link, {
  name: 'BreadCrumbLink'
})({
  textDecorationLine: 'none',
  color: '#7A7A7A', // TODO use a value from theme
  fontWeight: 400,
  fontSize: 12,
  ':hover': {
    color: theme.palette.primary.main,
    textDecorationLine: 'none'
  }
});

const truncateCrumb = (text: string) =>
  text.length > 15 ? `${text.slice(0, 4)}...${text.slice(-4)}` : text;

const blockchainHome = () => (
  <CustomLink to='/' fontWeight={700}>
    <Typography fontWeight={700}>Blockchain</Typography>
  </CustomLink>
);
const blockNumber = ({ params: { number } }: ParamsType) => (
  <CustomLink to={`/blocks/${number}`}>
    <Typography>{truncateCrumb(number.toString())}</Typography>
  </CustomLink>
);

const pathMapper: Record<string, React.FC<ParamsType>> = {
  blocks: blockchainHome,
  producer: blockNumber,
  version: blockNumber,
  extrinsics: blockchainHome,
  transfers: blockchainHome,
  events: blockchainHome
};

const paramsMapper: Record<string, React.FC<ParamsType>> = {
  'number:2': () => (
    <CustomLink to='/blocks' underline='hover'>
      <Typography>Blocks</Typography>
    </CustomLink>
  ),
  'module:5': ({ params: { number, version } }) => (
    <CustomLink to={`/blocks/${number}/version/${version}`} underline='hover'>
      <Typography>{`Spec ${truncateCrumb(version.toString())}`}</Typography>
    </CustomLink>
  ),
  'extrinsics:2': () => (
    <CustomLink to='/extrinsics' underline='hover'>
      <Typography>Extrinsics</Typography>
    </CustomLink>
  ),
  'accountId:2': ({ params: { accountId } }) => (
    <CustomLink to={`/accounts/${accountId}`} underline='hover'>
      <Typography>Accounts</Typography>
    </CustomLink>
  )
};

const defineKeyFromPath = (pathPart?: string) => {
  if (pathPart && Object.keys(pathMapper).includes(pathPart)) {
    return pathPart;
  }
};

const defineKeyFromParams = (params: ParamsType['params'], index: number) => {
  for (const name in params) {
    const crumbKey = `${name}:${index}`;
    if (Object.keys(paramsMapper).includes(crumbKey)) {
      return crumbKey;
    }
  }
};

const Breadcrumb: React.FC = () => {
  const params = useParams();
  const { pathname } = useLocation();

  const crumbs = React.useCallback(() => {
    const pathParts = pathname.split('/');
    const root: JSX.Element[] = [];
    pathParts.forEach((pathPart, index) => {
      const crumbKey = defineKeyFromPath(pathPart) || defineKeyFromParams(params, Number(index));
      if (crumbKey) {
        const BreadCrumb = pathMapper[crumbKey] || paramsMapper[crumbKey];
        root.push(<BreadCrumb params={params} />);
      }
    });
    return root;
  }, [pathname, params]);

  return <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>{crumbs()}</Breadcrumbs>;
};

export default Breadcrumb;
