

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { FC } from 'react';
import { useLocation, useParams, Params } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BreadcrumbStyled, CustomLink } from './Breadcrumb.styled';

type ParamsType = { params: Readonly<Params> };

const truncateCrumb = (text = '') =>
  text.length > 15 ? `${text?.slice(0, 4)}...${text.slice(-4)}` : text;

const BlockchainHome: React.FC<ParamsType> = () => {
  const { t } = useTranslation();

  return (
    <CustomLink to='/'>{t('Blockchain')}</CustomLink>
  )
};

const BlockNumber: FC<ParamsType> = ({ params: { number } }: ParamsType) => (
  <CustomLink to={`/blocks/${number}`}>{truncateCrumb(number?.toString())}</CustomLink>
);

const crumbRoutes: Record<string, React.FC<ParamsType>> = {
  blocks: BlockchainHome,
  version: BlockNumber,
  extrinsics: BlockchainHome,
  transfers: BlockchainHome,
  events: BlockchainHome
};

const crumbSplats: Record<string, React.FC<ParamsType>> = {
  'numberOrHash:2': () => (
    <CustomLink to='/blocks' underline='hover'>
      Blocks
    </CustomLink>
  ),
  'module:5': ({ params: { number, version } }) => (
    <CustomLink to={`/blocks/${number}/version/${version}`} underline='hover'>
      {`Spec ${truncateCrumb(version?.toString())}`}
    </CustomLink>
  ),
  'extrinsicId:2': () => (
    <CustomLink to='/extrinsics' underline='hover'>
      Extrinsics
    </CustomLink>
  ),
  'accountId:2': () => (
    <CustomLink to={'/accounts/'} underline='hover'>
      Accounts
    </CustomLink>
  ),
  'accountId:4': ({ params: { numberOrHash } }) => (
    <CustomLink to={`/blocks/${numberOrHash}`} underline='hover'>
      Block #{`${numberOrHash?.toString()}`}
    </CustomLink>
  )
};

const defineKeyFromPath = (pathPart?: string) => {
  if (pathPart && Object.keys(crumbRoutes).includes(pathPart)) {
    return pathPart;
  }
};

const defineKeyFromParams = (params: ParamsType['params'], index: number) => {
  for (const name in params) {
    const crumbKey = `${name}:${index}`;
    if (Object.keys(crumbSplats).includes(crumbKey)) {
      return crumbKey;
    }
  }
};

const Breadcrumb: React.FC = () => {
  const params = useParams();
  const { pathname } = useLocation();

  const crumbs = React.useMemo(() => {
    const pathParts = pathname.split('/');
    const root: JSX.Element[] = [];
    pathParts.forEach((pathPart, index) => {
      const crumbKey = defineKeyFromPath(pathPart) || defineKeyFromParams(params, Number(index));
      if (crumbKey) {
        const BreadCrumb = crumbRoutes[crumbKey] || crumbSplats[crumbKey];
        root.push(<BreadCrumb params={params} key={index} />);
      }
    });
    return root;
  }, [pathname, params]);

  return (
    <BreadcrumbStyled separator={<NavigateNextIcon fontSize='small' />}>{crumbs}</BreadcrumbStyled>
  );
};

export default Breadcrumb;
