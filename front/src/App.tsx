import { Route, Routes } from 'react-router-dom';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import AppToolbar from './components/AppToolbar/AppToolbar.tsx';
import Register from './features/User/RegisterForm/RegisterForm.tsx';
import Login from './features/User/LoginForm/LoginForm.tsx';
import GalleryFullInfo from './features/Gallery/ClientGallery/GalleryFullInfo/GalleryFullInfo.tsx';
import AllGalleries from './features/Gallery/ClientGallery/AllGalleries/AllGalleries.tsx';
import AddImage from './features/Gallery/ClientGallery/AddImage/AddImage.tsx';
import AdminGalleryFullInfo from './features/Gallery/AdminGallery/AdminGalleryFullInfo/AdminGalleryFullInfo.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './app/store.ts';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';

function App() {
  const {user} = useSelector((state: RootState) => state.user);


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <AppToolbar/>
        <Container>
          <Routes>
            <Route
              path="/author-galleries/:id"
              element={
                user && user.role === 'admin' ? (
                  <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                    <AdminGalleryFullInfo/>
                  </ProtectedRoute>
                ) : (
                  <GalleryFullInfo/>
                )
              }
            />
            <Route path={'/'} element={<AllGalleries/>}/>
            <Route path={'/addImage'} element={<AddImage/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path="*" element={<h1>Not Found</h1>}/>
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
