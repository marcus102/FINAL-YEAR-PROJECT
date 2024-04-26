import { useState, useRef, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, Pressable, RefreshControl } from 'react-native';
import Animated, { FadeInDown, FadeIn, FadeOut, FadeOutDown } from 'react-native-reanimated';

import Colors from '../../constants/colors';
import { DUMMY_NOTIFICATIONS } from '../../data/allData';
import IconButton from '../../util/IconButton';
import Button from '../../util/Button';
import Icons from '../../util/Icons';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Text_ from '../Text/Text';

export default function NotificationHandler() {
  const [expand, setExpand] = useState(false);
  const objectID = useRef('');
  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function pressHandler(id) {
    setExpand(!expand);
    objectID.current = id;
  }

  function NotificationListHandler({ item }) {
    return (
      <Pressable
        onPress={() =>
          dataContext.headerOptionOverlay === 'notification' ? dataContext.headerOptionOverlayHandler('') : pressHandler(item.id)
        }
        style={styles.rootContainer}
      >
        <View style={styles.container}>
          <View style={styles.firstContainer}>
            <Text_ textStytle={styles.dataText} children={'1 day ago'} />
            <IconButton
              icon={'close-sharp'}
              color={Colors.gray}
              size={20}
              // onPress={}
            />
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://i.pinimg.com/originals/5c/49/2f/5c492f8ce9c7c5ce4c36517924899dcb.jpg',
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text_ textStytle={styles.title} children={item.title} />
                <Icons icon={'ellipse-sharp'} color={Colors.orange} size={10} />
              </View>
              {expand && item.id === objectID.current ? (
                <Animated.View entering={FadeIn} style={styles.titleDataContainer}>
                  <Text_ children={item.titleData} />
                </Animated.View>
              ) : (
                <View style={styles.titlePlaceHolderContainer}>
                  <Text_ textStytle={styles.titlePlaceHolder} children={item.placeHolder} />
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.mainContainer}>
      <FlatList
        data={DUMMY_NOTIFICATIONS}
        key={(item) => item.id}
        renderItem={NotificationListHandler}
        refreshControl={<RefreshControl tintColor={darkMode ? Colors.white : Colors.black} refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {dataContext.headerOptionOverlay === 'notification' && (
        <Animated.View entering={FadeInDown} exiting={FadeOutDown} style={[styles.optionMainContaier, darkMode && styles.darkMode]}>
          <View style={styles.closeButtonContainer}>
            <Button children={'Close'} onPress={() => dataContext.headerOptionOverlayHandler('')} textStyle={styles.buttonText} />
          </View>
          <Button
            children={'Mark All As Read'}
            style={styles.buttonContainer}
            // onPress={}
          />
          <Button
            children={'Clear All '}
            style={styles.buttonContainer}
            // onPress={}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  iconContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  rootContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: Colors.light_grayTransparent,
  },
  rootContainerDarkMode: {
    backgroundColor: Colors.black,
    shadowColor: Colors.light_gray,
    borderColor: Colors.darkGray,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: 100,
    minWidth: 200,
  },
  imageContainer: {
    alignItems: 'center',
    maxHeight: 50,
    minWidth: 50,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
  },
  firstContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleDataContainer: {
    marginVertical: 5,
  },
  titlePlaceHolderContainer: {},
  titlePlaceHolder: {
    fontSize: 12,
    color: Colors.gray,
  },
  dataText: {
    marginHorizontal: 10,
    color: Colors.gray,
    fontSize: 12,
  },
  optionMainContaier: {
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: Colors.light_gray,
  },
  darkMode: {
    backgroundColor: Colors.black,
    borderWidth: 0.5,
    borderColor: Colors.darkGray,
  },
  closeButtonContainer: {
    maxWidth: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: Colors.lightRed,
  },
  darkModeButtonText: {
    color: Colors.darkModeText,
  },
  buttonContainer: {
    paddingVertical: 5,
  },
  optionContaier: {},
  optionText: {},
  darkModeText: {
    color: Colors.darkModeText,
    shadowColor: Colors.white,
  },
});
