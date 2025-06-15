import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import {StyledText} from "@/components/StyledText";
import {StyledView} from "@/components/StyledView";
import WithNavbar from "@/components/ui/NavIconBar";
import {STATS} from "@/constants/Stats";


const screenWidth = Dimensions.get('window').width;

export default WithNavbar(function Stats() {
  const [activeRange, setActiveRange] = useState('Custom');
  const [filteredStats, setFilteredStats] = useState(STATS);

  React.useEffect(() => {
    // Filter stats based on the active rang

    const filterStats = () => {
      if (activeRange === 'This Week') {
        return STATS.filter(stat => new Date(stat.created_at) >= new Date(new Date().setDate(new Date().getDate() - 7)));
      } else if (activeRange === 'Last Week') {
        return STATS.filter(stat => new Date(stat.created_at) <= new Date(new Date().setDate(new Date().getDate() - 7)));
      } else if (activeRange === 'This Month') {
        let date = new Date();
        return STATS.filter(stat => new Date(stat.created_at) >= new Date(date.getFullYear(), date.getMonth() -1, date.getDate()));
      }
      return STATS; // Default to all stats
    };

    setFilteredStats(filterStats());
  }, [activeRange])

  const onRangeChange = (range) => {
    return activeRange === range ? setActiveRange("") : setActiveRange(range);
  }
  return (
    <StyledView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Title and Date */}
        <StyledText style={styles.title}>Your Stats</StyledText>
        <StyledView style={styles.dateRow}>
          <AntDesign name="calendar" size={18} color="#2AA7A1" />
          <StyledText style={[styles.dateText, styles.dateBox]}>Apr 13, Thu</StyledText>
        </StyledView>

        {/* Date Range Buttons */}
        <StyledView style={styles.rangeContainer}>
          <TouchableOpacity
            style={[
              styles.rangeButton,
              activeRange === 'This Week' && styles.activeRange,
            ]}
            onPress={() => onRangeChange('This Week')}
          >
            <StyledText style={activeRange === 'This Week' ? styles.activeText : styles.rangeText}>
              This Week
            </StyledText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.rangeButton,
              activeRange === 'Last Week' && styles.activeRange,
            ]}
            onPress={() => onRangeChange('Last Week')}
          >
            <StyledText style={activeRange === 'Last Week' ? styles.activeText : styles.rangeText}>
              Last Week
            </StyledText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.rangeButton,
              activeRange === 'This Month' && styles.activeRange,
            ]}
            onPress={() => onRangeChange('This Month')}
          >
            <StyledText style={activeRange === 'This Month' ? styles.activeText : styles.rangeText}>
              This Month
            </StyledText>
          </TouchableOpacity>
        </StyledView>

        {/* From / To */}
        <StyledView style={styles.fromTo}>
          {/*<StyledText style={styles.label}>From:</StyledText>*/}
          {/*<StyledText style={styles.dateBox}>21.03.25</StyledText>*/}
          {/*<StyledText style={styles.label}>To:</StyledText>*/}
          {/*<StyledText style={styles.dateBox}>13.03.25</StyledText>*/}
        </StyledView>

        {/* Chart */}
        <BarChart
          data={{
            labels: ['😢', '😡', '😄', '🤢', '😲', '😴'],
            datasets: [
              {
                data: [
                    filteredStats.filter(stat => stat.mood === 'Sad').length, //4
                  filteredStats.filter(stat => stat.mood === 'Angry').length,//5
                  filteredStats.filter(stat => stat.mood === 'Happy').length,//8
                  0 ,
                  filteredStats.filter(stat => stat.mood === 'Amazing').length,//1
                  filteredStats.filter(stat => stat.mood === 'Overwhelmed/Tired').length],//5
                colors: [
                  () => '#90CAF9',
                  () => '#FF8A80',
                  // () => '#FFF59D',
                  () => '#FFF176',
                  () => '#81C784',
                  () => '#CE93D8',
                  () => '#CFD8DC',
                ],
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#FFF6EF',
            backgroundGradientFrom: '#FFF6EF',
            backgroundGradientTo: '#FFF6EF',
            decimalPlaces: 0,
            color: () => '#2AA7A1',
            labelColor: () => '#2AA7A1',
            propsForBackgroundLines: {
              stroke: '#e3e3e3',
              strokeDasharray: '', 
            },
          }}
          style={{ marginTop: 20, borderRadius: 16, marginLeft: -40, alignSelf: 'flex-start' }}
          withCustomBarColorFromData
          flatColor
          showValuesOnTopOfBars
        />

        {/* Stats Text */}
        <StyledText style={styles.statLine}>
          😢 You were mostly sad because of <StyledText style={styles.bold}>Work</StyledText>.
        </StyledText>
        <StyledText style={styles.statLine}>
          😄 This week was the <StyledText style={styles.bold}>happiest</StyledText> week.
        </StyledText>
      </ScrollView>


    </StyledView>
  );
}, 0)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6EF',
    height: Dimensions.get('window').height - 100,
    paddingHorizontal: 15,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 120,
  },
  title: {
    fontSize: 24,
    color: '#2AA7A1',
    fontWeight: 'bold',
    marginTop: 40,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#999',
  },
  rangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    gap: 10,
  },
  rangeButton: {
    backgroundColor: '#DDEEEF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  rangeText: {
    color: '#2AA7A1',
    fontWeight: '500',
  },
  activeRange: {
    backgroundColor: '#2AA7A1',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  fromTo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    height: 0,
    width: 0,
    marginVertical: 30,
  },
  label: {
    color: '#2AA7A1',
    fontWeight: '500',
  },
  dateBox: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
  },
  statLine: {
    marginTop: 16,
    fontSize: 16,
    color: '#2AA7A1',
  },
  bold: {
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    backgroundColor: '#FFF6EF',
  },
  activeNav: {
    width: 40,
    height: 40,
    backgroundColor: '#2AA7A1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
