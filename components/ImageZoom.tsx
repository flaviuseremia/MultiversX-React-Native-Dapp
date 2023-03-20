import React, { useState } from "react";
import { Image, TouchableOpacity, Modal, StyleSheet, View } from "react-native";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";

function ImageZoom({ imageUri }: { imageUri: string }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed(!isZoomed);
  const imageAsset = Asset.fromModule(imageUri);
  const uri = imageAsset.uri;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleZoom} style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
      <Modal visible={isZoomed} transparent>
        <TouchableOpacity style={styles.modalContainer} onPress={toggleZoom}>
          <Image source={{ uri }} style={styles.modalImage} />
          <Ionicons
            name="close-outline"
            size={32}
            color="white"
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  closeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default ImageZoom;
