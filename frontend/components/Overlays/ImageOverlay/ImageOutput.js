import { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, ScrollView, Platform } from 'react-native';

import IconButton from '../../../util/IconButton';
import Button from '../../../util/Button';
import OutputShaingLink from './OutputSharingLinkOverlay';
import Colors from '../../../constants/colors';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import Text_ from '../../Text/Text';
import { IMAGE_OUTPUT } from '../../../data/Database';
import MainOverlay from '../MainOverlay/mainOverlay';
import LinksHandler from '../../../util/Link';
import Interpreter from '../../../util/AiInterpreter';
import LoadingOverlay from '../../../util/LoadingPage';
import NotificationMessageOverlay from '../../../util/NotificationMessageOverlay';
import Animated, { FadeIn } from 'react-native-reanimated';
import { UploadPredictionImage, UploadPrediction } from '../../../HTTP Requests/ImageRecognition';

export default function ImageOutput({ imageData, visible }) {
  const [share, setShare] = useState(false);
  const happyExperience = useRef(false);
  const sadExperience = useRef(false);

  const dataContext = useContext(ManagmentSystem);
  const themeOption = dataContext.themeOption;
  const darkMode = themeOption === 'Dark Mode';

  useEffect(() => {
    const PredictionsInfoHandler = async () => {
      const output = await UploadPredictionImage(imageData);
      dataContext.predictionIdHandler(output.id);
    };
    PredictionsInfoHandler();
  }, []);

  if (dataContext.loading.option === true && dataContext.loading.choice === 'imageOutput') {
    return <LoadingOverlay loadingSpiner={true} overlayStyle={styles.loadingOverlay} />;
  }

  if (
    dataContext.messageId.id === 'LP16' &&
    dataContext.messageId.choice === 'imageOutput' &&
    dataContext.loading.option === false &&
    dataContext.loading.choice === 'imageOutput'
  ) {
    return (
      <Animated.View entering={FadeIn}>
        <NotificationMessageOverlay
          onPress={() => {
            dataContext.messageId('');
            dataContext.cameraOptionHandler('');
          }}
          ID={dataContext.messageId}
        />
      </Animated.View>
    );
  }

  return (
    <MainOverlay visible={visible} animationType="slide" rootContainer={styles.rootContainer}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageData }} />
          </View>
          <View style={styles.optionsIconButonContainer}>
            <IconButton
              icon={dataContext.predictionToFavorite !== 'No' ? 'star' : 'star-outline'}
              size={30}
              color={Colors.orange}
              onPress={() => {
                dataContext.predictionToFavorite === 'No'
                  ? dataContext.predictionToFavoriteHandler('Yes')
                  : dataContext.predictionToFavoriteHandler('No');
              }}
            />
            <IconButton
              icon={dataContext.predictionLike !== 'No' ? 'heart' : 'heart-outline'}
              size={30}
              color={dataContext.predictionLike !== 'No' ? Colors.red : Colors.orange}
              onPress={() => {
                dataContext.predictionLike === 'No' ? dataContext.predictionLikeHnadler('Yes') : dataContext.predictionLikeHnadler('No');
              }}
            />
            <IconButton icon={'share-social'} size={30} color={Colors.orange} onPress={() => setShare(!share)} />
          </View>
          <View style={styles.textMainContainer}>
            <Text_ children={<Interpreter />} textContainer={styles.titleContainer} textStytle={styles.title} />
            <View style={styles.textContainer}>
              <Text_ children={'Itroduction, Core Concept, Key Features, Real World Examples'} />
              <LinksHandler children={'Follow this link for more...'} />
            </View>
          </View>
          <View style={styles.ratingMainIconButonContainer}>
            <View style={styles.ratingIconButonContainer}>
              <IconButton
                iconButtonContainer={styles.rating}
                icon={happyExperience.current ? 'happy' : 'happy-outline'}
                size={30}
                color={Colors.orange}
                onPress={() => {
                  happyExperience.current = !happyExperience.current;
                  sadExperience.current = false;

                  if (happyExperience.current === true) {
                    dataContext.userExperienceHandler('Good');
                  } else if (happyExperience.current === false && sadExperience.current === false) {
                    dataContext.userExperienceHandler('None');
                  }
                }}
              />

              <IconButton
                iconButtonContainer={styles.rating}
                icon={sadExperience.current ? 'sad' : 'sad-outline'}
                size={30}
                color={Colors.orange}
                onPress={() => {
                  sadExperience.current = !sadExperience.current;
                  happyExperience.current = false;

                  if (sadExperience.current === true) {
                    dataContext.userExperienceHandler('Bad');
                  } else if (happyExperience.current === false && sadExperience.current === false) {
                    dataContext.userExperienceHandler('None');
                  }
                }}
              />
            </View>

            {IMAGE_OUTPUT.map((data) => (
              <View key={data.id}>
                {['IMO1'].includes(data.id) && <Text_ textContainer={styles.ratingTextContainer} children={data.textTitle} />}
              </View>
            ))}
          </View>

          {IMAGE_OUTPUT.map((data) => (
            <View key={data.id}>
              {['IMO2'].includes(data.id) && (
                <Button
                  children={data.buttonText}
                  style={styles.leaveButton}
                  textStyle={styles.leaveButtonText}
                  onPress={async () => {
                    dataContext.cameraOptionHandler('');
                    dataContext.imageOutputHandler('', 'null');
                    await UploadPrediction(dataContext.predictionId, dataContext.predictionToFavorite, 'favorite');

                    await UploadPrediction(dataContext.predictionId, dataContext.predictionLike, 'like');

                    await UploadPrediction(dataContext.predictionId, dataContext.userExperience, 'user_experience');

                    dataContext.predictionLikeHnadler('No');
                    dataContext.predictionToFavoriteHandler('No');
                  }}
                />
              )}
            </View>
          ))}
        </View>
        <OutputShaingLink setShareData={setShare} visible={share} />
      </ScrollView>
    </MainOverlay>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: Platform.select({ ios: 50, android: 0 }),
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    height: 150,
    width: '100%',
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: '30%',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.light_gray,
  },
  optionsIconButonContainer: {
    marginTop: 50,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textMainContainer: {},
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    marginTop: 30,
    marginHorizontal: 10,
    borderLeftWidth: 7,
    borderWidth: 1,
    borderColor: Colors.orange,
    borderRadius: 10,
    padding: 10,
  },
  text: {},
  ratingMainIconButonContainer: {
    marginTop: 20,
  },
  ratingIconButonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rating: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  ratingTextContainer: {
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 15,
  },
  more: {
    color: Colors.orange,
    fontSize: 14,
  },
  mainTitle: {
    marginHorizontal: 120,
    marginTop: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  leaveButton: {
    marginTop: 200,
    backgroundColor: Colors.orange,
    paddingVertical: 9,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  leaveButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
