import { Calendar, LocaleConfig } from "react-native-calendars";
import { StyleSheet, View } from "react-native";
import { Theme } from "@/constants/theme";

// https://github.com/wix/react-native-calendars/issues/169 hay mejor manera?
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';


interface CalendarPickerProps {
  selectedDate: string;
  markedDates: any;
  onDayPress: (day: { dateString: string }) => void;
}

export function CalendarPicker({ selectedDate, markedDates, onDayPress }: CalendarPickerProps) {
  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        current={selectedDate}
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: Theme.colors.primary,
          todayTextColor: Theme.colors.primary,
          arrowColor: Theme.colors.primary,
          dotColor: Theme.colors.primary,
          textSectionTitleColor: Theme.colors.primary,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
  backgroundColor: Theme.colors.card,
    borderRadius: 16,
    marginBottom: 30,
    borderWidth: 1,
  borderColor: Theme.colors.primary,
    overflow: "hidden",
    padding: 8,
  },
});
