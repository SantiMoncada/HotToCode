import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import HomePage from '../pages/HomePage'
import SnippetListPage from '../pages/SnippetListPage'
import SnippetFormPage from '../pages/SnippetFormPage'
import UserProfilePage from '../pages/UserProfilePage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/snippets' element={<SnippetListPage />} />
            <Route path='/snippetForm' element={<SnippetFormPage />} />
            <Route path='/myProfile' element={<UserProfilePage />} />
        </Routes>
    )
}

export default AppRoutes