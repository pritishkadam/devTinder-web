import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Profile from './components/User/Profile';
import Message from './components/Message';
import { Provider } from 'react-redux';
import store from './store/store';
import Explore from './components/Explore';
import DetailedFeedCard from './components/DetailedFeedCard';
import ProfileDetails from './components/User/ProfileDetails';
import Requests from './components/Requests';
import RequestDetails from './components/RequestDetails';
import MatchDetails from './components/MatchDetails';
import MatchList from './components/MatchList';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/explore' element={<Explore />} />
              <Route
                path='/explore/profile/:profileId'
                element={<DetailedFeedCard />}
              />
              <Route path='/message/:userId' element={<Message />} />
              <Route path='/profile' element={<Profile />} />
              <Route
                path='/profileDetails/:profileId'
                element={<ProfileDetails />}
              />
              <Route path='/requests' element={<Requests />} />
              <Route path='/requests/:userId' element={<RequestDetails />} />
              <Route path='/matches' element={<MatchList />} />
              <Route path='/matches/:userId' element={<MatchDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
