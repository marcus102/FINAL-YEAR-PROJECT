import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import Colors from '../constants/colors';
import MainCamera from '../util/Camera';
import ImageOutput from './../components/Overlays/ImageOverlay/ImageOutput';

export default function App() {
  const dataContext = useContext(ManagmentSystem);

  return (
    <View style={styles.rootContainer}>
      {dataContext.cameraOption && <ImageOutput imageData={dataContext.cameraOption} visible={true} />}
      {!dataContext.cameraOption && <MainCamera />}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
