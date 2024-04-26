import { useContext } from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';

import Colors from '../constants/colors';
import IconButton from './IconButton';
import Text_ from '../components/Text/Text';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';

export default function Input({
  textStyle,
  textInputStyle,
  placeholder,
  children,
  extraStyle,
  keyboardType,
  autoCorrect,
  autoCapitalize,
  maxLength,
  value,
  onChangeText,
  onFocus,
  onBlur,
  onPressIn,
  onPressOut,
  multiline,
  placeholderTextColor,
  secureTextEntry,
  icon,
  size,
  color,
  onPress,
  iconVisible,
  input_IconStyle,
}) {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';
  return (
    <View style={[styles.inputContainer, extraStyle]}>
      <Text_ children={children} textStytle={[styles.inputText, textStyle]} />
      <View style={[styles.input_Icon, input_IconStyle]}>
        <TextInput
          value={value}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          style={[styles.textInputContainer, textInputStyle, darkMode && styles.darkModeText]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          multiline={multiline}
        />
        {!iconVisible === true ? false : true && <IconButton icon={icon} size={size} onPress={onPress} color={color} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  inputText: {
    marginBottom: 15,
  },
  input_Icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.orange,
    marginBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  darkModeText: {
    color: Colors.darkModeText,
  },
});
