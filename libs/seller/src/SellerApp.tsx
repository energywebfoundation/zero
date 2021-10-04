import { LayoutWithTopbarContainer, NotFoundPage } from "@energyweb/zero-ui-core"
import { FC } from "react"
import { Route, Routes } from "react-router"
import { AddFacilitiesPage, SellerLandingPage } from "./pages"

interface SellerAppProps {
  isAuthenticated: boolean;
}

export const SellerApp: FC<SellerAppProps> = ({ isAuthenticated }) => {
  return (
    <LayoutWithTopbarContainer bgColor="#F6F3F9">
      <Routes>
        <Route path="/" element={<SellerLandingPage />} />
        <Route path="/add-facilities" element={<AddFacilitiesPage />} />
        <Route
          path="*"
          element={
            <NotFoundPage
              isAuthenticated={isAuthenticated}
              nonAuthenticatedHomeRoute={'/'}
              authenticatedHomeRoute={'/seller'}
            />
          }
        />
      </Routes>
    </LayoutWithTopbarContainer>

  )
}
