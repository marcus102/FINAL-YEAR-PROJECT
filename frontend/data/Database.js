import createButton from '../models/ButtonsModel';
import createText from '../models/TextModel';
import createForm from '../models/FormModel';
import createTextButton from '../models/Text&ButtonModel';
import createSubButton from '../models/SubButtonModel';
import createIconTextIcon from '../models/IconTextIconModel';
import createNotification from '../models/NotificationModel';

export const MAIN_PAGE = [
  createText('MP1', '.....'),
  createText('MP2', 'Welcome!'),
  createText('MP3', 'More...'),
  createButton('MP4', 'Get Started!'),
];

export const SIGN_UP_FORM = [
  createText('SUF1', 'Sign Up'),
  createForm('SUF2', 'Surname'),
  createForm('SUF3', 'Last Name'),
  createForm('SUF4', 'Email Address'),
  createForm('SUF5', 'Phone Number'),
  createForm('SUF6', 'Username'),
  createForm('SUF7', 'Date of Birth'),
  createForm('SUF8', 'Gender'),
  createForm('SUF9', 'Country'),
  createForm('SUF10', 'Password'),
  createForm('SUF11', 'Confirm Password'),
  createText('SUF12', 'Hide password'),
  createNotification('SUF13', 'Invalid Input! Try again'),
  createTextButton('SUF14', 'I agree with the ', 'terms & conditions'),
  createButton('SUF15', 'SignUp'),
];

export const SIGN_IN_FORM = [
  createText('SIF1', 'Sign In'),
  createForm('SIF2', 'Email Address'),
  createForm('SIF3', 'Password'),
  createText('SIF4', 'Hide password'),
  createNotification('SIF5', 'Invalid Input! Try again'),
  createButton('SIF6', 'Forgot Password ?'),
  createButton('SIF7', 'Sign In'),
];

export const FORGOTTEN_PASSWORD_FORM = [
  createText('FPF1', 'Resset Your Password'),
  createNotification(
    'FPF2',
    'Enter the email address or phone number(only the one used to create the account) and recieve the code to resset your password'
  ),
  createNotification('FPF3', 'Invalid input! Try again'),
  createForm('FPF4', 'Email', '____@ex.com'),
  createButton('FPF5', 'Continue'),
  createButton('FPF6', 'Go Back'),
];

export const CODE_VERIFICATION_FORM = [
  createText('CVF1', 'Enter the code sent to you for verification'),
  createNotification('CVF2', 'Verification code is invalid! Try again'),
  createForm('CVF3', '', 'code'),
  createTextButton('CVF4', "Haven't recieve code yet/ ", 'Resend the code'),
  createButton('CVF5', 'Verify'),
  createButton('CVF6', 'Go Back'),
];

export const PASSWORD_RESET_FORM = [
  createText('PRF1', 'Done!!!'),
  createNotification('PRF2', 'Your password has been successfuly reset! You can now apply a new password'),
  createForm('PRF3', 'New Password:'),
  createForm('PRF4', 'Confirm Password:'),
  createNotification('PRF5', 'Invalid input! Try again'),
  createButton('PRF6', 'Complete'),
  createButton('PRF7', 'Go Back'),
];

export const MENU_OPTIONS = [
  createIconTextIcon('MO1', 'notifications-outline', 'Notification', 'chevron-forward'),
  createIconTextIcon('MO2', 'language', 'Language', 'chevron-forward'),
  createIconTextIcon('MO3', 'color-palette-outline', 'Theme', 'chevron-forward'),
  createIconTextIcon('MO4', 'help-circle-outline', 'Help', 'chevron-forward'),
  createIconTextIcon('MO5', 'happy-outline', 'Feedback & Rating', 'chevron-forward'),
  createIconTextIcon('MO6', 'bulb-outline', 'Terms & Conditions', 'chevron-forward'),
];

export const SUB_MENU_OPTIONS = [
  createSubButton('SMO1', 'MO1', 'Your Notifications', 'chevron-forward'),
  createSubButton('SMO2', 'MO2', 'French', 'radio-button-off-outline'),
  createSubButton('SMO3', 'MO2', 'English', 'radio-button-off-outline'),
  createSubButton('SMO4', 'MO2', 'Spanish', 'radio-button-off-outline'),
  createSubButton('SMO5', 'MO3', 'Light Mode', 'radio-button-off-outline'),
  createSubButton('SMO6', 'MO3', 'Dark Mode', 'radio-button-off-outline'),
  createSubButton('SMO7', 'MO4', 'Assistance', 'chevron-forward'),
  createSubButton('SMO8', 'MO4', 'FAQ', 'chevron-forward'),
  createSubButton('SMO9', 'MO5', 'Rate Our App', 'chevron-forward'),
  createSubButton('SMO10', 'MO6', 'Terms & Conditions', 'chevron-forward'),
];

export const PROFILE_OPTIONS = [
  createIconTextIcon('PO1', 'information-circle-outline', 'Personnal Informations', 'chevron-forward'),
  createIconTextIcon('PO2', 'contract-outline', 'History & Favorite', 'chevron-forward'),
  createIconTextIcon('PO3', 'shield-checkmark-outline', 'Security', 'chevron-forward'),
  createIconTextIcon('PO4', 'trash-bin-outline', 'Delete Account', 'chevron-forward'),
  createIconTextIcon('PO5', 'log-out-outline', 'Logout', 'chevron-forward'),
];

export const SUB_PROFILE_OPTIONS = [
  createSubButton('PSO1', 'PO1', 'Personnal Informations', 'chevron-forward'),
  createSubButton('PSO2', 'PO2', 'History', 'chevron-forward'),
  createSubButton('PSO3', 'PO2', 'Favorites', 'chevron-forward'),
  createSubButton('PSO4', 'PO3', 'Change Password', 'chevron-forward'),
  createSubButton('PSO8', 'PO4', 'Delete My Account', 'chevron-forward'),
  createSubButton('PSO9', 'PO5', 'Logout', 'chevron-forward'),
];

export const UPDATE_PASSWORD_OVERLAY = [
  createText('UPO1', 'Change Your Password'),
  createForm('UPO2', 'Current Password', '(required)'),
  createForm('UPO3', 'New Password', '(required)'),
  createText('UPO4', 'Hide Password'),
  createNotification('UPO5', 'Invalid input! Try again'),
  createButton('UPO6', 'Forgot Password ?'),
  createText(
    'UPO7',
    'Important Notice!: For security purposes, please be informed that clicking on the "Forgot password" button above will automatically log you out. Subsequently, you will be directed to the password reset process. Once completed, you can proceed to log in again. We appreciate your understanding and cooperation. Thank you!'
  ),
  createButton('UPO8', 'Update Password'),
];

export const USER_INFO_PAGE = [
  createText('UIP1', 'Surname:'),
  createText('UIP2', 'Last Name(s):'),
  createText('UIP3', 'Username:'),
  createText('UIP4', 'Date of Birth:'),
  createText('UIP5', 'Email Address:'),
  createText('UIP6', 'Phone Number:'),
  createText('UIP7', 'Gender:'),
  createText('UIP8', 'Country:'),
  createButton('UIP9', 'Update Your Informations'),
  createButton('UIP10', 'Click here to verify your informations'),
];

export const UPDATE_USER_INFO_OVERLAY = [
  createTextButton('UUIO1', 'Profile Picture', 'Choose your profile picture'),
  createForm('UUIO2', 'Surname:', '(required)'),
  createForm('UUIO3', 'Last Name(s):', '(required)'),
  createForm('UUIO4', 'Username:', '(required)'),
  createForm('UUIO5', 'Date of Birth:', '(required)'),
  createForm('UUIO6', 'Email Address:', '(required)'),
  createForm('UUIO7', 'Phone Number:', '(required)'),
  createForm('UUIO8', 'Gender:', '(required)'),
  createForm('UUIO9', 'Country:', '(required)'),
  createNotification('UUIO10', 'Invalid input! Try again'),
  createButton('UUIO11', 'Save Updates'),
];

export const DELETE_ACCOUNT_OVERLAY = [
  createText('DAO1', 'Enter Your Password To Proceed'),
  createForm('DAO2', 'Password', '(required)'),
  createText('DAO3', 'Hide Password'),
  createNotification('DAO4', 'Invalid input! Try again'),
  createButton('DAO5', 'Forgot Password ?'),
  createText(
    'DAO6',
    'Important Notice!: For security purposes, please be informed that clicking on the "Forgot password" button above will automatically log you out. Subsequently, you will be directed to the password reset process. Once completed, you can proceed to log in again. We appreciate your understanding and cooperation. Thank you!'
  ),
  createButton('DAO7', 'Continue'),
  createText('DAO8', 'Why Do You Want To Delete Your Account?'),
  createText('DAO9', 'Quick suggestions( required )'),
  createButton('DAO10', 'Security issues in the app'),
  createButton('DAO11', 'Having issues with my account'),
  createButton('DAO12', 'Having bad experince using the app'),
  createButton('DAO13', 'Not satisfied with the app'),
  createButton('DAO14', 'None of the above'),
  createForm('DAO15', 'Reason(s)', '(required)'),
  createButton('DAO16', 'Continue'),
];

export const ASSISTANCE_PAGE = [
  createText('AP1', 'Get your issue resolved!'),
  createText('AP2', 'Hello!! ✋ how can we help you ? '),
  createNotification(
    'AP3',
    'What you should know',
    'This section has been thoughtfully crafted to enhance user experience and provide optimal support to our users.'
  ),
  createNotification(
    'AP4',
    'Explain your difficulties!!!',
    'Important Note: If you wish to modify the default email address, please ensure that you provide an email address accessible to you. This is essential to ensure that you receive feedback from our team. Thank you for your cooperation!'
  ),
  createForm('AP5', 'Email Address:', '(required)'),
  createForm('AP6', 'Issue Description:', '(required)'),
  createForm('AP7', 'More Details:', '(required)'),
  createNotification('AP8', 'Invalid Email Address!!!'),
  createButton('AP9', 'Submit'),
  createTextButton('AP10', 'For more, visite our', 'FQA(Frequently Asked Question)'),
];

export const LOADING_PAGE = [
  createNotification('LP1', 'Oops!!! we were unable to log you in check your credentials and try again...', 'Ok'),
  createNotification('LP2', 'Loading...'),
  createNotification('LP3', 'Oops!!! we were unable to create a new user check your credentials and try again...', 'Ok'),
  createNotification('LP4', 'Oops!!! we were unable to fetch your information(s) check your connection and try again...', 'Ok'),
  createNotification(
    'LP5',
    'Oops!!! we were unfortunately unable to confirm the code you submited, make sure you provided the correct code sent to you, also check your internet connection and try again...',
    'Ok'
  ),
  createNotification('LP6', 'Oops!!! we were unable to update your information(s) check your connection and try again...', 'Ok'),
  createNotification('LP7', 'Oops!!! we were unable to fetch data check your connection and try again...', 'Ok'),
  createNotification('LP8', 'Oops!!! we were unable to log you out please try again...', 'Ok'),
  createNotification('LP9', 'Oops!!! we were unable to  delete your account check your internet connection and try again...', 'Ok'),
  createNotification(
    'LP10',
    'Oops!!! we were unable to  update your passwork, make sure you typed the correct credentials, check your internet connectivity and try again...',
    'Ok'
  ),
  createNotification(
    'LP11',
    'Oops!!! we were unfortunately unable to  confirm the code you submited, make sure you typed the correct credentials or request for a new code, check your internet connectivity and try again...',
    'Ok'
  ),
  createNotification('LP12', 'Oops!!! Incorect password!!! Try again...', 'Ok'),
  createNotification('LP13', 'Too many attempts try again later...', 'Ok'),
  createNotification('LP14', 'Oops!!! Unable to send request. Try again', 'Ok'),
  createNotification('LP15', 'Sent', 'Ok'),
  createNotification('LP16', 'No Internet Connection!', 'Ok'),
  createNotification('LP17', 'Unable to fetch data! try again', 'Ok'),
  createNotification('LP18', 'Unable to make changes! try again', 'Ok'),
  createNotification('LP19', 'Thank you for your feedback!!!', 'Ok'),
];

export const YES = [createButton('Y1', 'Yes')];
export const NO = [createButton('N2', 'No')];
export const FEEDBACK = [createText('FB1', 'Thank you for your feedback !!!')];
export const MORE = [createText('M1', 'more...')];
export const TRANSLATE_TEXT = [createButton('TT1', 'Translate text')];

export const TERMS = [createButton('T1', 'Terms of Services')];
export const CONDITIONS = [createButton('C1', 'Conditions')];
export const SUMMARY = [createButton('S1', 'Summary')];
export const SUB_SUNNARY = [createButton('SS1', 'Sub summary 1')];
export const TITLE = [createText('TL1', 'Terms Of Services', 'Conditions & Privacy Guidelines')];
export const UPDATE_DATE = [createText('UD1', 'Updated since ')];

export const LANGUAGES_LIST = [
  createButton('LT1', 'English'),
  createButton('LT2', 'French'),
  createButton('LT3', 'Spanish'),
  // createButton('LT4', 'more...'),
];

export const GENDER = [createButton('GD1', 'Male'), createButton('GD2', 'Female'), createButton('GD3', 'Private')];

export const IMAGE_OUTPUT = [createText('IMO1', 'Are you satisfied with the result?'), createButton('IMO2', 'Go Back')];

export const ALL_COUNTRIES = [
  createButton('ACM1', 'Afghanistan'),
  createButton('ACM2', 'Andorra'),
  createButton('ACM3', 'Algeria'),
  createButton('ACM4', 'Albania'),
  createButton('ACM5', 'Angola'),
  createButton('ACM6', 'Antigua and Barbuda'),
  createButton('ACM7', 'Argentina'),
  createButton('ACM8', 'Armenia'),
  createButton('ACM9', 'Australia'),
  createButton('ACM10', 'Austria'),
  createButton('ACM11', 'Azerbaijan'),
  createButton('ACM12', 'Bahamas'),
  createButton('ACM13', 'Bahrain'),
  createButton('ACM14', 'Bangladesh'),
  createButton('ACM15', 'Barbados'),
  createButton('ACM16', 'Belarus'),
  createButton('ACM17', 'Belgium'),
  createButton('ACM18', 'Belize'),
  createButton('ACM20', 'Benin'),
  createButton('ACM21', 'Bhutan'),
  createButton('ACM22', 'Bolivia'),
  createButton('ACM23', 'Bosnia and Herzegovina'),
  createButton('ACM24', 'Botswana'),
  createButton('ACM25', 'Brazil'),
  createButton('ACM26', 'Brunei'),
  createButton('ACM27', 'Bulgaria'),
  createButton('ACM28', 'Burkina Faso'),
  createButton('ACM29', 'Burundi'),
  createButton('ACM30', 'Cabo Verde'),
  createButton('ACM31', 'Cambodia'),
  createButton('ACM32', 'Cameroon'),
  createButton('ACM33', 'Canada'),
  createButton('ACM34', 'Central African Republic'),
  createButton('ACM35', 'Chad'),
  createButton('ACM36', 'Chile'),
  createButton('ACM37', 'China'),
  createButton('ACM38', 'Colombia'),
  createButton('ACM39', 'Comoros'),
  createButton('ACM40', 'Congo, Democratic Republic'),
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
