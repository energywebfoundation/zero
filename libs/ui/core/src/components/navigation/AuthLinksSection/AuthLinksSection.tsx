import { PersonOutline } from "@material-ui/icons";
import { FC } from "react";
import { IconLink } from "../../layout";

interface AuthLinksSectionProps {
  isAuthenticated: boolean;
  handleNavigate: (url: string) => void;
}

export const AuthLinksSection: FC<AuthLinksSectionProps> = ({
  isAuthenticated, handleNavigate
}) => {
  return !isAuthenticated ? (
    <IconLink
      icon={PersonOutline}
      url={'auth/sign-in'}
      handleNavigate={handleNavigate}
      translateKey={'auth.signIn'}
    />
  ) : null;
};
