// import { useState, useEffect } from 'react';
// import { StyleSheet, View, Image } from 'react-native';

// import IconButton from '../../util/IconButton';
// import IconTextButton from '../../util/IconTextButton';
// import ImageOutput from '../Overlays/ImageOverlay/ImageOutput';
// import Colors from '../../constants/colors';
// import MainOverlay from '../Overlays/MainOverlay/mainOverlay';
// import { SEND_IMAGE } from '../../data/Database';
// import Text_ from '../Text/Text';

// export default function CameraList({
//   visible,
//   imageData,
//   setImageData,
//   setIsVibleData,
// }) {
//   const [layoutIsOpen, setLayoutIsOpen] = useState(true);

//   return (
//     <MainOverlay
//       visible={visible}
//       animationType="slide"
//       rootContainer={styles.rootContainer}
//     >
//       <IconButton
//         iconButtonContainer={styles.cancelButtonContainer}
//         icon={'md-arrow-back-circle-outline'}
//         size={35}
//         color={Colors.orange}
//         onPress={() => {
//           setImageData(null);
//           setIsVibleData(false);
//         }}
//       />
//       {layoutIsOpen ? (
//         <View style={styles.mainContainer}>
//           <View style={styles.imageContainer}>
//             <Image style={styles.image} source={{ uri: imageData }} />
//             {SEND_IMAGE.map((data) => (
//               <View key={data.id}>
//                 {['SIM1'].includes(data.id) && (
//                   <Text_
//                     textContainer={styles.textContainer}
//                     style={styles.text}
//                     children={data.textTitle}
//                   />
//                 )}
//               </View>
//             ))}
//           </View>

//           {SEND_IMAGE.map((data) => (
//             <View key={data.id}>
//               {['SIM2'].includes(data.id) && (
//                 <IconTextButton
//                   children={data.buttonText}
//                   icon={'send-sharp'}
//                   size={20}
//                   color={Colors.white}
//                   onPress={() => {
//                     setLayoutIsOpen(!layoutIsOpen);
//                   }}
//                   textStyle={styles.buttonText}
//                   containerStyle={styles.buttonContainer}
//                 />
//               )}
//             </View>
//           ))}
//         </View>
//       ) : (
//         <ImageOutput
//           setLayoutIsOpenData={setLayoutIsOpen}
//           imageData={imageData}
//           setImageData={setImageData}
//           setIsVibleData={setIsVibleData}
//         />
//       )}
//     </MainOverlay>
//   );
// }

// const styles = StyleSheet.create({
//   rootContainer: {
//     marginTop: Platform.select({ ios: 50, android: 0 }),
//     flex: 1,
//   },
//   iconButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.orange,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   mainContainer: {
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     marginHorizontal: 20,
//   },
//   buttonText: {
//     color: Colors.white,
//   },
//   cancelButtonContainer: {
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.orange,
//     justifyContent: 'center',
//     padding: 5,
//   },
//   imageContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//     height: '75%',
//     width: '100%',
//   },
//   image: {
//     height: '75%',
//     width: '80%',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: Colors.light_gray,
//   },
//   imageTitle: {
//     marginHorizontal: 120,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: Colors.white,
//   },
//   textContainer: {
//     marginTop: 10,
//     width: '100%',
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//   },
// });
