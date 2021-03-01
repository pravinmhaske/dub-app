
import { useSelector, useDispatch } from "react-redux";
import getUserPublicGist from './redux/actions/users-gist.action'

import SearchInput from './components/SearchInput';
import DisplayUsersPublicGist from './components/DisplayUsersPublicGist'
import Header from './components/Header'

import { getUserPublicGistSuccess, getUserPublicGistError, getUserPublicGistPending } from './redux/reducers/users-gist.reducer'
import './App.css';

function App() {

  const dispatch = useDispatch();

  const UserPublicGistRes = useSelector(getUserPublicGistSuccess);
  const UserPublicGistError = useSelector(getUserPublicGistError);
  const isLoading = useSelector(getUserPublicGistPending);

  const getUserPublicGists = async (username) => {
    dispatch(getUserPublicGist(username));
  }

  const onSearchValChanged = (username) => {
    console.log(" username", username);
    getUserPublicGists(username)

  }


  return (
    <div className="app-container">
      <Header></Header>
      <SearchInput onSearchValChanged={onSearchValChanged} />
      <DisplayUsersPublicGist UserPublicGistRes={UserPublicGistRes}
        UserPublicGistError={UserPublicGistError} isLoading={isLoading}></DisplayUsersPublicGist>
    </div>
  );
}

export default App;
