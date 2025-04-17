import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import VerifyCodePage from "./pages/VerifyCodePage"
import LearnPage from "./pages/LearnPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ServicesPage from "./pages/ServicesPage"
import PageNotFoundPage from "./pages/PageNotFoundPage"
import CredentialPage from "./pages/CredentialPage"
import CreateBlogPage from "./pages/dashboard/CreateBlogPage"
import ExplorePage from "./pages/dashboard/ExplorePage"
import AdminLayout from "./components/AdminDashboard/AdminLayout"
import { MyPost } from "./pages/dashboard/MyPost"
import AnalyticsPage from "./pages/dashboard/AnalyticsPage"
import BlogDetailsPage from "./pages/BlogDetailsPage"
import EditBlogPage from "./pages/dashboard/EditBlogPage"
import SettingPage from "./pages/dashboard/SettingPage"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-code" element={<VerifyCodePage />} />
        <Route path="/credential" element={<CredentialPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage/>}/>
        {/* Admin/Dashboard Routes */}
        <Route path="/dashboard" element={<ExplorePage/>}/>
        <Route path="/dashboard/new-post" element={<CreateBlogPage />} />
          <Route path="/dashboard/explore" element={<ExplorePage />} />
          <Route path="/dashboard/my-posts" element={<MyPost />} />
          <Route path="dashboard/analytics" element={<AnalyticsPage/>}/>
          <Route path="/dashboard/blog/edit/:id"element={<EditBlogPage/>}/>
          <Route path="/dashboard/settings"element={<SettingPage/>}/>
        {/* Catch-all 404 page */}
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
