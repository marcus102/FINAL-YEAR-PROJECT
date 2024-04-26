import { StyleSheet } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

import Colors from '../constants/colors';
import Input from './Input';

export default function SearchBar({
  onPress,
  value,
  maxLength,
  autoCapitalize,
  autoCorrect,
  keyboardType,
  textInputStyle,
  onChangeText,
  onPressIn,
  onPressOut,
  multiline,
  visible,
}) {
  return (
    <>
      {visible && (
        <Animated.View style={styles.rootContainer} entering={FadeInRight} exiting={FadeOutLeft}>
          <Input
            value={value}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            keyboardType={keyboardType}
            textInputStyle={[styles.inputStyle, textInputStyle]}
            placeholder={'search'}
            placeholderTextColor={Colors.darkGray}
            onChangeText={onChangeText}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            multiline={multiline}
            icon={'search-outline'}
            size={35}
            color={Colors.gray}
            iconVisible={true}
            onPress={onPress}
          />
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    width: '85%',
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light_gray,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
