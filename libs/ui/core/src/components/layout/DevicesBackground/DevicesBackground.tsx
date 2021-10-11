import { DevicesBackground as DevicesBackgroundSvg } from '@energyweb/zero-ui-assets';
import { ReactNode } from 'react';
import { useStyles } from './DevicesBackground.styles';

interface DevicesBackgroundProps {
  children: ReactNode;
}

export const DevicesBackground = ({ children }: DevicesBackgroundProps) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.svgBg}>
        <DevicesBackgroundSvg />
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}
