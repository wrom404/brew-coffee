import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Page"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App