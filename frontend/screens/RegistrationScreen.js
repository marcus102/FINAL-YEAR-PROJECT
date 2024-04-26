import { useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import MainPage from "../components/CreateAccountOrSignUp/MainPage";
import SignUpForm from "../components/CreateAccountOrSignUp/SignUp/SignUpForm";
import SignInForm from "../components/CreateAccountOrSignUp/SignIn/SignInForm";
import PasswordForgotenForm from "../components/CreateAccountOrSignUp/ResetPassword/PasswordForgotenForm";
import ResetCodeForm from "../components/CreateAccountOrSignUp/ResetPassword/ResetCodeForm";
import ResetPasswordForm from "../components/CreateAccountOrSignUp/ResetPassword/ResetPasswordForm";
import Colors from "../constants/colors";
import { ManagmentSystem } from "../store/AppGeneralManagmentSystem";
import Button from "../util/Button";

export default function RegistrationScreen() {
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === "Dark Mode";
  const switchOption = dataContext.switchContentForm;

  return (
    <View
      style={[
        styles.rootContainer,
        darkMode && styles.darkMode,
      ]}
    >
      {(switchOption === "SignIn" || switchOption === "SignUp") &&
        dataContext.visibility === true && (
          <View style={styles.optionConntainer}>
            <Button
              style={[
                styles.signInButtonContainer,
                switchOption === "SignIn" && styles.activeContainer,
              ]}
              textStyle={styles.buttonText}
              onPress={() => dataContext.switchContentFormHandler("SignIn")}
              children={"Sign In"}
            />
            <Button
              style={[
                styles.signUpButtonContainer,
                switchOption === "SignUp" && styles.activeContainer,
              ]}
              textStyle={styles.buttonText}
              onPress={() => dataContext.switchContentFormHandler("SignUp")}
              children={"Sign Up"}
            />
          </View>
        )}
      <ScrollView style={styles.scrollViewContainer}>
        {switchOption === "Create" && <MainPage />}
        {switchOption === "SignIn" && <SignInForm />}
        {switchOption === "SignUp" && <SignUpForm />}
        {switchOption === "forgotPass" && <PasswordForgotenForm />}
        {switchOption === "resetCode" && <ResetCodeForm />}
        {switchOption === "resetPassword" && <ResetPasswordForm />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingTop: 60,
    paddingBottom: 20,
  },
  scrollViewContainer: {
    flex: 1,
  },
  optionConntainer: {
    flexDirection: "row",
    width: "100%",
    marginHorizontal: 15,
  },
  signInButtonContainer: {
    width: "50%",
    height: 40,
    alignItems: "center",
  },
  signUpButtonContainer: {
    width: "50%",
    height: 40,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  activeContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.orange,
  },
  cancelButtonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.orange,
    justifyContent: "center",
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  darkMode: {
    backgroundColor: Colors.black,
  },
});
