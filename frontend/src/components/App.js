import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { token } from '../utils/auth';
import { AddPlacePopup } from './AddPlacePopup';
import { EditAvatarPopup } from './EditAvatarPopup';

import { EditProfilePopup } from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import { InfoToolTip } from './InfoToolTip';
import Layout from './Layout';
import Login from './Login';

import Main from './Main';
import PopupWithForm from './PopupWithForm';
import { ProtectedRoute } from './ProtectedRoute';
import Register from './Register';

function App() {
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCardData, setSelectedCardData] = useState({});
  const [cardList, setCardList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const localEmail = localStorage.getItem('localEmail');
  // const localPassword = localStorage.getItem('localPassword');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCardList([...cardData]);
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        if (location.pathname === '/signup' && isRegistered) {
          navigate('/signin', { replace: true });
          closeAllPopups();
        }
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.getItem(token);
      auth
        .getContent(token)
        .then(() => {
          setIsRegistered(true);
          navigate('/', { replace: true });
        })
        .catch((err) => console.log(`Error.....: ${err}`));
    }
  }, []);

  function handleLogin() {
    return new Promise((res) => {
      setIsRegistered(true);
      res();
    }).catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleLogout() {
    return new Promise((res) => {
      setIsRegistered(false);
      res();
    })
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('localEmail');
      })
      .then(() => {
        navigate('/signin', { replace: true });
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleInputEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('localEmail', email);
          handleLogin().then(() => {
            navigate('/');
          });
        }
      })
      .catch((err) => {
        console.log(`Error.....: ${err}`);
      });
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    auth
      .register(email, password)
      .then((result) => {
        if (result.data && result.data._id) {
          handleSetRegistration();
        }
      })
      .catch((err) => {
        console.log(`Error.....: ${err}`);
      })
      .finally(handleSubmitInfoToolTip);
  }

  function handleCloseSuccessPopup() {
    navigate('/signin');
    closeAllPopups();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLikes(card._id, !isLiked)
        .then((newCard) => {
          setCardList((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Error.....: ${err}`));
    } else {
      api
        .removeLikes(card._id, isLiked)
        .then((newCard) => {
          setCardList((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Error.....: ${err}`));
    }
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const deletedCardID = card._id;
        setCardList(cardList.filter((card) => card._id !== deletedCardID));
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleCardClick({ link, name }) {
    setIsImagePopupOpen(true);
    setSelectedCardData({
      title: name,
      link: link,
    });
  }

  function handleUpdateUser(data) {
    const { name, description } = data;
    api
      .editUserInfo({ name, about: description })
      .then((name, description) => {
        setCurrentUser(name, description);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleAddPlaceSubmit(data) {
    const { title, link } = data;
    api
      .createCard({ name: title, link })
      .then((newCard) => {
        setCardList([newCard, ...cardList]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleUpdateAvatar(data) {
    const avatar = data.avatar.valueOf();
    api
      .editAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  }

  function handleSetRegistration() {
    setIsRegistered(true);
  }

  function handleSubmitInfoToolTip() {
    setIsInfoToolTipPopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick() {
    setIsDeletePlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCardData({});
    setIsInfoToolTipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              handleLogout={handleLogout}
              isRegistered={isRegistered}
              localEmail={localEmail}
            />
          }
        >
          <Route
            index
            element={
              <ProtectedRoute isRegistered={isRegistered}>
                <Main
                  onEditAvatarClick={handleEditAvatarClick}
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  handleCardClick={handleCardClick}
                  onDeletePlaceClick={handleDeletePlaceClick}
                  cardList={cardList}
                  handleCardLike={handleCardLike}
                  handleDeleteCard={handleDeleteCard}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  closeAllPopups={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  closeAllPopups={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  closeAllPopups={closeAllPopups}
                  onUpdateAddPlace={handleAddPlaceSubmit}
                />
                <PopupWithForm
                  name="remove-card"
                  title="Are you sure?"
                  buttonText="Yes"
                  isOpen={isDeletePlacePopupOpen}
                  closeAllPopups={closeAllPopups}
                />
                <ImagePopup
                  closeAllPopups={closeAllPopups}
                  selectedCardData={selectedCardData}
                  isOpen={isImagePopupOpen}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="signup"
            element={
              <>
                <Register
                  handleSubmitInfoToolTip={handleSubmitInfoToolTip}
                  handleSetRegistration={handleSetRegistration}
                  handleSubmitRegister={handleSubmitRegister}
                  isRegistered={isRegistered}
                  handleInputEmail={handleInputEmail}
                  handleInputPassword={handleInputPassword}
                  email={email}
                  password={password}
                />
                <InfoToolTip
                  isOpen={isInfoToolTipPopupOpen}
                  closeAllPopups={closeAllPopups}
                  isRegistered={isRegistered}
                  handleCloseSuccessPopup={handleCloseSuccessPopup}
                />
              </>
            }
          />

          <Route
            path="signin"
            element={
              <>
                <Login
                  handleSubmitInfoToolTip={handleSubmitInfoToolTip}
                  handleInputEmail={handleInputEmail}
                  handleInputPassword={handleInputPassword}
                  email={email}
                  password={password}
                  handleSubmitLogin={handleSubmitLogin}
                />
                <InfoToolTip
                  isOpen={isInfoToolTipPopupOpen}
                  closeAllPopups={closeAllPopups}
                />
              </>
            }
          />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <h1>Error 404: There's nothing here!</h1>
              </main>
            }
          />
        </Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
