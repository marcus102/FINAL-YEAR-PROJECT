import { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ImageRecognition } from '../HTTP Requests/ImageRecognition';
import CameraButton from './CameraButtons';
import Colors from '../constants/colors';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import Text_ from '../components/Text/Text';

export default function MainCamera() {
  const [type, setType] = useState('back');
  const [flash, setFlash] = useState('off');
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [hasGalleryPermission, setHasGalleryPermission] = useState();

  const dataContext = useContext(ManagmentSystem);

  useEffect(() => {
    (async () => {
      if (!permission) {
        // Camera permissions are still loading.
        return <View />;
      }

      if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
            <Text_ children={'We need your permission to show the camera'} />
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }
    })();
  }, []);

  function OutputHandler(output) {
    const formattedData = output.data.labels.map((element) => {
      const [label, confidence] = element.split(' ');
      return label;
    });

    dataContext.imageOutputHandler(formattedData, '');
  }

  async function takePhoto() {
    if (cameraRef.current) {
      dataContext.loadingHandler(true, 'imageOutput');
      try {
        const photo = await cameraRef.current.takePictureAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [6, 6],
          quality: 1,
        });

        if (photo.uri) {
          dataContext.cameraOptionHandler(photo.uri);

          const output = await ImageRecognition(photo.uri);

          if (output) {
            OutputHandler(output);
          }
        }

        dataContext.loadingHandler(false, 'imageOutput');
      } catch (error) {
        dataContext.loadingHandler(false, 'imageOutput');
        if (error.code === 'ECONNABORTED') {
          console.error('Connection timeout or aborted.');
          dataContext.messageIdHandler('LP16', 'imageOutput');
        } else {
          throw error.message;
        }
      }
    }
  }

  async function pickImage() {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
    dataContext.loadingHandler(true, 'imageOutput');
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [6, 6],
        quality: 1,
      });

      if (!result.canceled) {
        if (result.assets[0].uri) {
          dataContext.cameraOptionHandler(result.assets[0].uri);

          const output = await ImageRecognition(result.assets[0].uri);

          if (output) {
            OutputHandler(output);
          }
        }
      }
      dataContext.loadingHandler(false, 'imageOutput');
    } catch (error) {
      dataContext.loadingHandler(false, 'imageOutput');
      if (error.code === 'ECONNABORTED') {
        console.error('Connection timeout or aborted.');
        dataContext.messageIdHandler('LP16', 'imageOutput');
      } else {
        throw error.message;
      }
    }
  }

  // if (hasCameraPermission === false) {
  //   return <Text_ children={'No Access To The Camera'} />;
  // }

  if (hasGalleryPermission === false) {
    return <Text_ children={'No Access To The Gallery'} />;
  }

  return (
    <CameraView style={styles.camera} facing={type} flash={flash} ref={cameraRef}>
      <View style={styles.button2Container}>
        <CameraButton
          size={28}
          icon={'retweet'}
          onPress={() => {
            setType((current) => (current === 'back' ? 'front' : 'back'));
          }}
        />
        <CameraButton
          size={28}
          icon={'flash'}
          color={flash === 'off' ? 'gray' : Colors.light_gray}
          onPress={() => {
            setFlash((current) => (current === 'off' ? 'on' : 'off'));
          }}
        />
      </View>

      <View style={styles.buton3Container}>
        <CameraButton buttonContainer={styles.takePicture} icon="circle" size={70} onPress={takePhoto} />

        <CameraButton buttonContainer={styles.choosePicture} icon="image" size={40} onPress={pickImage} />
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  button2Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: Platform.select({ ios: 60, android: 20 }),
  },
  buton3Container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  takePicture: {
    marginBottom: Platform.select({ ios: 120, android: 100 }),
    marginHorizontal: 90,
  },
  choosePicture: {},
});
