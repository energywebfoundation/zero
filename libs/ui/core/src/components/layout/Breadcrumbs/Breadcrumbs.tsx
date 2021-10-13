import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@material-ui/core';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './Breadcrumbs.styles';

export type BreadcrumbItem = {
  name: string;
  url?: string;
}

interface BreadcrumbsProps {
  breadcrumbsList: BreadcrumbItem[]
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbsList }) => {
  const classes = useStyles();
  return (
    <MuiBreadcrumbs separator=">">
      {breadcrumbsList.map((item) => {
            if (!item.url) return (
            <Typography key={item.name} color="#703CBB">
              {item.name}
            </Typography>)

            return (
            <Link key={item.name} to={item.url} className={classes.link}>
              {item.name}
            </Link>)
          })}
    </MuiBreadcrumbs>
  )
}
