import { StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Assistance from '../MenuComponent/AssistanceManager';
import NotificationHandler from '../MenuComponent/NotificationsManager';
import FAQHandler from '../MenuComponent/FAQManager';
import TermsConditionsHandler from '../MenuComponent/Terms_ConditionsManager';

export default function SubMenuDataList() {
  const route = useRoute();
  const MenuId = route.params.subMenuId;

  return (
    <>
      {['SMO7'].includes(MenuId) && (
        <ScrollView style={styles.ScrollView}>
          <Assistance />
        </ScrollView>
      )}
      {['SMO1'].includes(MenuId) && <NotificationHandler />}
      {['SMO8'].includes(MenuId) && <FAQHandler />}
      {['SMO10'].includes(MenuId) && <TermsConditionsHandler />}
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
});
