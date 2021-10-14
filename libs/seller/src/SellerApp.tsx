import { NotFoundPage } from "@energyweb/zero-ui-core"
import { Container } from "@material-ui/core"
import { FC } from "react"
import { Route, Routes } from "react-router"
import { AddFacilitiesPage, SellerLandingPage } from "./pages"

interface SellerAppProps {
  isAuthenticated: boolean;
}

export const SellerApp: FC<SellerAppProps> = ({ isAuthenticated }) => {
  return (
    <Container sx={{ marginTop: '25px' }}>
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
    </Container>
  )
}
