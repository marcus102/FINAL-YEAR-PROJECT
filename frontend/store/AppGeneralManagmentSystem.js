import { createContext, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ManagmentSystem = createContext({
  userInfo: [],
  userSignUp: ([
    { id, surname },
    { id2, last_name },
    { id3, email_address },
    { id4, phone_number },
    { id5, username },
    { id6, date_of_birth },
    { id7, gender },
    { id8, country },
    { id9, password },
    { id10, confirm_password },
  ]) => {},
  userUpdateInfo: ([
    //{ id, profile_pic },
    { id2, surname },
    { id3, last_name },
    { id4, username },
    { id5, date_of_birth },
    { id6, email_address },
    { id7, phone_number },
    { id8, gender },
    { id9, country },
  ]) => {},
  token: '',
  isAuthenticated: false,
  Authenticate: (token) => {},
  Logout: () => {},
  code: '',
  isVerified: false,
  cofirmCode: (code) => {},
  deleteConfirmCode: () => {},
  info: '',
  signedUp: false,
  signUpSuccessful: (info) => {},
  profileImageData: '',
  profileImage: false,
  addProfileImage: (image) => {},
  deleteProfileImage: (image) => {},
  password: '',
  isPassword: false,
  getPassword: (data) => {},
  deletePassword: () => {},
  themeOption: '',
  themeIndex: '',
  setTheme: (themeOption, themeIndex) => {},
  switchContentForm: '',
  switchContentFormHandler: (option) => {},
  headerTitle: '',
  headerTitleHandler: (title) => {},
  visibility: true,
  visibilityHandler: (status) => {},
  openSearchOverlay: '',
  openSearchOverlayHandler: (option) => {},
  headerOptionOverlay: '',
  headerOptionOverlayHandler: (option) => {},
  translateOverlay: '',
  translateOverlayHandler: (option, choice) => {},
  profileImageId: '',
  profileImageIdHandler: (id) => {},
  cameraOption: '',
  cameraOptionHandler: (option) => {},
  imageOutput: '',
  imageOutputHandler: (image, option) => {},
  loading: '',
  loadingHandler: (option, choice) => {},
  messageId: '',
  messageIdHandler: (id, choice) => {},
  predictionId: '',
  predictionIdHandler: (id) => {},
  predictionToFavorite: '',
  predictionToFavoriteHandler: (option) => {},
  predictionLike: '',
  predictionLikeHnadler: (option) => {},
  predictions: '',
  predictionsHandler: (predictions, option) => {},
  likes: '',
  likesHandler: (option, id) => {},
  userExperience: '',
  userExperienceHandler: (option) => {},
  translatedText: '',
  translatedTextHandler: (original_text, translated_text, image) => {},
});

function SystemManagmentReducer(state, action) {
  switch (action.type) {
    case 'USER_SIGNUP':
      return [...state, JSON.stringify(action.payload)];
    case 'UPDATE_USER_INFO':
      return [...state, JSON.stringify(action.payload)];
    default:
      return state;
  }
}

export default function ManagmentSystemProvider({ children }) {
  const [userRegistration, dispatch] = useReducer(SystemManagmentReducer, []);
  const [authThoken, setAuthToken] = useState();
  const [codeConfirmation, setCodeConfirmation] = useState();
  const [hasSignedUp, setHasSignedUp] = useState();
  const [profileImage, setProfileImage] = useState();
  const [managePassword, setManagePassword] = useState();
  const [themeOption, setThemeOption] = useState('Light Mode');
  const [themeIndex, setThemeIndex] = useState(0);
  const [switchOption, setSwitchOption] = useState('Create');
  const [header, setHeader] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState('');
  const [isHeaderOptionOverlayopen, setIsHeaderOptionOverlayopen] = useState('');
  const [isTranslateOverlayOpen, setIsTranslateOverlay] = useState({});
  const [isProfileImageId, setIsProfileImageId] = useState('');
  const [isCameraOption, setIsCameraOption] = useState('');
  const [isImageOutpout, setIsImageOutput] = useState([]);
  const [isLoading, setIsLoading] = useState({ option: false });
  const [isMessageId, setIsMessageId] = useState({});
  const [isPredicitionId, setIsPredictionId] = useState('');
  const [isPredictionToFavorite, setIsPredictionToFavorite] = useState('No');
  const [isPredictionLike, setIsPredictionLike] = useState('No');
  const [isPredictions, setIsPredictions] = useState({ predictionsData: [] });
  const [isLiked, setIsLiked] = useState({ option: 'Yes', id: '' });
  const [isUserExperience, setIsUserExperience] = useState('None');
  const [isTranlstedText, setIsTranlstedText] = useState({});

  function translatedTextHandler(original_text, translated_text, image) {
    setIsTranlstedText({ original_text: original_text, translated_text: translated_text, image: image });
  }

  function userExperienceHandler(option) {
    setIsUserExperience(option);
  }

  function likesHandler(option, id) {
    setIsLiked({ option: option, id: id });
  }

  function predictionsHandler(predictions, option) {
    if (option === 'clear') {
      setIsPredictions({ predictionsData: [] });
    } else {
      setIsPredictions((currentInputValues) => {
        // Check if the prediction with the same id already exists
        const existingPredictionIndex = currentInputValues.predictionsData.findIndex(
          (existingPrediction) => existingPrediction.id === predictions.id
        );

        if (existingPredictionIndex !== -1) {
          // If the prediction with the same id exists, update it
          const updatedPredictions = [...currentInputValues.predictionsData];
          updatedPredictions[existingPredictionIndex] = predictions;

          return {
            ...currentInputValues,
            predictionsData: updatedPredictions,
          };
        } else {
          // If the prediction with the same id doesn't exist, concatenate it
          return {
            ...currentInputValues,
            predictionsData: [...currentInputValues.predictionsData, predictions],
          };
        }
      });
    }
  }

  function predictionLikeHnadler(option) {
    setIsPredictionLike(option);
  }

  function predictionToFavoriteHandler(option) {
    setIsPredictionToFavorite(option);
  }

  function predictionIdHandler(id) {
    setIsPredictionId(id);
  }

  function messageIdHandler(id, choice) {
    setIsMessageId({ id: id, choice: choice });
  }

  function loadingHandler(option, choice) {
    setIsLoading({ option: option, choice: choice });
  }

  function imageOutputHandler(image, option) {
    if (option === 'null') {
      setIsImageOutput([]);
    } else {
      setIsImageOutput((prevOutput) => prevOutput.concat(image));
    }
  }

  function cameraOptionHandler(option) {
    setIsCameraOption(option);
  }

  function profileImageIdHandler(id) {
    setIsProfileImageId(id);
  }

  function translateOverlayHandler(option, choice) {
    setIsTranslateOverlay({ option: option, choice: choice });
  }

  function headerOptionOverlayHandler(option) {
    setIsHeaderOptionOverlayopen(option);
  }

  function openSearchOverlayHandler(option) {
    setIsSearchOverlayOpen(option);
  }

  function visibilityHandler(status) {
    setIsVisible(status);
  }

  function headerTitleHandler(title) {
    setHeader(title);
  }

  function switchContentFormHandler(option) {
    setSwitchOption(option);
  }

  function setTheme(themeOption, themeIndex) {
    setThemeOption(themeOption);
    setThemeIndex(themeIndex);
    AsyncStorage.setItem('theme', themeOption);
    AsyncStorage.setItem('themeIndex', themeIndex.toString());
  }

  function Authenticate(token) {
    const tokenString = token.toString();
    setAuthToken(token);
    AsyncStorage.setItem('token', tokenString);
  }

  function Logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  function cofirmCode(code) {
    setCodeConfirmation(code);
    AsyncStorage.setItem('confirmation_code', code);
  }

  function deleteCofirmCode() {
    setCodeConfirmation(null);
    AsyncStorage.removeItem('confirmation_code');
  }

  function userSignUp(key, value) {
    try {
      AsyncStorage.setItem(key.toString(), value.toString());
      dispatch({
        type: 'USER_SIGNUP',
        payload: { [key]: value },
      });
    } catch (error) {
      throw error.message;
    }
  }

  function userUpdateInfo(key, value) {
    try {
      AsyncStorage.setItem(key.toString(), value.toString());
      dispatch({
        type: 'UPDATE_USER_INFO',
        payload: { [key]: value },
      });
    } catch (error) {
      throw error.message;
    }
  }

  function signUpSuccessful(info) {
    try {
      setHasSignedUp(info);
    } catch (error) {
      throw error.message;
    }
  }

  function addProfileImage(image) {
    setProfileImage(image);
    AsyncStorage.setItem('profileImage', image);
  }

  function deleteProfileImage(image) {
    setProfileImage(null);
    AsyncStorage.removeItem('profileImage');
  }

  function getPassword(data) {
    setManagePassword(data);
    AsyncStorage.setItem('password', data);
  }

  function deletePassword() {
    setManagePassword(null);
    AsyncStorage.removeItem('password');
  }

  const value = {
    userInfo: userRegistration,
    userSignUp: userSignUp,
    userUpdateInfo: userUpdateInfo,
    token: authThoken,
    isAuthenticated: !!authThoken,
    Authenticate: Authenticate,
    Logout: Logout,
    code: codeConfirmation,
    isVerified: !!codeConfirmation,
    cofirmCode: cofirmCode,
    deleteCofirmCode: deleteCofirmCode,
    info: hasSignedUp,
    signedUp: !!hasSignedUp,
    signUpSuccessful: signUpSuccessful,
    profileImageData: profileImage,
    profileImage: !!profileImage,
    addProfileImage: addProfileImage,
    deleteProfileImage: deleteProfileImage,
    password: managePassword,
    isPassword: !!managePassword,
    getPassword: getPassword,
    deletePassword: deletePassword,
    themeOption: themeOption,
    themeIndex: themeIndex,
    setTheme: setTheme,
    switchContentForm: switchOption,
    switchContentFormHandler: switchContentFormHandler,
    headerTitle: header,
    headerTitleHandler: headerTitleHandler,
    visibility: isVisible,
    visibilityHandler: visibilityHandler,
    openSearchOverlay: isSearchOverlayOpen,
    openSearchOverlayHandler: openSearchOverlayHandler,
    headerOptionOverlay: isHeaderOptionOverlayopen,
    headerOptionOverlayHandler: headerOptionOverlayHandler,
    translateOverlay: isTranslateOverlayOpen,
    translateOverlayHandler: translateOverlayHandler,
    profileImageId: isProfileImageId,
    profileImageIdHandler: profileImageIdHandler,
    cameraOption: isCameraOption,
    cameraOptionHandler: cameraOptionHandler,
    imageOutput: isImageOutpout,
    imageOutputHandler: imageOutputHandler,
    loading: isLoading,
    loadingHandler: loadingHandler,
    messageId: isMessageId,
    messageIdHandler: messageIdHandler,
    predictionId: isPredicitionId,
    predictionIdHandler: predictionIdHandler,
    predictionToFavorite: isPredictionToFavorite,
    predictionToFavoriteHandler: predictionToFavoriteHandler,
    predictionLike: isPredictionLike,
    predictionLikeHnadler: predictionLikeHnadler,
    predictions: isPredictions,
    predictionsHandler: predictionsHandler,
    likes: isLiked,
    likesHandler: likesHandler,
    userExperience: isUserExperience,
    userExperienceHandler: userExperienceHandler,
    translatedText: isTranlstedText,
    translatedTextHandler: translatedTextHandler,
  };

  return <ManagmentSystem.Provider value={value}>{children}</ManagmentSystem.Provider>;
}
