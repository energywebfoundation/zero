import { makeStyles } from "@material-ui/styles";
import { variables } from '@energyweb/zero-ui-theme';


export const useStyles = makeStyles({
  infoBlock: {
    backgroundColor: variables.bodyBackgroundColor,
    padding: '24px',
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
    borderRadius: '10px',
    height:'100%',
    maxHeight:'320px'
  },
  formBlock: {
    backgroundColor: variables.bodyBackgroundColor,
    padding: '24px',
    boxShadow: '0px 4px 10px rgba(160, 154, 198, 0.2)',
    borderRadius: '10px',
    height:'128px'
  },
  footerBlock:{
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2300D08AFF' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='23' stroke-linecap='square'/%3e%3c/svg%3e");border-radius: 10px`,
    borderRadius: '5px',
    backgroundColor: variables.bodyBackgroundColor,
  }
});
