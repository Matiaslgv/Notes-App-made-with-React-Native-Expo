import React, {useState} from 'react';
import {View, TouchableOpacity, Text } from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
// import Typography from '../components/Typography';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Schedule =  () => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
        //   const numItems = Math.floor(Math.random() * 3 + 1);
          console.log(strTime);
          items[strTime].push({})
          // for (let j = 0; j < 9; j++) {
          //   // items[strTime].push({
          //   //   name: 'Item for ' + strTime + ' #' + j,
          //   //   height: Math.max(50, Math.floor(Math.random() * 150)),
          //   // });
          //   items[strTime].push({
          //   })
          // }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Avatar.Text label="M" />
              <Text>Hola</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate()}
        // selected={'2021-05-16'}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Schedule;