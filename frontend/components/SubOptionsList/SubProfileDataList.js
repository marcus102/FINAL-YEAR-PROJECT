import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import PersonnalInfo from '../ProfileComponent/PersonnalInfo';
import Favorites from '../ProfileComponent/Favorite';
import Historique from '../ProfileComponent/Historique';

export default function SubProfileDataList() {
  const route = useRoute();
  const ProfileId = route.params.subProfileId;

  return (
    <>
      {['PSO1'].includes(ProfileId) && <PersonnalInfo />}
      {['PSO2'].includes(ProfileId) && <Historique />}
      {['PSO3'].includes(ProfileId) && <Favorites />}
    </>
  );
}

const styles = StyleSheet.create({});
