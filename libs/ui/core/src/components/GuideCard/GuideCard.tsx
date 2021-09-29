import styled from '@emotion/styled';
import { Box, Button, Paper, SvgIcon, Typography } from '@material-ui/core';
import { ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './GuideCard.styles';

export interface GuideCardProps {
  topIcon: ElementType;
  btnIcon: ElementType;
  btnText: string;
  headText: string;
  subHeadText: string;
  disabled?: boolean;
  disabledInfoText?: string;
  handleButtonClick?: () => void;
}

const StyledGuideCardPaper = styled(Paper)`
  padding: 30px 15px;
  width: 248px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  position: relative;
`;

export const GuideCard = (props: GuideCardProps) => {
  const styles = useStyles(props);
  const {
    headText,
    subHeadText,
    btnText,
    topIcon,
    btnIcon,
    disabled,
    disabledInfoText,
    handleButtonClick,
  } = props;
  const { t } = useTranslation();

  return (
    <>
      <StyledGuideCardPaper>
        {disabled && <div className={styles.disabledOverlay} />}
        <Box>
          <div className={styles.iconBox}>
            <SvgIcon component={topIcon} />
          </div>
          <Typography
            textAlign={'center'}
            fontWeight={700}
            color={'primary'}
            variant={'h5'}
          >
            {t(headText)}
          </Typography>
          <Typography
            variant={'body1'}
            color={'primary'}
            textAlign={'center'}
            mt={'20px'}
          >
            {t(subHeadText)}
          </Typography>
        </Box>
        <Box width={'100%'} mt={'0'} px={'25px'}>
          <Button
            onClick={handleButtonClick}
            fullWidth
            style={{ height: '48px', fontWeight: 700, fontSize: '16px' }}
            variant={'contained'}
            endIcon={<SvgIcon component={btnIcon} />}
          >
            {t(btnText)}
          </Button>
        </Box>
      </StyledGuideCardPaper>
      {disabled && (
        <Typography
          my={'20px'}
          color={'primary'}
          lineHeight={'15px'}
          fontWeight={600}
          fontSize={'12px'}
        >
          {t(disabledInfoText ?? '')}
        </Typography>
      )}
    </>
  );
};

export default GuideCard;
