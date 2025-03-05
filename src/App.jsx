import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Profile from './components/User/Profile';
import Message from './components/Messages/Message';
import { Provider } from 'react-redux';
import store from './store/store';
import Explore from './components/Explore/Explore';
import DetailedFeedCard from './components/Explore/DetailedFeedCard';
import ProfileDetails from './components/User/ProfileDetails';
import Requests from './components/Requests/Requests';
import RequestDetails from './components/Requests/RequestDetails';
import MatchDetails from './components/Matches/MatchDetails';
import MatchList from './components/Matches/MatchList';
import Chat from './components/Chat/Chat';

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
              <Route path='/profile' element={<Profile />} />
              <Route
                path='/profileDetails/:profileId'
                element={<ProfileDetails />}
              />
              <Route
                path='/requests'
                element={
                  <div className='block md:hidden'>
                    <Requests />
                  </div>
                }
              />
              <Route path='/requests/:userId' element={<RequestDetails />} />
              <Route
                path='/matches'
                element={
                  <div className='block md:hidden'>
                    <MatchList />
                  </div>
                }
              />
              <Route path='/matches/:userId' element={<MatchDetails />} />
              <Route path='/messages/:targetUserId' element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
