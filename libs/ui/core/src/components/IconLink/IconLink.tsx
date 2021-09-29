import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { useTranslation } from 'react-i18next';

export interface IconLinkProps {
  icon: typeof SvgIcon;
  url: string;
  text?: string;
  translateKey?: string;
  handleNavigate: (url: string) => void;
}

const StyledIconLink = styled.div`
  color: #f6efff;
`;

export const IconLink = ({
  icon: Icon,
  url,
  text,
  translateKey,
  handleNavigate,
}: IconLinkProps) => {
  const { t } = useTranslation();
  return (
    <StyledIconLink>
      <Button
        style={{ color: 'white' }}
        variant={'text'}
        endIcon={<Icon color={'secondary'} />}
        onClick={() => handleNavigate(url)}
      >
        {text ?? (translateKey && t(translateKey))}
      </Button>
    </StyledIconLink>
  );
};

export default IconLink;
