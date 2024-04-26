import Menu_Option from '../models/menu_profile';
import SubOptions from '../models/itemSubOtions';
import SubOptionsData from '../models/SubOptionsData';
import ButtonModel from '../models/ButtonModel';
import SubOverlayModel from '../models/SubOverlayModel';
import UserInfoOverlayModel from '../models/UserInfoOverlayModel';
import FeedbackRatingModel from '../models/FeedbackRatingModel';
import FeedbackRatingButtonModel from '../models/FeedbackRatingButtonModel';
import CountrieModel from '../models/CountriesModel';
import LoadingPage from '../models/LoadingPageModel';
import SubMenuModel from '../models/SubMenuDataModel';
import TermsConditions from '../models/Terms_ConditionsModel';

// MENU DATABASE SECTION

export const MENU_OPTIONS = [
  new Menu_Option(
    'MO1',
    'Notification',
    'chevron-forward',
    'notifications-outline'
  ),
  new Menu_Option('MO2', 'Language', 'chevron-forward', 'language'),
  new Menu_Option('MO3', 'Theme', 'chevron-forward', 'color-palette-outline'),
  new Menu_Option('MO4', 'Help', 'chevron-forward', 'md-help-circle-outline'),
  new Menu_Option(
    'MO5',
    'Feedback & Rating',
    'chevron-forward',
    'happy-outline'
  ),
  new Menu_Option(
    'MO6',
    'Terms & Conditions',
    'chevron-forward',
    'bulb-outline'
  ),
];

export const SUB_MENU_OPTIONS = [
  new SubOptions('MSO1', 'MO1', 'Your Notifications', 'chevron-forward'),
  new SubOptions('MSO3', 'MO2', 'French', 'radio-button-off-outline'),
  new SubOptions('MSO4', 'MO2', 'English', 'radio-button-on-outline'),
  new SubOptions('MSO5', 'MO2', 'Spanish', 'radio-button-off-outline'),
  new SubOptions('MSO6', 'MO3', 'Light Mode', 'radio-button-on-outline'),
  new SubOptions('MSO7', 'MO3', 'Dark Mode', 'radio-button-off-outline'),
  new SubOptions('MSO9', 'MO4', 'Assistance', 'chevron-forward'),
  new SubOptions('MSO8', 'MO4', 'FAQ', 'chevron-forward'),
  new SubOptions('MSO10', 'MO5', 'Rate Our App', 'chevron-forward'),
  new SubOptions('MSO11', 'MO6', 'Terms & Conditions', 'chevron-forward'),
];

export const ASSISTANCE = [
  new SubMenuModel('SMDLM1', 'Get your issue resolved!', '', '', ''),
  new SubMenuModel('SMDLM7', 'Hello!!!', 'how can we help you ?', '', ''),
  new SubMenuModel(
    'SMDLM2',
    'What you should know.',
    'This section has been thoughtfully crafted to enhance user experience and provide optimal support to our users.',
    '',
    'bulb-outline'
  ),
  new SubMenuModel(
    'SMDLM3',
    'Explain your difficulties!!!',
    'Important Note: If you wish to modify the default email address, please ensure that you provide an email address accessible to you. This is essential to ensure that you receive feedback from our team. Thank you for your cooperation!',
    '',
    'information-circle-outline'
  ),
  new SubMenuModel('SMDLM4', 'Email Address:', '', '(required)', ''),
  new SubMenuModel('SMDLM5', 'Issue Description:', '', '(required)', ''),
  new SubMenuModel('SMDLM6', 'More Details:', '', '(required)', ''),
];
export const ASSISTANCE_BUTTON_TEXT = [
  new SubMenuModel('SMDLBM1', 'Submit', '', '', 'md-send'),
];
export const TERMS_AND_CONDITIONS_OPTIONS = [
  new TermsConditions('TACO1', 'Terms of services', 'Conditions', '', ''),
];
export const TERMS_AND_CONDITIONS_SUMMARY = [
  new TermsConditions('TACS1', '', '', 'Summary', ''),
];
export const TERMS_AND_CONDITIONS_HEADER = [
  new TermsConditions(
    'TACH1',
    'Our Terms of services',
    'Conditions & Privacy Guidelines',
    '',
    ''
  ),
  new TermsConditions('TACH2', '', '', '', 'Updated since'),
];
export const DUMMY_FAVORITE_DATA = [
  new SubMenuModel(
    'DFD1',
    'Favorite Titlte 1',
    'Notification details fwkekrjaejrrkjaedmekrmaekrmkermakmrkMkmewrkmakwmtkakwlrrtwertrdjfndfnjnsjnfnrjnrjererjewrjrwierjekekjeawkeqkkdekrkekrerkaerrjrrerserhrsrherhraheurrhuehuhaeuuergaegreuagiwrgeuwj4ej2snrjtnje',
    'Click for more...',
    'happy-outline'
  ),
  new SubMenuModel(
    'DFD2',
    'Favorite Titlte 2',
    'Notification details Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection.',
    'Click for more...',
    'happy-outline'
  ),
  new SubMenuModel(
    'DFD3',
    'Favorite Titlte 3',
    'Notification details Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Click for more...',
    'happy-outline'
  ),
  new SubMenuModel(
    'DFD4',
    'Favorite Titlte 4',
    'Notification details Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Click for more...',
    'happy-outline'
  ),
  new SubMenuModel(
    'DFD5',
    'Favorite Titlte 5',
    'Notification details Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Click for more...',
    'happy-outline'
  ),
];
export const DUMMY_HISTORIQUE_DATA = [
  new SubMenuModel('DHD1', 'Historique Titlte 1', '', 'md-close-outline'),
  new SubMenuModel('DHD2', 'Historique Titlte 2', '', 'md-close-outline'),
  new SubMenuModel('DHD3', 'Historique Titlte 3', '', '', 'md-close-outline'),
  new SubMenuModel('DHD4', 'Historique Titlte 4', '', '', 'md-close-outline'),
  new SubMenuModel('DHD5', 'Historique Titlte 5', '', '', 'md-close-outline'),
];
export const DUMMY_NOTIFICATIONS = [
  new SubMenuModel(
    'DN1',
    'Notification title',
    'Notification details fwkekrjaejrrkjaedmekrmaekrmkermakmrkMkmewrkmakwmtkakwlrrtwertrdjfndfnjnsjnfnrjnrjererjewrjrwierjekekjeawkeqkkdekrkekrerkaerrjrrerserhrsrherhraheurrhuehuhaeuuergaegreuagiwrgeuwj4ej2snrjtnje',
    'Click for more...',
    'happy-outline'
  ),
  new SubMenuModel(
    'DN2',
    'Notification title',
    'Notification details Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or another type of compatible computer. Text messages may be sent over a cellular network or may also be sent via satellite or Internet connection.',
    'Click for more...',
    'happy-outline'
  ),
  new SubMenuModel(
    'DN3',
    'Notification title',
    'Notification details Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Click for more...',
    'happy-outline'
  ),
  new SubMenuModel(
    'DN4',
    'Notification title',
    'Notification details Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Click for more...',
    'happy-outline'
  ),
  new SubMenuModel(
    'DN5',
    'Notification title',
    'Notification details Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Click for more...',
    'happy-outline'
  ),
];
export const DUMMY_FAQ = [
  new SubMenuModel(
    'DF1',
    ' What is the app all about?',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing. This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriateText messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing. This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate ',
    'Was it helpful?',
    ''
  ),
  new SubMenuModel(
    'DF2',
    'What are the advantages using this app?',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Was it helpful?',
    ''
  ),
  new SubMenuModel(
    'DF3',
    'What to do in case of issues with the app?',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Was it helpful?',
    ''
  ),
  new SubMenuModel(
    'DF4',
    'What is the main purpose of the app?',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Was it helpful?',
    ''
  ),
  new SubMenuModel(
    'DF5',
    'Where to find you?',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Was it helpful?',
    ''
  ),
  new SubMenuModel(
    'DF6',
    'What are the security measure to take using the app?',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Was it helpful?',
    ''
  ),
  new SubMenuModel(
    'DF7',
    'Is the app safe?',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Was it helpful?',
    ''
  ),
];
export const DUMMY_TERM = [
  new SubMenuModel(
    'DT1',
    'Overview about Terms of services',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Translate text',
    ''
  ),
  new SubMenuModel(
    'DT2',
    'Introduction to our terms',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Translate text',
    ''
  ),
];
export const DUMMY_CONDITIONS = [
  new SubMenuModel(
    'DC1',
    'Overview about Conditions ',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Translate text',
    ''
  ),
  new SubMenuModel(
    'DC2',
    'Overview about Conditions & Privacy guidelines',
    'Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate',
    'Translate text',
    ''
  ),
];

export const RATING_FEEDBACK_OVERLAY = [
  new FeedbackRatingModel('FRM1', 'Give Us A Rating', '', 'star-outline'),
  new FeedbackRatingModel(
    'FRM2',
    'Give A Feedback To Help Us Improve:',
    '(optional)',
    ''
  ),
];

export const RATING_FEEDBACK_OVERLAY_BUTTON = [
  new FeedbackRatingButtonModel('FRBM2', 'Send', 'send'),
];

// PROFILE DATABASE SECTION

export const PROFILE_OPTIONS = [
  new Menu_Option(
    'PO1',
    'Personnal Informations',
    'chevron-forward',
    'md-information-circle-outline'
  ),
  new Menu_Option(
    'PO2',
    'History & Favorite',
    'chevron-forward',
    'contract-outline'
  ),
  new Menu_Option(
    'PO3',
    'Security',
    'chevron-forward',
    'md-shield-checkmark-outline'
  ),
  new Menu_Option(
    'PO4',
    'Delete Account',
    'chevron-forward',
    'md-trash-bin-outline'
  ),
  new Menu_Option('PO5', 'Logout', 'chevron-forward', 'log-out-outline'),
];

export const SUB_PROFILE_OPTIONS = [
  new SubOptions('PSO1', 'PO1', 'Personnal Informations', 'chevron-forward'),
  new SubOptions('PSO2', 'PO2', 'History', 'chevron-forward'),
  new SubOptions('PSO3', 'PO2', 'My Favorites', 'chevron-forward'),
  new SubOptions('PSO4', 'PO3', 'Change Password', 'chevron-forward'),
  new SubOptions('PSO8', 'PO4', 'Delete My Account', 'chevron-forward'),
  new SubOptions('PSO9', 'PO5', 'Logout', 'chevron-forward'),
];

export const SUB_PROFILE_DATA = [
  new SubOptionsData('PSOD1', 'Surname:', '', ''),
  new SubOptionsData('PSOD2', 'Last Name(s):', '', ''),
  new SubOptionsData('PSOD3', 'Username:', '', ''),
  new SubOptionsData('PSOD4', 'Date of Birth:', '', ''),
  new SubOptionsData('PSOD5', 'Email Address:', '', ''),
  new SubOptionsData('PSOD6', 'Phone Number:', '', ''),
  new SubOptionsData('PSOD7', 'Gender:', '', ''),
  new SubOptionsData('PSOD8', 'Country:', '', ''),
];

export const PROFILE_BUTTTONS = [
  new ButtonModel('BM1', 'Update Your Informations'),
  new ButtonModel('BM2', 'Click here to verify your informations'),
];

export const DELETE_ACCOUNT_OVERLAY = [
  new SubOverlayModel('DAO1', 'Why Do You Want To Delete Your Account?', ''),
  new SubOverlayModel('DAO2', 'Quick suggestions( required )', ''),
  new SubOverlayModel('DAO3', 'Security issues in the app', ''),
  new SubOverlayModel('DAO4', 'Having issues with my account', ''),
  new SubOverlayModel('DAO5', 'Having bad experince using the app', ''),
  new SubOverlayModel('DAO6', 'Not satisfied with the app', ''),
  new SubOverlayModel('DAO7', 'None of the above', ''),
  new SubOverlayModel('DAO8', 'Reason', '( Required )'),
];
export const DELETE_ACCOUNT_OVERLAY_BUTTON = [
  new ButtonModel('DAOB1', 'Continue'),
];
export const CONFIRM_DELETE_ACCOUNT = [
  new SubOverlayModel('CDAO1', 'Enter Your Password To Proceed', ''),
  new SubOverlayModel('CDAO2', 'Password', '(Required)'),
];
export const CONFIRM_DELETE_ACCOUNT_BUTTON = [
  new ButtonModel('CDAOB1', 'Forgot password ?'),
  new ButtonModel(
    'CDAOB2',
    'Important Notice: For security purposes, please be informed that clicking on the "Forgot password" button above will automatically log you out. Subsequently, you will be directed to the password reset process. Once completed, you can proceed to log in again. We appreciate your understanding and cooperation. Thank you!'
  ),
  new ButtonModel('CDAOB3', 'Continue'),
];

export const UPDATE_INFO_OVERLAY = [
  new SubOverlayModel('UIO1', 'Change Your Password', ''),
  new SubOverlayModel('UIO2', 'Old Password', '(required)'),
  new SubOverlayModel('UIO3', 'New Password', '(required)'),
];

export const UPDATE_INFO_OVERLAY_BUTTON = [
  new ButtonModel('UIOB1', 'Forgot Password ?'),
  new ButtonModel(
    'UIOB2',
    'Important Notice: For security purposes, please be informed that clicking on the "Forgot password" button above will automatically log you out. Subsequently, you will be directed to the password reset process. Once completed, you can proceed to log in again. We appreciate your understanding and cooperation. Thank you!'
  ),
  new ButtonModel('UIOB3', 'Update Password'),
];

export const OVERLAY_BUTTON_1 = [
  new ButtonModel('BM9', 'PSO4', 'Cancel', 'arrow-undo', 20, '#e86704'),
  new ButtonModel('BM13', 'PSO8', 'Cancel', 'arrow-undo', 20, '#e86704'),
  new ButtonModel('BM14', 'PSO9', 'Cancel', 'arrow-undo', 20, '#e86704'),
];

export const USER_INFO_OVERLAY = [
  new UserInfoOverlayModel(
    'UIOM1',
    'Profile Picture:',
    'Choose a picture to upload',
    'add-circle'
  ),
  new UserInfoOverlayModel('UIOM2', 'Surname:', '...', ''),
  new UserInfoOverlayModel('UIOM3', 'Last Name(s):', '...', ''),
  new UserInfoOverlayModel('UIOM4', 'Username:', '@______...', ''),
  new UserInfoOverlayModel('UIOM5', 'Date of Birth:', 'JJ/MM/YY...', ''),
  new UserInfoOverlayModel('UIOM6', 'Email Address:', '___@gmail.com...', ''),
  new UserInfoOverlayModel('UIOM7', 'Phone Number:', '+____...', ''),
  new UserInfoOverlayModel('UIOM8', 'Gender:', '...', ''),
  new UserInfoOverlayModel('UIOM9', 'Country:', '...', ''),
];

export const USER_INFO_OVERLAY_BUTTON = [
  new UserInfoOverlayModel('UIOM11', 'Update Info', '', 'arrow-up'),
];

export const SIGN_UP_FORM_OVERLAY = [
  new UserInfoOverlayModel('SUFO1', 'Sign Up', '', ''),
  new UserInfoOverlayModel('SUFO2', 'Surname:', '', ''),
  new UserInfoOverlayModel('SUFO3', 'Last Name(s):', '', ''),
  new UserInfoOverlayModel('SUFO4', 'Email Address:', '___@gmail.com...', ''),
  new UserInfoOverlayModel('SUFO5', 'Phone Number:', '', ''),
  new UserInfoOverlayModel('SUFO6', 'Username:', '@______...', ''),
  new UserInfoOverlayModel('SUFO7', 'Date of Birth:', 'JJ/MM/YY...', ''),
  new UserInfoOverlayModel('SUFO8', 'Gender:', '', ''),
  new UserInfoOverlayModel('SUFO9', 'Country:', '', ''),
  new UserInfoOverlayModel('SUFO10', 'Password:', '', ''),
  new UserInfoOverlayModel('SUFO11', 'Confirm Password:', '', ''),
];

export const SIGN_UP_OVERLAY_SWITCH_ACCOUNT = [
  new UserInfoOverlayModel(
    'SUFO6',
    'Do you have an account?/ ',
    'Sign into your account',
    ''
  ),
];

export const SIGN_UP_FORM_OVERLAY_BUTTON_1 = [
  new UserInfoOverlayModel('SUFO11', 'Go Back', '', ''),
];
export const SIGN_UP_FORM_OVERLAY_BUTTON_2 = [
  new UserInfoOverlayModel('SUFO12', 'Create', '', ''),
];
export const VERIFICATION_FORM_BUTTON_2 = [
  new UserInfoOverlayModel('VFB1', 'Verify', '', ''),
];
export const SIGN_UP_FORM_OVERLAY_BUTTON_3 = [
  new UserInfoOverlayModel(
    'SUFO13',
    "Haven't recieve code/ ",
    'Resend the code',
    ''
  ),
];
export const SIGN_UP_FORM_OVERLAY_2 = [
  new UserInfoOverlayModel(
    'SUFO2.1',
    'Enter the code sent to you for verification',
    '',
    ''
  ),
];

// export const SIGN_UP_FINAL_FORM_OVERLAY_BUTTON_1 = [

//   new UserInfoOverlayModel('SUFFO1', 'Cancel', '', ''),

// ];

export const SIGN_IN_FORM_OVERLAY = [
  new UserInfoOverlayModel('SIFO1', 'Sign In', '', ''),
  new UserInfoOverlayModel('SIFO2', 'Email', '', ''),
  new UserInfoOverlayModel('SIFO3', 'Password', '', ''),
];
export const SIGN_IN_FORM_OVERLAY_1 = [
  new UserInfoOverlayModel('SIFO4', 'Forgot Password?', '', ''),
];
export const SIGN_IN_FORM_OVERLAY_2 = [
  new UserInfoOverlayModel(
    'SIFO5',
    "Dont't have an account?/ ",
    'Sign up for an account',
    ''
  ),
];
export const SIGN_IN_FINAL_FORM_OVERLAY_BUTTON_1 = [
  new UserInfoOverlayModel('SIFFO1', 'Cancel', '', ''),
];
export const SIGN_IN_FINAL_FORM_OVERLAY_BUTTON_2 = [
  new UserInfoOverlayModel('SIFFO2', 'Sign In', '', ''),
];

export const PASS_FORGOTTEN_FORM_OVERLAY = [
  new UserInfoOverlayModel('PFFO1', 'Resset Your Password', '', ''),
  new UserInfoOverlayModel(
    'PFFO2',
    'Enter the email address or phone number(only the one used to create the account) and recieve the code to resset your password',
    '',
    ''
  ),
  new UserInfoOverlayModel('PFFO3', 'Email', '', ''),
];
export const PASS_FORGOTTEN_FORM_OVERLAY_BUTTON_1 = [
  new UserInfoOverlayModel('PFFFO1', 'Go Back', '', ''),
];
export const PASS_FORGOTTEN_FORM_OVERLAY_BUTTON_2 = [
  new UserInfoOverlayModel('PFFFO2', 'Continue', '', ''),
];

export const PASS_RESET_FORM_OVERLAY = [
  new UserInfoOverlayModel('PRFO1', 'Done!!!', '', 'checkmark-done'),
  new UserInfoOverlayModel(
    'PRFO2',
    'Your password has been successfuly reset! You can now apply a new password',
    '',
    ''
  ),
];
export const PASS_RESET_FORM_OVERLAY_2 = [
  new UserInfoOverlayModel('PRFO3', 'New Password:', '', 'checkmark-done'),
  new UserInfoOverlayModel('PRFO4', 'Confirm Password:', '', ''),
];
export const PASS_RESET_FORM_OVERLAY_BUTTON_1 = [
  new UserInfoOverlayModel('PRFFO1', 'Go Back', '', ''),
];
export const PASS_RESET_FORM_OVERLAY_BUTTON_2 = [
  new UserInfoOverlayModel('PRFFO2', 'Finish', '', ''),
];

// BOTH MENU AND PROFILE

export const LOADING_PAGE = [
  new LoadingPage(
    'LP1',
    'Oops!!! we were unable to log you in check your credentials and try again...',
    'Loading...',
    'Ok',
    ''
  ),
  new LoadingPage('LP2', '', 'Loading...', ''),
  new LoadingPage(
    'LP3',
    'Oops!!! we were unable to create a new user check your credentials and try again...',
    'Loading...',
    'Ok',
    ''
  ),
  new LoadingPage(
    'LP4',
    'Oops!!! we were unable to fetch your information(s) check your connection and try again...',
    'Loading...',
    'Ok',
    ''
  ),
  new LoadingPage(
    'LP5',
    'Oops!!! we were unfortunately unable to confirm the code you submited, make sure you provided the correct code sent to you, also check your internet connection and try again...',
    'Loading...',
    'Ok',
    ''
  ),
  //new LoadingPage('LP5', "Too many attempts try again later...", 'Loading...', 'Ok', ''),
  new LoadingPage(
    'LP6',
    'Oops!!! we were unable to update your information(s) check your connection and try again...',
    'Loading...',
    'Ok',
    ''
  ),
  new LoadingPage(
    'LP7',
    'Oops!!! we were unable to fetch data check your connection and try again...',
    'Loading...',
    'Ok',
    ''
  ),
  new LoadingPage(
    'LP8',
    'Oops!!! we were unable to log you out please try again...',
    'Loading...',
    'Ok',
    ''
  ),
  new LoadingPage(
    'LP9',
    'Oops!!! we were unable to  delete your account check your internet connection and try again...',
    'Loading...',
    'Ok',
    ''
  ),
  new LoadingPage(
    'LP10',
    'Oops!!! we were unable to  update your passwork, make sure you typed the correct credentials, check your internet connectivity and try again...',
    'Loading...',
    'Ok',
    ''
  ),
  new LoadingPage(
    'LP11',
    'Oops!!! we were unfortunately unable to  confirm the code you submited, make sure you typed the correct credentials or request for a new code, check your internet connectivity and try again...',
    'Loading...',
    'Ok',
    ''
  ),
  new LoadingPage(
    'LP12',
    'Oops!!! Incorect password!!! Try again...',
    'Loading...',
    'Ok',
    ''
  ),
];

export const ALL_DATA = [
  new LoadingPage('NLP1', 'Welcome!', '', '', 'person-add'),
  new LoadingPage('NLP2', "You don't have an account?", '', '', ''),
  new LoadingPage('NLP3', 'Hello!', '', '', 'checkmark-done'),
  new LoadingPage('NLP4', 'Log into your account', '', '', ''),
  new LoadingPage(
    'NLP5',
    'Verification code is invalid! Try again',
    '',
    '',
    'reload-sharp'
  ),
  new LoadingPage('NLP6', 'Invalid input! Try again', '', '', 'reload-sharp'),
  new LoadingPage('NLP7', 'Oop!!! you cannot submit an empty box!', '', '', ''),
];

export const ALL_DATA_BUTTON = [
  new LoadingPage('NLPB1', 'Create an account!', '', '', ''),
  new LoadingPage('NLPB2', 'Sign In', '', '', ''),
];

export const ALL_COUNTRIES = [
  new CountrieModel('ACM1', 'Afghanistan'),
  new CountrieModel('ACM2', 'Andorra'),
  new CountrieModel('ACM3', 'Algeria'),
  new CountrieModel('ACM4', 'Albania'),
  new CountrieModel('ACM5', 'Angola'),
  new CountrieModel('ACM6', 'Antigua and Barbuda'),
  new CountrieModel('ACM7', 'Argentina'),
  new CountrieModel('ACM8', 'Armenia'),
  new CountrieModel('ACM9', 'Australia'),
  new CountrieModel('ACM10', 'Austria'),
  new CountrieModel('ACM11', 'Azerbaijan'),
  new CountrieModel('ACM12', 'Bahamas'),
  new CountrieModel('ACM13', 'Bahrain'),
  new CountrieModel('ACM14', 'Bangladesh'),
  new CountrieModel('ACM15', 'Barbados'),
  new CountrieModel('ACM16', 'Belarus'),
  new CountrieModel('ACM17', 'Belgium'),
  new CountrieModel('ACM18', 'Belize'),
  new CountrieModel('ACM20', 'Benin'),
  new CountrieModel('ACM21', 'Bhutan'),
  new CountrieModel('ACM22', 'Bolivia'),
  new CountrieModel('ACM23', 'Bosnia and Herzegovina'),
  new CountrieModel('ACM24', 'Botswana'),
  new CountrieModel('ACM25', 'Brazil'),
  new CountrieModel('ACM26', 'Brunei'),
  new CountrieModel('ACM27', 'Bulgaria'),
  new CountrieModel('ACM28', 'Burkina Faso'),
  new CountrieModel('ACM29', 'Burundi'),
  new CountrieModel('ACM30', 'Cabo Verde'),
  new CountrieModel('ACM31', 'Cambodia'),
  new CountrieModel('ACM32', 'Cameroon'),
  new CountrieModel('ACM33', 'Canada'),
  new CountrieModel('ACM34', 'Central African Republic'),
  new CountrieModel('ACM35', 'Chad'),
  new CountrieModel('ACM36', 'Chile'),
  new CountrieModel('ACM37', 'China'),
  new CountrieModel('ACM38', 'Colombia'),
  new CountrieModel('ACM39', 'Comoros'),
  new CountrieModel('ACM40', 'Congo, Democratic Republic'),
];

//  of the
// Congo, Republic of the
// Costa Rica
// Cote d'Ivoire
// Croatia
// Cuba
// Cyprus
// Czech Republic
// Denmark
// Djibouti
// Dominica
// Dominican Republic
// East Timor (Timor-Leste)
// Ecuador
// Egypt
// El Salvador
// Equatorial Guinea
// Eritrea
// Estonia
// Eswatini
// Ethiopia
// Fiji
// Finland
// France
// Gabon
// Gambia
// Georgia
// Germany
// Ghana
// Greece
// Grenada
// Guatemala
// Guinea
// Guinea-Bissau
// Guyana
// Haiti
// Honduras
// Hungary
// Iceland
// India
// Indonesia
// Iran
// Iraq
// Ireland
// Israel
// Italy
// Jamaica
// Japan
// Jordan
// Kazakhstan
// Kenya
// Kiribati
// Korea, North
// Korea, South
// Kosovo
// Kuwait
// Kyrgyzstan
// Laos
// Latvia
// Lebanon
// Lesotho
// Liberia
// Libya
// Liechtenstein
// Lithuania
// Luxembourg
// Madagascar
// Malawi
// Malaysia
// Maldives
// Mali
// Malta
// Marshall Islands
// Mauritania
// Mauritius
// Mexico
// Micronesia
// Moldova
// Monaco
// Mongolia
// Montenegro
// Morocco
// Mozambique
// Myanmar (Burma)
// Namibia
// Nauru
// Nepal
// Netherlands
// New Zealand
// Nicaragua
// Niger
// Nigeria
// North Macedonia (formerly Macedonia)
// Norway
// Oman
// Pakistan
// Palau
// Palestine
// Panama
// Papua New Guinea
// Paraguay
// Peru
// Philippines
// Poland
// Portugal
// Qatar
// Romania
// Russia
// Rwanda
// Saint Kitts and Nevis
// Saint Lucia
// Saint Vincent and the Grenadines
