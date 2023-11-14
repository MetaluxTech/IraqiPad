import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet ,ScrollView} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const Category = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
          const response = await axios.get('https://iraqpad.com/wp-json/wp/v2/categories');
          const fetchedCategories = response.data;
          setCategories(fetchedCategories);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchCategories();
      }, []);

  return (
    <ScrollView>
     <View style={styles.container}>
      {categories.map((category) => (
        <Card key={category.id} style={styles.card}>
          <Card.Content>
            <Title>{category.name}</Title>
            <Paragraph>{category.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardCover: {
    height: 200,
  },
});

export default Category;