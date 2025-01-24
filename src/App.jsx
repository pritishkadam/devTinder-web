import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Profile from './components/User/Profile';
import Message from './components/Message';
import { Provider } from 'react-redux';
import store from './store/store';
import Explore from './components/Explore';
import DetailedFeedCard from './components/DetailedFeedCard';
import ProfileDetails from './components/User/ProfileDetails';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/explore' element={<Explore />} />
              <Route path='/explore/profile/:profileId' element={<DetailedFeedCard />} />
              <Route path='/message' element={<Message />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profileDetails/:profileId' element={<ProfileDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
