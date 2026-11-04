import { Layout } from '../shared/layout/Layout'
import { NotFound } from '../shared/components/NotFound'
import { NewProductPage } from '../features/products/pages/NewProductPage'
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage'
import { ProductsPage } from '../features/products/pages/ProductsPage'
import { HomePage } from '../shared/pages/HomePage'
import { NewUserPage } from '../features/users/pages/NewUserPage'
import { UserDetailPage } from '../features/users/pages/UserDetailPage'
import { UsersPage } from '../features/users/pages/UsersPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/new" element={<NewProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/new" element={<NewUserPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
