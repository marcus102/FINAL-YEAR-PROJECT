import { useState, useRef, useContext } from 'react';
import { StyleSheet, View, Animated, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import OptionsDetails from '../OptionDetails/OptionsDetails';
import SubOptionsDetails from '../OptionDetails/SubOptionsDetails';
import { MENU_OPTIONS, SUB_MENU_OPTIONS } from '../../data/Database';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import RatingFeedbackOverlay from '../Overlays/RatingAndFeedbackOverlay/Rating&FeedbackOverlay';

export default function MenuList() {
  const navigation = useNavigation();

  const dataContext = useContext(ManagmentSystem);
  const [displayContent, setDisplayContent] = useState(null);
  const [prevDisplayContent, setPrevDisplayContent] = useState(null);
  const [languageOption, setLanguageOption] = useState(1);
  const [themeOption, setThemeOption] = useState(dataContext.themeIndex * 1);
  const [isOerlayOpen, setIsOverlayOpen] = useState(false);
  const animationControlers = useRef(MENU_OPTIONS.map(() => new Animated.Value(0))).current;

  function renderMenu({ item, index }) {
    const SubMenuDisplay = SUB_MENU_OPTIONS.filter((menuData) => menuData.prevId === item.id);

    const toggleListItem = () => {
      const config = {
        duration: 200,
        toValue: index === displayContent ? 0 : 1,
        useNativeDriver: true,
      };

      Animated.timing(animationControlers[index], config).start();
      if (index === displayContent) {
        setDisplayContent(null);
      } else {
        if (prevDisplayContent !== null) {
          if (prevDisplayContent === index) {
            setPrevDisplayContent(null);
          } else {
            Animated.timing(animationControlers[prevDisplayContent], {
              duration: 200,
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        }
        setPrevDisplayContent(index);
        setDisplayContent(index);
      }
    };

    const arrowTransform = animationControlers[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['-90deg', '90deg'],
    });

    function pressHandler({ data, index }) {
      if (['SMO9'].includes(data.id)) {
        setIsOverlayOpen(true);
      } else if (['SMO2', 'SMO3', 'SMO4'].includes(data.id)) {
        setLanguageOption(index);
      } else if (['SMO5', 'SMO6'].includes(data.id)) {
        dataContext.setTheme(data.subButtonText, index);
        setThemeOption(index);
      } else if (['SMO1', 'SMO7', 'SMO8', 'SMO10'].includes(data.id)) {
        navigation.navigate('SubMenuScreen', {
          subMenuId: data.id,
        });
        dataContext.headerTitleHandler(data.subButtonText);
      }
    }

    return (
      <View style={styles.mainContainer}>
        <OptionsDetails
          style={styles.options}
          icon1={item.icon_1}
          icon={item.icon_2}
          onPress={toggleListItem}
          animatedView={{ transform: [{ rotateZ: arrowTransform }] }}
          children={item.text}
        />

        {index === displayContent && (
          <View style={styles.subOptions}>
            {SubMenuDisplay.map((data, index) => (
              <SubOptionsDetails
                onPress={() => pressHandler({ data, index })}
                icon={
                  data.icon === 'chevron-forward'
                    ? data.icon
                    : (languageOption === index && ['SMO2', 'SMO3', 'SMO4'].includes(data.id)) ||
                      (themeOption === index && ['SMO5', 'SMO6'].includes(data.id))
                    ? 'radio-button-on-outline'
                    : 'radio-button-off-outline'
                }
                key={data.id}
                children={data.subButtonText}
              />
            ))}
          </View>
        )}
        <RatingFeedbackOverlay visible={isOerlayOpen} setIsOverlayOpen={setIsOverlayOpen} />
      </View>
    );
  }

  return <FlatList data={MENU_OPTIONS} key={(item) => item.id} renderItem={renderMenu} />;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 2,
  },
  options: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  subOptions: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 5,
  },
});
