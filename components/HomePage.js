import * as React from 'react';
import { useState, useEffect } from 'react';
import {SegmentedButtons, Searchbar ,Text,Card, Title, Provider, IconButton ,List} from 'react-native-paper';
import {SafeAreaView,StyleSheet,View, ScrollView ,Image} from 'react-native';
import axios from 'axios'
const HomePage = () => {
   
    // segmnted button
    const [value, setValue] = React.useState('');
    
    // search bar
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  //////////////data post //////////////
  const removeTags = (html) => {
    return html.replace(/<[^>]*>/g, '');
  };
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const postsResponse = await axios.get('https://iraqpad.com/wp-json/wp/v2/posts');
      const mediaResponse = await axios.get('https://iraqpad.com/wp-json/wp/v2/media');

      const fetchedPosts = postsResponse.data;
      const fetchedMedia = mediaResponse.data;

      // Combine posts with corresponding media
      const combinedData = fetchedPosts.map((post) => {
        const media = fetchedMedia.find((item) => item.id === post.featured_media);
        return { ...post, media };
      });

      setPosts(combinedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Provider>
    <>
    <ScrollView>
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />

    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'walk',
            label: 'قصص',
          },
          {
            value: 'train',
            label: 'مقالات',
          },
          { value: 'drive', label: 'روايات' },
        ]}
      />
    </SafeAreaView>
    <View style={styles.container}>
      {posts.map((post) => (
        <Card key={post.id} style={styles.card}>
        {/* //  {post.featured_media !== 0 && ( */}
        {post.media && (
            <Card.Cover
              source={{ uri: post.media.source_url}}
              style={styles.cardCover}
            />
          )} 
          <Card.Content>
         
            <Title> {post.title.rendered}</Title>
            <Text> {removeTags(post.content.rendered)}</Text>
           <Text>Author: {post.author}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
   
    
    </ScrollView>
    </>

    </Provider>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 10
    },
    card: {
      marginBottom: 16,
    },
    cardCover: {
      height: 200,
    },
  });

export default HomePage;
