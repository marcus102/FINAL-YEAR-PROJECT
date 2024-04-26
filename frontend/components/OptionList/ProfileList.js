import { useState, useRef, useContext } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OptionsDetails from '../OptionDetails/OptionsDetails';
import SubOptionsDetails from '../OptionDetails/SubOptionsDetails';
import { PROFILE_OPTIONS, SUB_PROFILE_OPTIONS } from '../../data/Database';
import SubOptionOverlay from '../Overlays/SubOptionOverlay';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import LoadingOverlay from '../../util/LoadingPage';
import NotificationMessageOverlay from '../../util/NotificationMessageOverlay';

export default function ProfileList() {
  const navigation = useNavigation();

  const [displayContent, setDisplayContent] = useState(null);
  const [prevDisplayContent, setPrevDisplayContent] = useState(null);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [idTrack, setIdTrack] = useState('');
  const animationControlers = useRef(PROFILE_OPTIONS.map(() => new Animated.Value(0))).current;

  const dataContext = useContext(ManagmentSystem);
  const isVerified = dataContext.code;

  const toggleListItem = (index, item) => {
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

  const arrowTransform = (index) =>
    animationControlers[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['-90deg', '90deg'],
    });

  function pressHandler({ data }) {
    const { id, subButtonText } = data;

    if (['PSO1', 'PSO2', 'PSO3'].includes(id)) {
      navigation.navigate('SubProfileScreen', {
        subProfileId: id,
      });
      dataContext.headerTitleHandler(subButtonText);
    } else if (['PSO9'].includes(id)) {
      function logout() {
        setIsLoading(true);
        try {
          dataContext.Logout();
          dataContext.switchContentFormHandler('Create');
          setIsLoading(false);
        } catch (error) {
          setMessageId('LP8');
          setIsLoading(false);
        }
      }
      logout();
    } else {
      setOpenOverlay(true);
      setIdTrack(id);
    }
  }

  if (messageId && !isLoading) {
    return <NotificationMessageOverlay onPress={onPress} ID={messageId} />;
  }

  if (isLoading) {
    return <LoadingOverlay loadingSpiner={true} />;
  }

  return (
    <View style={styles.mainContainer}>
      {PROFILE_OPTIONS.map((item, index) => {
        const SubProfileDisplay = SUB_PROFILE_OPTIONS.filter((profileData) => profileData.prevId === item.id);

        return (
          <View key={item.id} style={styles.options}>
            {['PO1'].includes(item.id) ? (
              <OptionsDetails
                icon1={item.icon_1}
                icon={item.icon_2}
                children={item.text}
                isVisible={!isVerified ? true : false}
                children1={'verification required!'}
                onPress={() => toggleListItem(index, item)}
                animatedView={{
                  transform: [{ rotateZ: arrowTransform(index) }],
                }}
              />
            ) : ['PO2', 'PO3', 'PO4', 'PO5'].includes(item.id) ? (
              <OptionsDetails
                icon1={item.icon_1}
                icon={item.icon_2}
                children={item.text}
                isVisible={false}
                onPress={() => toggleListItem(index, item)}
                animatedView={{
                  transform: [{ rotateZ: arrowTransform(index) }],
                }}
              />
            ) : null}
            {index === displayContent && (
              <View style={styles.subOptions}>
                {SubProfileDisplay.map((data) => (
                  <SubOptionsDetails children={data.subButtonText} onPress={() => pressHandler({ data })} icon={data.icon} key={data.id} />
                ))}
              </View>
            )}
          </View>
        );
      })}
      <SubOptionOverlay setOpenOverlayData={setOpenOverlay} overlayId={idTrack} visible={openOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 7,
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
