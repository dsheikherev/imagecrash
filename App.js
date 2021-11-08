import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [path, setPath] = React.useState("");

  useEffect(() => {
    const attempt = async () => {
      try {
        const dest = FileSystem.documentDirectory + "test.jpg";

        console.log("downloading file..");
        const res = await FileSystem.downloadAsync(
          "https://github.com/dsheikherev/imagecrash/raw/main/iPhone12ProMax.jpg",
          dest
        );

        console.log("done!", res);
        setPath(dest);

      } catch (e) {
        console.log("error", e);
      }
    };

    attempt().then(() => console.log("done with attempt!"));
  }, []);

  console.log("path", path);

  return (
    <View style={styles.container}>
      <Text>Image:</Text>
      {path ? (
        <Image
          source={{
            uri: path,
          }}
          style={{ width: 200, height: 200 }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
