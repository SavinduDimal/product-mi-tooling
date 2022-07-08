import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { DonutLarge, NavigateNext } from "@material-ui/icons";
import Link from '@material-ui/core/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function RegistryBreadCrumbs(props) {
    const { registryPath, handleBreadCrumbClick } = props;
    const classes = useStyles();
    const pathArray = (registryPath.split("/")).map((el,index) => [el,index])

  return (
    <div role="presentation">
      <Breadcrumbs className={classes.breadcrumbs} maxItems={4} itemsAfterCollapse={2} aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
        {pathArray.map(pathComponent => <BreadCrumbItems pathComponent={pathComponent} pathArray={pathArray} handleBreadCrumbClick={handleBreadCrumbClick} />)}
      </Breadcrumbs>
    </div>
  );
}

function BreadCrumbItems(props) {
    const { pathComponent, pathArray, handleBreadCrumbClick } = props;
    const index = pathArray.indexOf(pathComponent);
    if (index !== (pathArray.length-1)){
        return <Link underline="hover" color="inherit" component={"button"} onClick={() => handleBreadCrumbClick(index, pathArray)}>{pathComponent[0]}</Link>
    } else {
        return <Typography color="text.primary">{pathComponent[0]}</Typography>
    }
}

const useStyles = makeStyles((theme) => ({
  breadcrumbs : {
      // backgroundColor: '#E0E0E0',
      width: '100%',
      color: '0000',
      padding: '2px',
      fontSize: 5,
      borderBottom: 'none',
      marginBottom: theme.spacing(2)
  },
  drawerPaper: {
      backgroundColor: '#fff',
  },
}));