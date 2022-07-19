import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import HomePage from '../pages/HomePage/HomePage'
import SnippetListPage from '../pages/SnippetListPage/SnippetListPage'
const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/snippets' element={<SnippetListPage />} />
        </Routes>
    )
}

export default AppRoutes