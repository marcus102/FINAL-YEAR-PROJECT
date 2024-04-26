import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Icons from '../../util/Icons';
import Colors from '../../constants/colors';
import ProfileList from '../OptionList/ProfileList';
import IconButton from '../../util/IconButton';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import { fetchUserProfile } from '../../HTTP Requests/ProfileImageHttp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../../util/LoadingPage';
import NotificationMessageOverlay from '../../util/NotificationMessageOverlay';
import Text_ from '../Text/Text';

export default function ProfileObjects({ onPress }) {
  const [username1, setUsername1] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState();
  const [image, setImage] = useState('');
  const dataContext = useContext(ManagmentSystem);

  useEffect(() => {
    async function getUsernameAndProfile() {
      setIsLoading(true);
      try {
        const response = await AsyncStorage.getItem('username');
        const profileImg = await fetchUserProfile();
        if (profileImg && profileImg.length > 0) {
          setImage(profileImg[0].image);
          dataContext.profileImageIdHandler(profileImg[0].id);
        }
        setUsername1(response);
        setIsLoading(false);
      } catch (error) {
        setMessageId('LP4');
        setIsLoading(false);
      }
    }
    getUsernameAndProfile();
  }, []);

  if (messageId && !isLoading) {
    return (
      <NotificationMessageOverlay
        onPress={() => {
          setMessageId(null);
        }}
        ID={messageId}
      />
    );
  }

  if (isLoading) {
    return <LoadingOverlay loadingSpiner={true} />;
  }

  return (
    <View style={styles.Container}>
      {!image ? (
        <IconButton onPress={onPress} icon="person-circle" size={200} color={Colors.gray} />
      ) : (
        <Image
          style={styles.imageStytle}
          source={{
            uri: image,
          }}
        />
      )}
      <View style={styles.userName}>
        <Text_ textStytle={styles.userNameText} children={['@', username1]} />
        <Icons icon="checkmark-circle-sharp" size={15} color={Colors.orange} />
      </View>
      <View style={styles.options}>
        <ProfileList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 5,
  },
  options: {
    width: '100%',
    marginTop: 15,
  },
  imageStytle: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginBottom: 50,
  },
});
