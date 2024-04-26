import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';

export default function KeyBoardAvoidingViewHandler({ children, style }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.keyboardAvoidingView}>
      <View style={[styles.overlayContainer, style]}>{children}</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
