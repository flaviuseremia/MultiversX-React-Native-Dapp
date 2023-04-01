import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import wizzard36 from "../assets/36.png";

import Settings from "../components/Settings";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styless";
import ImageZoom from "../components/ImageZoom";
import { UserContext } from "../store/UserContext";
import { getNfts } from "../util/infos";

function emptyHandle() {}

function NFTStakeScreen() {
  const { username } = useContext(UserContext);

  const [selectedImage, setSelectedImage] = useState("");
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    getNfts()
      .then((response) => {
        setUrls(response);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => setSelectedImage(item)}>
      <Image source={{uri: item}} style={styles.itemImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Settings name={username} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>My NFT's</Text>
      </View>
      <ImageZoom imageUri={selectedImage} />
      <View style={styles.flatListContainer}>
        <FlatList
          data={urls}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          children={"Stake NFT's"}
          onPress={emptyHandle}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "space-between",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 36,
    color: GlobalStyles.colors.secondary200,
    marginLeft: 8,
  },
  flatListContainer: {
    marginHorizontal: 16,
    justifyContent: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginHorizontal: 8,
    resizeMode: "contain",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
    minWidth: "30%",
  },
});

export default NFTStakeScreen;
