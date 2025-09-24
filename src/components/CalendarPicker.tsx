import { Calendar, LocaleConfig } from "react-native-calendars";
import { StyleSheet, View } from "react-native";

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
          selectedDayBackgroundColor: "#4895EF",
          todayTextColor: "#3A0CA3",
          arrowColor: "#3A0CA3",
          dotColor: "#3A0CA3",
          textSectionTitleColor: "#3A0CA3",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#4895EF",
    overflow: "hidden",
    padding: 8,
  },
});
