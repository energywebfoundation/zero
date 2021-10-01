import { Route, Routes } from "react-router"
import { BuyerLandingPage } from "./pages"

export const BuyerApp = () => {
  return (
    <Routes>
      <Route path="/" element={<BuyerLandingPage />} />
    </Routes>
  )
}
