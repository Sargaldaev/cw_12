import {Route, Routes} from 'react-router-dom';
import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import AppToolbar from './components/AppToolbar/AppToolbar.tsx';
import Register from './features/User/RegisterForm/RegisterForm.tsx';
import Login from './features/User/LoginForm/LoginForm.tsx';
import GalleryFullInfo from './features/Gallery/GalleryFullInfo/GalleryFullInfo.tsx';
import AllGalleries from './features/Gallery/AllGalleries/AllGalleries.tsx';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppToolbar />
        <Container>
          <Routes>
            <Route path={'/'} element={<AllGalleries/>} />
            <Route path={'/author-galleries/:id'} element={<GalleryFullInfo/>} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
